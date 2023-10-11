const es = require("./helper/es");
const moment = require("moment");

/**
 *
 * @param {Date} start
 * @param {Date} end
 */

exports.getTrans = async (start, end, channel) => {
    var body = {
        size: 0,
        sort: [
            {
                date: {
                    order: "desc",
                },
            },
        ],
        query: {
            bool: {
                must: [
                    {
                        range: {
                            date: {
                                gte: start,
                                lt: end,
                            },
                        },
                    },
                ],
            },
        },
        aggs: {
            histograma: {
                date_histogram: {
                    field: "date",
                    interval: "5m",
                    time_zone: "America/Mexico_City",
                    min_doc_count: 1,
                },
                aggs: {
                    amount: {
                        sum: {
                            field: "amount",
                        },
                    },
                },
            },
        },
    };

    const res = await es.search({
        index: "trans-"+channel, //TODO Verificar parametrizacion
        type: "_doc",
        body: body,
    });

    var hits = res.body.aggregations.histograma.buckets.map((o) => ({
        date: o.key,
        count: o.doc_count,
        amount: o.amount.value,
    }));
    return hits;
};

exports.getTransType = async (start, end,channel) => {
    var body = {
        size: 0,
        sort: [
            {
                date: {
                    order: "desc",
                },
            },
        ],
        query: {
            bool: {
                must: [
                    {
                        range: {
                            date: {
                                gte: start,
                                lt: end,
                            },
                        },
                    },
                ],
            },
        },
        aggs: {
            _: {
                terms: {
                    field: "type",
                    // field: "type.keyword",
                    size: 10,
                },
            },
        },
    };

    const res = await es.search({
        index: "trans-"+channel, //Verificar parametrizacion
        type: "_doc",
        body: body,
    });

    var hits = res.body.aggregations._.buckets.map((o) => ({
        type: o.key,
        count: o.doc_count,
    }));
    return hits;
};

exports.getAmount = async (start, end, channel) => {
    var body = {
        size: 0,
        sort: [
            {
                date: {
                    order: "desc",
                },
            },
        ],
        query: {
            bool: {
                must: [
                    {
                        range: {
                            date: {
                                gte: start,
                                lt: end,
                            },
                        },
                    },
                ],
            },
        },
        aggs: {
            histograma: {
                date_histogram: {
                    field: "date",
                    interval: "5m",
                    time_zone: "America/Mexico_City",
                },
                aggs: {
                    amount: {
                        sum: {
                            field: "amount",
                        },
                    },
                },
            },
        },
    };

    const res = await es.search({
        index: "trans-"+channel,
        type: "_doc",
        body: body,
    });

    var hits = res.body.aggregations.histograma.buckets.map((o) => ({
        date: o.key,
        amount: o.amount.value,
    }));
    return hits;
};

exports.getTableTrans = async (start, end, channel) => {
    
    var body = {
        size: 0,
        query: {
            bool: {
                must: [
                    {
                        range: {
                            date: {
                                gte: start,
                                lt: end,
                            },
                        },
                    },
                ],
            },
        },
        aggs: {
            types: {
                terms: {
                    // field: "type.keyword",
                    field: "type",
                    size: 10,
                },
                aggs: {
                    amount: {
                        stats: {
                            field: "amount",
                        },
                    },
                },
            },
        },
    };

    const res = await es.search({
        index: "trans-"+channel,
        type: "_doc",
        body: body,
    });

    var hits = res.body.aggregations.types.buckets.map((o) => ({
        type: o.key,
        count: o.doc_count,
        amount:o.amount.sum
    }));
    return hits;
};
