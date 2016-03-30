var request = require("request");

function Wheather(dayNumber, daySymbol, dayTemp, nightTemp) {
    this.dayNumber = dayNumber;
    this.daySymbol = daySymbol;
    this.dayTemp = dayTemp;
    this.nightTemp = nightTemp;
}

function show() {
    var url = "http://meteo.by/grodno/";
    var regExpExt = new RegExp("date\"><strong>([0-9]*).*<\\/strong><span>([а-я]*).*?ночь.*?<nobr>(.*?)<.*день.*?<nobr>(.*?)<", "igm");
    var regExp = new RegExp("date\"><strong>([0-9]*).*<\\/strong><span>([а-я]*).*?");
    request(url, function (error, response, body) {
        if (!error) {
            var result = body.match(regExp);
            var wheather = new Wheather(result[1], result[2], 1, 2);
            return collectStringInTable(wheather);
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
