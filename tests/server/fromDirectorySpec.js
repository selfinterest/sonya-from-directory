/**
 * Created by: Terrence C. Watson
 * Date: 7/17/14
 * Time: 2:35 PM
 */
describe("fromDirectory provider function", function(){
    var fromDirectory;
    beforeEach(function(){
       fromDirectory = require("../../lib/from-directory.js");
    });

    it("should exist", function(){
        expect(fromDirectory).toBeDefined();
    });

    it("should be a function", function(){
        expect(typeof fromDirectory).toBe("function");
    });



});