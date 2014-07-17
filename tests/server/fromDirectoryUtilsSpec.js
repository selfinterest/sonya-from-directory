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

        it("should return an array of files containing the names of the files in the directory", function(){
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



    });

});