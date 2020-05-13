function convertCSVToJSON(inputName, outputName) {
	const createReadStream = require('fs').createReadStream;
	const createWriteStream = require('fs').createWriteStream;

	const csvjson = require('csvjson');

	const toObject = csvjson.stream.toObject();
	const stringify = csvjson.stream.stringify();

	createReadStream(`../input/${inputName}.csv`, 'utf-8')
		.pipe(toObject)
		.pipe(stringify)
		.pipe(createWriteStream(`../output/${outputName}.json`));
}

function reverseStr(str, len) {
	const trimmedStr = str.substr(0, len);
	const reversedStr = trimmedStr.split('').reverse().join('');
	return reversedStr;
}

module.exports.convertCSVToJSON = convertCSVToJSON;
module.exports.reverseStr = reverseStr;
