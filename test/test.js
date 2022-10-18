'use strict';
const expect = require('chai').expect;
const UpInfo = require('@www778878net/koa78-upinfo').default;
const restler = require('restler');
const Promise78 = require('@www778878net/promise78').default;

const app = require('../dist/index');
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

describe("no power", () => {
    it('test78 ', async () => {
        function test() {
            return new Promise78((resolve, reject) => {
                restler.get("http://localhost:88/Api7822/Test78/test", { data: { pars: ["test"] } })
                    .on('complete', function (back) {
                        resolve(back) 
                    }); 
            })
        }
        let [err, res] = await test();
        expect(err).to.be.null;

        expect(res["back"]).to.equal("看到我说明路由ok,中文ok,无权限调用OK");
    });
});