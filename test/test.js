'use strict';
const expect = require('chai').expect;
const UpInfo = require('@www778878net/koa78-upinfo').default;

var iconv = require('iconv-lite');
var fs = require('fs'); 
console.log(process.argv)
var fspath = process.argv[3]
var config = loadjson(fspath);
console.log(config)
function loadjson(filepath) {
    var data;
    try {
        var jsondata = iconv.decode(fs.readFileSync(filepath, "binary"), "utf8");
        data = JSON.parse(jsondata); 
    }
    catch (err) {
        console.log(err);
    }
    return data;
}

describe("guid", () => {
    it('guid ', async () => {

        let up = new UpInfo(null);

        let newid = up.getNewid()
        expect(newid.length).to.equal(36);
    });
});