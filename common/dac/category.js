const sql = require("./helper/sql");

exports.list = async () => {
    const o = await sql.query("CALL CategoryList()");
    return o;
};
