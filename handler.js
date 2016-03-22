var fs = require("fs");
var index = fs.readFileSync('./index.html');
function handle() {
    return index;
}

exports.handle = handle;