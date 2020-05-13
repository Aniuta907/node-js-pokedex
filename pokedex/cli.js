const meow = require('meow');
 
const cli = meow(`
    Options
    --name, -n Set a file name in the output directory
    --file, -f Select file from the input directory
    --length, -l Limit the length of the entered text
    --help, -h Output a hint
 
    Examples
    $ node cli.js --file index --name foo
    $ node cli.js --length 10
    $ node cli.js --help
`, {
    flags: {
        help: {
            type: 'boolean',
            alias: 'h'
        }
    }
});
 