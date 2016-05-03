var request = require("request");
var cheerio = require("cheerio");
var iconv = require('iconv').Iconv;
var iconv_lite = require('iconv-lite');


function buildHtml(body) {
    var header = '<meta http-equiv="content-type" content="text/html; charset=utf-8">';

    // concatenate header string
    // concatenate body string

    return '<!DOCTYPE html>'
        + '<html><header>' + header + '</header><body>' + body + '</body></html>';
};

function Wheather(dayNumber, daySymbol, dayTemp, nightTemp) {
    this.dayNumber = dayNumber;
    this.daySymbol = daySymbol;
    this.dayTemp = dayTemp;
    this.nightTemp = nightTemp;
}

function show(callback) {
    var conf = {
        //url: "http://6.pogoda.by/26825",
        url: "https://www.gismeteo.by/weather-grodno-4243/month/"
        //encoding: "UTF-8"
    };
    request(conf, function (err, res, body) {
        if (err) {
            callback(err, null);
        }
        else {
            var str = body.replace(/\s/g,'');
            //var str = 'js_temp_graph date black">3<"temp" span>+16< dqwd w43 r2dcrf4 tgjs_temp_graph date black">3<"temp" span>+16<';
            var reg = /js_temp_graph.*?date.*?>(\d{1,2})<.*?"temp".*?span.*?>(.*?)</gmi;

            var match;

            while ((match = reg.exec(str)) !== null) {
                console.log(match[1]+" "+match[2]+"\n");
            }
            //console.log(body);
            //var iconvObj = new Iconv('windows-1251', 'UTF-8');
            //var x = iconvObj.convert(body);
            //var newBody = iconv_lite.encode(body,"UTF-8");
            //var newBody = iconv_lite.decode(body,"UTF-8");
            //var newBody = body;
            //$ = cheerio.load(body);
            //var dayWeather = [];
            //var content = $("table.table_month tr.row td");
            //content.each(function() {
            //    content.nex
            //});
            //content = buildHtml(content);
            //console.log(content.html());
            ////.each(function () {
            //dayWeather.push({
            //});

            callback(null,body);
        }
    });
}

function collectStringInTable(wheater) {
    var str = "<table border='5px solid'>";
    str += "<tr>";
    str += "<td>";
    str += "Day number";
    str += "</td>";
    str += "<td>";
    str += "Day name";
    str += "</td>";
    str += "<td>";
    str += "Temp day";
    str += "</td>";
    str += "<td>";
    str += "Temp night";
    str += "</td>";
    str += "</tr>";
    str += "<tr>";
    str += "<td>";
    str += wheater.dayNumber;
    str += "</td>";
    str += "<td>";
    str += wheater.daySymbol;
    str += "</td>";
    str += "<td>";
    str += 4;
    str += "</td>";
    str += "<td>";
    str += 5;
    str += "</td>";
    str += "</tr>";
    str += "</table>";
    return str;
}

exports.show = show;
