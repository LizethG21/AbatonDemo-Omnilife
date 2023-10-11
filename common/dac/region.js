/** @module */
const self = exports;

const sql = require("./helper/sql");
const cache = require("./helper/cache");

const _key = "region.list";

/**
 * Obtiene la lista de Regiones
 * @returns {Promise<Region[]>}
 */
exports.list = async () => {
    let o = cache.get(_key);
    if (o) return o;
    o = await sql.query(`CALL RegionList()`);
    cache.set(_key, o);
    return o;
};

/**
 * Obtiene los datos de una Region
 * @param {*} id ID de la region
 * @returns {Promise<Region>}
 */
exports.get = async id => {
    return (await self.list()).find(o => o.NodeID == id);
};

/**
 * @typedef Region
 * @property {number} RegionID ID de la región
 * @property {string} Name Nombre de la región
 * @property {string} Code Código (nombre corto) de la región
 */
