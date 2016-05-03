var request = require("request");
var cheerio = require("cheerio");
var mysql = require('mysql');

function Wheather(dayNumber, monthNumber, dayTemp) {
    this.dayNumber = dayNumber;
    this.monthNumber = monthNumber;
    this.dayTemp = dayTemp;
}

function updateInformation(callback) {
    var conf = {
        url: "https://www.gismeteo.by/weather-grodno-4243/month/"
    };
    request(conf, function (err, res, body) {
        if (err) {
            callback(err, null);
        }
        else {
            var str = body.replace(/\s/g, '');
            //var str = 'js_temp_graph date black">3<"temp" span>+16< dqwd w43 r2dcrf4 tgjs_temp_graph date black">3<"temp" span>+16<';
            var reg = /js_temp_graph.*?date.*?>(\d{1,2})<.*?"temp".*?span.*?>(.*?)</gmi;

            var match;
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'weatherdb'
            });

            connection.connect(function (err) {
                if (err) {
                    console.log('Error connecting to Db');
                    return;
                }
                console.log('Connection established');
            });

            connection.query('select * from weather', function (err, rows, fields) {
                var superString = "<table><tr><th>month</th><th>day</th><th>temperature</th></tr>";
                rows.forEach(function (row) {
                    superString += "<tr><td>" + row.monthNumber + "</td><td> " + row.dayNumber + "</td><td> " + row.temperature + "</td></tr>";
                });
                superString += "</table>";
                console.log(superString);
            });

            while ((match = reg.exec(str)) !== null) {
                console.log(match[1] + " " + match[2] + "\n");
                var day = match[1];
                var temp = match[2];

                var sql = 'select * from weather where monthNumber = 3 and dayNumber = ' + day;
                connection.query(sql, function (err, rows, fields) {
                    if (rows.length == 0) {
                        var insertSql = "insert into weather(monthNumber, dayNumber, temperature) values (3," + day + "," + temp + ")";
                        connection.query(insertSql, function (err, rows, fields) {
                            console.log("inserted");
                        });
                    } else {
                        var updatedSql = 'update weather set temperature = ' + temp + ' where monthNumber = 3 and dayNumber = ' + day;
                        connection.query(updatedSql, function (err, rows, fields) {
                            console.log("updated");
                        });
                    }
                });
            }
            connection.end();
        }
    });
}

exports.updateInformation = updateInformation;