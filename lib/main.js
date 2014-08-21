/**
 * Created by: Terrence C. Watson
 * Date: 7/17/14
 * Time: 2:25 PM
 */

//This module must be required BEFORE sonya

var Provide = require("sonya").Provide;

Provide.constructor.prototype.types.fromDirectory = require("./from-directory.js");

Provide.createProviderTypes();