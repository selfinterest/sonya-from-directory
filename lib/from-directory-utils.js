/**
 * Created by: Terrence C. Watson
 * Date: 7/17/14
 * Time: 3:00 PM
 */

var path = require("path")
  , glob = require("glob")
  , fs = require("fs")
  ;

exports.Provide = require("sonya").Provide;  //ditto
exports.require = require;      //this is for testing more than anything, so require can be stubbed out


exports.getModulesFromDir = function(dir){

    var files = this.getJavaScriptFilesFromDir(dir);
    var modules = [];
    files.forEach(function(file){
        file = path.resolve(file);
        modules.push(this.require(file));
    }.bind(this));
    return modules;


}

exports.getJavaScriptFilesFromDir = function(dir){
    if(!dir) throw new Error("Parameter 'dir' is required.");
    if(!fs.existsSync(dir)) throw new Error("Directory "+dir+" does not exist.");

    if(this.options.recursive){
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

exports.setNameAndTypeOfModule = function(aModule){

    if(!aModule) throw new Error("setNameAndTypeOfModule -- must specify module.");
    if(typeof aModule !== "function" && this.options.useFunctionNames) throw new Error("setNameAndTypeOfModule -- module must be function.");


    aModule.$type = aModule.$type || this.options.defaultProvider;

    if(!this.options.useFunctionNames || aModule.$name){
        aModule.$name = aModule.$name || null;
    } else {
        aModule.$name = this.getFunctionNameFromFunction(aModule);
    }

    return aModule;

}

exports.processOneModule = function(aModule){
    this.setNameAndTypeOfModule(aModule);
    if(!aModule.$name) {
        console.log(this.options);
        throw new Error("Could not get name to register module under.");
    }
    this.Provide[aModule.$type](aModule.$name, aModule);
}


exports.getFunctionNameFromFunction = function(fn){
    var fnString = fn.toString();
    fnString = fnString.substr('function '.length);
    fnString = fnString.substr(0, fnString.indexOf('('));
    return fnString == "" ? null : fnString;
}
