/**
 * Created by: Terrence C. Watson
 * Date: 7/17/14
 * Time: 3:05 PM
 */
describe("fromDirectoryUtils", function(){
    var fromDirectoryUtils;
    beforeEach(function(){
        fromDirectoryUtils = require("../../lib/from-directory-utils.js");
    });
    it("should have a function that returns the sonya modules in a directory", function(){
        expect(typeof fromDirectoryUtils.getModulesFromDir).toBe("function");
    });

    it("should have a function that returns all JavaScript files in a directory", function(){
        expect(typeof fromDirectoryUtils.getJavaScriptFilesFromDir).toBe("function");
    });

    describe("fromDirectoryUtils.getJavaScriptFilesFromDir", function(){
        var path = require("path");
        var testDir = path.resolve("./tests/server/fixtures");
        it("if the directory doesn't exist, it should throw an error", function(){
           expect(function(){
               fromDirectoryUtils.getJavaScriptFilesFromDir("blah");
           }).toThrow();
        });
        it("should throw an error if directory is null or undefined", function(){
           expect(function(){
               fromDirectoryUtils.getJavaScriptFilesFromDir();
           }).toThrow();
        });

        it("should return an array of files", function(){

           var files = fromDirectoryUtils.getJavaScriptFilesFromDir(testDir);
           expect(Array.isArray(files)).toBe(true);
        });

        it("should return an array containing the names of the files in the directory", function(){
            var files = fromDirectoryUtils.getJavaScriptFilesFromDir(testDir);
            expect(files.length).toBeGreaterThan(0);
            expect(path.extname(files[0])).not.toBeFalsy();
            var extension = path.extname(files[0]);
            expect(extension).toBe(".js");
        });

        it("should be able to recursively get JavaScript files from directory", function(){
            var files = fromDirectoryUtils.getJavaScriptFilesFromDir(testDir, true);
            expect(files.length).toBeGreaterThan(1);
        });

        it("should be able to non-recursively get JavaScript files from directory", function(){
           var files = fromDirectoryUtils.getJavaScriptFilesFromDir(testDir, false);
           expect(files.length).toBe(1);
        });

        it("should non-recursively get JavaScript files if no option is specified",  function(){
            var files = fromDirectoryUtils.getJavaScriptFilesFromDir(testDir);
            expect(files.length).toBe(1);
        });

    });

    describe("fromDirectoryUtils.getModulesFromDir", function(){
        var spy, fs, requireSpy, returnFakeFile;
        beforeEach(function(){

           function fakeModule(){
               return "Senea";
           }

           fakeModule.$type = "factory";
           fakeModule.$name = "fake";
           //Stub out the getJavaScriptFiles function
           spy = spyOn(fromDirectoryUtils, "getJavaScriptFilesFromDir").andReturn([
                "someModule.js"
           ]);

           requireSpy = spyOn(fromDirectoryUtils, "require").andReturn(fakeModule);

       });
       it("should exist", function(){
          expect(typeof fromDirectoryUtils.getModulesFromDir).toBe("function");
       });

       it("should call on getJavaScriptFilesFromDir", function(){
         fromDirectoryUtils.getModulesFromDir("../");
         expect(spy).toHaveBeenCalledWith("../", false);
       });

       it("should return an array", function(){
         var result = fromDirectoryUtils.getModulesFromDir("../");
         expect(requireSpy).toHaveBeenCalledWith("someModule.js");
         expect(Array.isArray(result)).toBe(true);
         expect(result.length).toBe(1);
         expect(typeof result[0]).toBe("function");
         expect(result[0].$type).toBe("factory");
         expect(result[0].$name).toBe("fake");
       });

    });

    describe("fromDirectoryUtils.getFunctionNameFromFunction", function(){
        it("should return null if given an anonymous function", function(){
            var result = fromDirectoryUtils.getFunctionNameFromFunction(function(){});
            expect(result).toBe(null);
        });

        it("should return null if given a function expression", function(){
           var test = function(){

           }
           var result = fromDirectoryUtils.getFunctionNameFromFunction(test);
           expect(result).toBe(null);
        });

        it("should return the function name if given a function declaration", function(){
            function Test(a, b){

             }
             var result = fromDirectoryUtils.getFunctionNameFromFunction(Test);
             expect(result).toBe("Test");
        });

        it("should return a function name even if the function is part of the property of an object", function(){
            function Test(a, b){

            }

            var obj = {};
            obj.test = Test;
            var result = fromDirectoryUtils.getFunctionNameFromFunction(obj.test);
            expect(result).toBe("Test");
        })

    });

    describe("fromDirectoryUtils.setNameAndTypeOfModule", function(){
        it("should throw an error if no module is passed", function(){
            expect(function(){
                fromDirectoryUtils.setNameAndTypeOfModule();
            }).toThrow();
        });

        it("should throw an error if module is not a function and getnamesfromfunction is true", function(){
           expect(function(){
            fromDirectoryUtils.setNameAndTypeOfModule("test", {
                useFunctionNames: true
            });
           }).toThrow("setNameAndTypeOfModule -- module must be function.");
        });

        it("should not do anything to a function that already has name and type properties set", function(){
           function Test(){

           }
           Test.$name = "Test";
           Test.$type = "service";
           var result = fromDirectoryUtils.setNameAndTypeOfModule(Test);
           expect(result).toBe(Test);
           expect(result.$name).toBe("Test");
           expect(result.$type).toBe("service");
        });

        it("should by default set type to factory if left unspecified", function(){
           function Test(){

           }
           Test.$name = "Test";
           var result = fromDirectoryUtils.setNameAndTypeOfModule(Test);
           expect(Test.$name).toBe("Test");
           expect(Test.$type).toBe("factory");
        });

        it("should be able to set name property from name of function, if getnamesfromfunction is true", function(){
           function Test(){

           }
           var result = fromDirectoryUtils.setNameAndTypeOfModule(Test, {useFunctionNames: true});
           expect(Test.$name).toBe("Test");
           expect(Test.$type).toBe("factory");
        });

        it("should not override $name property, even if getnamesfromfunction is true", function(){
           function Test(){

           }

           Test.$name = "somethingelse";
           var result = fromDirectoryUtils.setNameAndTypeOfModule(Test, {useFunctionNames: true});
           expect(Test.$name).toBe("somethingelse");
           expect(Test.$type).toBe("factory");
        });
    });

    describe("fromDirectoryUtils.processOneModule", function(){
        it("should be able to process a module", function(){
            var spy = spyOn(fromDirectoryUtils.Provide, "factory").andCallThrough();

            function fakeModule(){
                return "Senea";
            }

            fromDirectoryUtils.processOneModule(fakeModule, {useFunctionNames: true, defaultProvider: "factory"});
            expect(fakeModule.$name).toBe("fakeModule");
            expect(fakeModule.$type).toBe("factory");
            expect(spy).toHaveBeenCalledWith("fakeModule", fakeModule);

            //And just for added coolness.

            var Injector = require("sonya").Injector;

            Injector.invoke(function(fakeModule){
               expect(fakeModule).toBe("Senea");
            });

        });

    });

    describe("fromDirectoryUtils.processModules", function(){
        var modules = [];
        beforeEach(function(){
            modules = [
                function fakeModule1(){
                    return "Senea";
                },
                function fakeModule2(fakeModule1){
                    return fakeModule1 + " and Amala";
                }
            ]
        })
        it("should be able to process an array of modules", function(){
          var spy = spyOn(fromDirectoryUtils.Provide, "factory").andCallThrough();
          fromDirectoryUtils.processModules(modules, {useFunctionNames: true, defaultProvider: "factory"});
          expect(spy).toHaveBeenCalled();
          expect(fromDirectoryUtils.Provide.factory.calls.length).toBe(2);
          var Injector = require("sonya").Injector;
          Injector.invoke(function(fakeModule1, fakeModule2){
             expect(fakeModule1).toBe("Senea");
             expect(fakeModule2).toBe("Senea and Amala");
          });
       });
    });
});