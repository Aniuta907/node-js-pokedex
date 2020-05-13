const meow = require('meow');
const minimist = require('minimist');
const converter = require('./converter');
 
const cli = meow(`
    Options
    --name, -n Set a file name in the output directory
    --file, -f Select file from the input directory
    --length, -l Limit the length of the entered text
    --help, -h Output a hint
 
    Examples
    $ node index.js --file index --name foo
    $ node index.js --length 10
    $ node index.js --help
`, {
    flags: {
        help: {
            type: 'boolean',
            alias: 'h'
        }
    }
});

const args = minimist(process.argv.slice(2), {
    alias: {
        h: 'help',
        n: 'name',
        f: 'file',
        l: 'length',
    },
    unknown: (arg) => {
        console.error('Invalid parameter:', arg);
        meow.showHelp();
        return false;
    }
});

converter.convertCSVToJSON(args.file, args.name);