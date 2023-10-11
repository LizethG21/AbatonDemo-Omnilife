/**
 * @module
 * @description Objeto agrupador de los módulos de acceso a datos.
 * Se usa por conveniencia, para hacer un solo "import".<br/>
 * Cada una de las siguientes propiedades es una referencia al módulo
 * correspondiente en dac/{propiedad}.
 * @example
 * const dac = require('./dac');
 * const roles = await dac.role.list();
 */
 exports.dac = require('./dac');