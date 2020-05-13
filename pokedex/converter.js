const createReadStream = require('fs').createReadStream;
const createWriteStream = require('fs').createWriteStream;
const csvjson = require('csvjson');
const toObject = csvjson.stream.toObject();
const stringify = csvjson.stream.stringify();
createReadStream('./input.csv', 'utf-8')
    .pipe(toObject)
    .pipe(stringify)
    .pipe(createWriteStream('./output.json'));