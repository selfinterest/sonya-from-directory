/**
 * Created by: Terrence C. Watson
 * Date: 7/17/14
 * Time: 3:00 PM
 */

var path = require("path")
  , glob = require("glob")
  , fs = require("fs")
  ;

exports.Provide = require("../node_modules/sonya").Provide;  //ditto
exports.require = require;      //this is for testing more than anything, so require can be stubbed out


exports.getModulesFromDir = function(dir, options){
    var options = options || {};
    var recursive = options.recursive || false;
    var files = this.getJavaScriptFilesFromDir(dir, recursive);
    var modules = [];
    files.forEach(function(file){
        modules.push(this.require(file));
    }.bind(this));
    return modules;


}

exports.getJavaScriptFilesFromDir = function(dir, recursive){
    if(!dir) throw new Error("Parameter 'dir' is required.");
    if(!fs.existsSync(dir)) throw new Error("Directory "+dir+" does not exist.");
    if(recursive){
        dir = path.join(dir, "**", "*.js");
    } else {
        dir = path.join(dir, "*.js");
    }


    return glob.sync(dir);

}


exports.processModules = function(modules, options){

    modules.forEach(function(aModule){

        this.processOneModule(aModule, options);

    }.bind(this))
}

exports.setNameAndTypeOfModule = function(aModule, options){
    options = options || {};
    options.useFunctionNames = options.useFunctionNames || true;
    options.defaultProvider = options.defaultProvider || "factory"
    if(!aModule) throw new Error("setNameAndTypeOfModule -- must specify module.");
    if(typeof aModule !== "function" && options.useFunctionNames) throw new Error("setNameAndTypeOfModule -- module must be function.");


    aModule.$type = aModule.$type || options.defaultProvider;

    if(!options.useFunctionNames || aModule.$name){
        aModule.$name = aModule.$name || null;
    } else {
        aModule.$name = this.getFunctionNameFromFunction(aModule);
    }

    return aModule;

}

exports.processOneModule = function(aModule, options){
    var options = options || {};
    options.useFunctionNames = options.useFunctionNames || true;
    this.setNameAndTypeOfModule(aModule, options);
    if(!aModule.$name) throw new Error("Could not get name to register module under.");
    this.Provide[aModule.$type](aModule.$name, aModule);
}


exports.getFunctionNameFromFunction = function(fn){
    var fnString = fn.toString();
    fnString = fnString.substr('function '.length);
    fnString = fnString.substr(0, fnString.indexOf('('));
    return fnString == "" ? null : fnString;
}