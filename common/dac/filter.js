//TODO: mover a un directorio "es"

const { es } = require("helper");
const period = require("./period");

exports.get = async (f) => {
    const p =period.filter(f.date.code);
    let body = {
        size: 0,
        query: {
            bool: {
                filter: [
                    {
                        range: {
                            DateTime: Object.assign(p.range, {
                                time_zone: "America/Mexico_City"
                            })
                        }
                    }
                ],
                // filter: [
                //     {
                //         terms: {
                //             InterfaceID: interfaces
                //         }
                //     }
                // ]
            }
        },
        aggs: {
            Histogram: {
                date_histogram: {
                    field: "DateTime",
                    fixed_interval: "10m",
                    time_zone: "America/Mexico_City",
                    min_doc_count: 1
                },
                aggs: {
                    In: {
                        sum: {
                            field: "InTotalPkts"
                        }
                    },
                    Out: {
                        sum: {
                            field: "OutTotalPkts"
                        }
                    },
                    Total: {
                        sum: {
                            field: "TotalPackets"
                        }
                    },
                    Percent: {
                        avg: {
                            field: "PercentUtil"
                        }
                    }
                }
            },
            avg_percent: {
                avg_bucket: {
                    buckets_path: "Histogram>Percent"
                }
            }
        }
    };

    const res = await es
        .search({
            index: "network",
            body: body
        })
        .catch(err => console.log(err));
    var hits = res.body.aggregations.Histogram.buckets.map(o => ({
        date: o.key,
        in:o.In.value,
        out: -Math.abs(o.Out.value).toFixed(2),
        total:o.Total.value
    }));
    hits["Percent"] = res.body.aggregations.avg_percent.value / 100;
    return hits;
};

exports.getDisk = async f => {
    const body = {
        size: 0,
        query: {
            bool: {
                filter: [
                    {
                        range: {
                            "@timestamp": {
                                gte: "now-5m",
                                time_zone: "America/Mexico_City"
                            }
                        }
                    },
                    {
                        term: {
                            "event.module": "system"
                        }
                    },
                    {
                        term: {
                            "metricset.name": "filesystem"
                        }
                    },
                    {
                        terms: {
                            "host.hostname": f.servers
                        }
                    },
                    f.disk
                        ? {
                              term: { "system.filesystem.device_name": f.disk.value }
                          }
                        : undefined
                ].filter(o => o)
            }
        },
        aggs: {
            _: {
                terms: {
                    field: "host.hostname",
                    size: f.servers.length,
                    order: {
                        _key: "asc"
                    }
                },
                aggs: {
                    _: {
                        terms: {
                            field: "system.filesystem.device_name",
                            size: 10000,
                            order: {
                                _key: "asc"
                            }
                        },
                        aggs: {
                            _: {
                                top_hits: {
                                    size: 1,
                                    _source: [
                                        "system.filesystem.available",
                                        "system.filesystem.total",
                                        "system.filesystem.used"
                                    ],
                                    sort: [
                                        {
                                            "@timestamp": "desc"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    const res = await es.search({
        index: "metricbeat-*",
        filter_path: "**.key,**._source",
        body: body
    });
    if (!res.body.aggregations) return [];
    const data = res.body.aggregations._.buckets
        .flatMap(o =>
            o._.buckets.map(p => {
                const q = p._.hits.hits[0]._source;
                if (!q.system) return null;
                const s = q.system.filesystem;
                return { server: o.key, disk: p.key, total: s.total, used: s.used.bytes, free: s.available };
            })
        )
        .filter(o => o);
    return data;
};

exports.getDiskTimeline = async f => {
    const body = {
        size: 0,
        query: {
            bool: {
                filter: [
                    {
                        range: {
                            "@timestamp": {
                                gte: "now/d",
                                lte: "now",
                                time_zone: "America/Mexico_City"
                            }
                        }
                    },
                    {
                        term: {
                            "event.module": "system"
                        }
                    },
                    {
                        term: {
                            "metricset.name": "filesystem"
                        }
                    },
                    {
                        range: {
                            "system.filesystem.total": {
                                gt: 0
                            }
                        }
                    },
                    {
                        terms: {
                            "host.hostname": f.servers
                        }
                    },
                    f.disk
                        ? {
                              term: { "system.filesystem.device_name": f.disk.value }
                          }
                        : undefined
                ].filter(o => o)
            }
        },
        aggs: {
            _: {
                date_histogram: {
                    field: "@timestamp",
                    fixed_interval: "5m",
                    time_zone: "America/Mexico_City"
                },
                aggs: {
                    _: {
                        terms: {
                            field: "host.hostname",
                            size: 6
                        },
                        aggs: {
                            _: {
                                terms: {
                                    field: "system.filesystem.device_name",
                                    size: 10
                                },
                                aggs: {
                                    total: {
                                        avg: {
                                            field: "system.filesystem.total"
                                        }
                                    },
                                    used: {
                                        avg: {
                                            field: "system.filesystem.used.bytes"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    const res = await es.search({
        index: "metricbeat-*",
        filter_path: "agg*._.buc*.key,**.value",
        body: body
    });
    let data = res.body.aggregations._.buckets.map(o => {
        if (!o._) return null;
        const buck = o._.buckets.flatMap(p => p._.buckets);
        const total = buck.map(b => b.total.value).reduce((a, b) => a + b);
        const used = buck.map(b => b.used.value).reduce((a, b) => a + b);
        return {
            date: o.key,
            avg: used / total
        };
    });

    return data;
};

exports.getServices = async f => {
    const body = {
        size: 0,
        query: {
            bool: {
                filter: [
                    {
                        range: {
                            "@timestamp": {
                                gte: "now-5m",
                                time_zone: "America/Mexico_City"
                            }
                        }
                    },
                    {
                        term: {
                            "event.module": "system"
                        }
                    },
                    {
                        term: {
                            "metricset.name": "process"
                        }
                    },
                    {
                        terms: {
                            "host.hostname": f.servers
                        }
                    }
                ]
            }
        },
        aggs: {
            _: {
                terms: {
                    field: "process.name",
                    size: 1000
                },
                aggs: {
                    top: {
                        top_hits: {
                            size: 1,
                            _source: ["system.process.cpu.total.norm.pct", "system.process.memory.rss.pct"],
                            sort: {
                                "system.process.cpu.total.pct": "desc"
                            }
                        }
                    }
                }
            }
        }
    };

    const res = await es.search({
        index: "metricbeat-*",
        body: body
    });
    let data = res.body.aggregations._.buckets.map(o => ({
        label: o.key,
        cpu: o.top.hits.hits[0]._source.system.process.cpu.total.norm.pct,
        memory: o.top.hits.hits[0]._source.system.process.memory.rss.pct
    }));

    return data;
};
