const es = require("./helper/es");
const period = require("./period");

exports.get = async (f) => {
    const p = period.filter(f.date.code);
    let data = {};
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
                    },
                    {
                        terms: {
                            InterfaceID: f.interfaces
                        }
                    }
                ]
            }
        },
        aggs: {
            _: {
                stats: {
                    field: "Availability"
                }
            }
        }
    };

    let res = await es
        .search({
            index: "avail-current",
            body: body
        })
        .catch((err) => console.log(err));

    data.avg = res.body.aggregations._.avg;

    body = {
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
                    },
                    {
                        terms: {
                            InterfaceID: f.interfaces
                        }
                    }
                ]
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
            _: {
                terms: {
                    field: "Availability",
                    size: 10
                }
            }
        }
    };

    res = await es
        .search({
            index: "avail-current",
            body: body
        })
        .catch((err) => console.log(err));

    data.health = {
        green: { count: 0 },
        red: { count: 0 }
    };

    res.body.aggregations._.buckets.map((o) =>
        o.key > 70
            ? (data.health.green.count = data.health.green.count + o.doc_count)
            : (data.health.red.count = data.health.red.count + o.doc_count)
    );

    return data;
};
