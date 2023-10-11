const sql = require("./helper/sql");
const { es} = require("helper");

exports.list = async () => {
    const o = await sql.query("CALL StateList()");
    return o;
};

//TODO: Separar elastic y sql
exports.getHealth = async () => {
    let body = {
        size: 0,
        aggs: {
            _: {
                terms: {
                    field: "state",
                    size: 100
                },
                aggs: {
                    _: {
                        top_hits: {
                            size: 1,
                            sort: [
                                {
                                    date: {
                                        order: "desc"
                                    }
                                }
                            ],
                            _source: {
                                includes: ["date", "state", "sem1", "sem2"]
                            }
                        }
                    }
                }
            }
        }
    };

    const res = await es.search({
        index: "health-topology",
        body: body
    });

    let data= res.body.aggregations._.buckets.map((o)=>({
        name:o._.hits.hits[0]._source.state,
        date:o._.hits.hits[0]._source.date,
        sem1:o._.hits.hits[0]._source.sem1,
        sem2:o._.hits.hits[0]._source.sem2,

    }))

    return data;
};
