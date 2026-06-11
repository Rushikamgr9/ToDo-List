const fs = require("fs");

exports.readFile = (path) => {
    return JSON.parse(fs.readFileSync(path));
};

exports.writeFile = (path, data) => {
    fs.writeFileSync(
        path,
        JSON.stringify(data, null, 2)
    );
};