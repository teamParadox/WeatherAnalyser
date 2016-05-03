var request = require("request");
var cheerio = require("cheerio");

function Wheather(dayNumber, daySymbol, dayTemp, nightTemp) {
    this.dayNumber = dayNumber;
    this.daySymbol = daySymbol;
    this.dayTemp = dayTemp;
    this.nightTemp = nightTemp;
}

function show(callback) {
    var conf = {
        url: "http://6.pogoda.by/26825",
        encoding: "windows-1251"
    };
    request(conf, function (err, res, body) {
        if (err) {
            callback(err, null);
        }
        else {
            console.log(body);
            $ = cheerio.load(body);
            var dayWeather = [];
            var content = $('#forecast tr');
            console.log(content.html());
            //.each(function () {
            //dayWeather.push({
            //});
            callback(null,content.html());
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
