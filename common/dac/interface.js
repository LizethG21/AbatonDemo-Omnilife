/** @module */
const self = exports;

const sql = require("./helper/sql");
const cache = require("./helper/cache");

const _key = "interface.list";

/**
 *
 * @returns {Promise<any[]>}
 */
exports.list = async () => {
    let o = cache.get(_key);
    if (o) return o;
    o = await sql.query(`CALL cenace2.InterfaceList()`);
    cache.set(_key, o);
    return o;
};

exports.listByRegion = async region => {
    let o = cache.get(_key + region);
    if (o) return o;
    o = await sql.query(`CALL cenace2.InterfaceByRegion(?)`, region);
    cache.set(_key + region, o);
    return o;
};

/**
 *
 * @param {string} region
 * @returns {Promise<any>}
 */
exports.get = async region => {
    const list = region ? await self.listByRegion(region) : await self.list();
    const res = list.map(o => ({
        nodeID: o.NodeID,
        sitio: o.Name,
        interface: o.InterfaceID,
        code: o.Code,
        regionID:o.RegionID
    }));
    return res || null;
};

exports.getBandWidth = async region => {
    let o = cache.get("bandwidth" + region);
    if (o) return o;
    if (region) {
        o = await sql.query(`CALL cenace.GetBandWidth(?)`, region);
        // o = await sql.query(`CALL cenace.GetBandWidth(?)`,region);
        var total = o.map(item => item.total);
        cache.set("bandwidth" + region, total[0]);
        return total[0];
    } else {
        o = await sql.query(`select sum(Total) as total from bandwidth`);
        return o.total;
    }
};

exports.getBandWidthTotal = async () => {
    let o = cache.get("bandwidthTotal");
    if (o) return o;

    o = await sql.query(`select sum(Total) as total from bandwidth`);
    return o.total;
};


exports.getRegionCode = async region => {
    let o = cache.get("regionCode" + region);
    if (o) return o;
    if (region) {
        o = await sql.query(`CALL cenace.GetRegionCode(?)`, region);
        // o = await sql.query(`CALL cenace.GetBandWidth(?)`,region);
        var code = o.map(item => item.Code);
        cache.set("code" + region, code[0]);
        return code[0];
    } else {
        return "";
    }
};

exports.getTrafficRate = async (region, type) => {
    let o = cache.get("trafficRate");
    if (o) return o;
    if (region) {
        o = await sql.query(`CALL cenace.getTrafficRate(?,?)`, [region, type]);
        var princ = o.filter(o => o.Name.includes("-01"));
        var sec = o.filter(o => o.Name.includes("-02"));
        var res = {
            principal: princ.map(o => o.InterfaceID),
            secundary: sec.map(o => o.InterfaceID)
        };
        return res;
    } else {
        o = await sql.query("CALL cenace.getAlltrafficRate(?)", type);
        var princ = o.filter(o => o.Name.includes("-01"));
        var sec = o.filter(o => o.Name.includes("-02"));
        var res = {
            principal: princ.map(o => o.InterfaceID),
            secundary: sec.map(o => o.InterfaceID)
        };
        return res;
    }
};
