const moment = require("moment");
const { es } = require("helper");
const period = require("./period");
const self = exports;

exports.get = async (f) => {
    let data={}
    const p =period.filter(f.date.code);
    var body = {
        size: 0,
        query: {
            bool: {
                filter: [
                    {
                        terms: {
                            severity: ["MINOR", "CRITICAL", "MAYOR", "WARNING"]
                        }
                    },
                    {
                        range: {
                            timeStamp: Object.assign(p.range, {
                                time_zone: "America/Mexico_City"
                            })
                        }
                    }
                ]
            }
        },
        aggs: {
            _: {
                cardinality: {
                    field: "deviceName"
                }
            }
        }
    };

    const res = await es
        .search({
            index: "alert-current",
            body: body
        })
        .catch(err => console.log(err));


    data.current= res.body.aggregations._.value;

    data.total=await self.getAlertsTotal();
    return data;

};

exports.getAlertsTotal = async () => {
    var body = {
        size: 0,
        aggs: {
            _: {
                cardinality: {
                    field: "deviceName"
                }
            }
        }
    };

    const res = await es
        .search({
            index: "alert-current",
            body: body
        })
        .catch(err => console.log(err));

    return res.body.aggregations._.value;
};


exports.getAlertsByType = async () => {
    const res = await es
        .search({
            index: "alert-current",
            body: {
                size: 0,
                aggs: {
                    a: {
                        terms: {
                            field: "severity",
                            size: 10,
                        },
                    },
                },
            },
        })
        .catch((err) => {
            return console.log(err);
        });

    var hits = res.body.aggregations.a.buckets.map(o => ({
        name: o.key,
        count: o.doc_count
    }));
    return hits;
};
