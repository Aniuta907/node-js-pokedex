const meow = require('meow');
const minimist = require('minimist');
const converter = require('./converter');

const cli = meow(
	`
    Options
    --name, -n  to set a file name in the output directory
    --file, -f  to select file from the input directory
    --length, -l  to limit the length of the entered text
    --text, -t  to enter text
    --help, -h  to output a hint
 
    Examples
    $ node index.js --file input --name output
    $ node index.js --length 10 --text meowmeowmeow
    $ node index.js --help
`,
	{
		flags: {
			help: {
				type: 'boolean',
				alias: 'h'
			}
		}
	}
);

const args = minimist(process.argv.slice(2), {
	alias: {
		h: 'help',
		n: 'name',
		f: 'file',
		l: 'length',
		t: 'text'
	},
	unknown: (arg) => {
		console.error('Invalid parameter:', arg);
		cli.showHelp();
		return false;
	}
});

if (args.name && args.file) converter.convertCSVToJSON(args.file, args.name);
else if (args.length) console.log(converter.reverseStr(args.text, args.length));
else {
	console.error('Please use the help below');
	cli.showHelp();
}
