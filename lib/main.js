/**
 * Created by: Terrence C. Watson
 * Date: 7/17/14
 * Time: 2:25 PM
 */

//This module must be required BEFORE sonya

var provideClass = require("../node_modules/sonya/lib/lib/provide-class.js");

if(!provideClass.prototype.types.fromDirectory){
    provideClass.prototype.types.fromDirectory = require("./from-directory.js");
}
