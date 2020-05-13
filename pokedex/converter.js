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

module.exports.convertCSVToJSON = convertCSVToJSON;
