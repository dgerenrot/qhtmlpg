#!/usr/bin/env node

var fs = require('fs');

function printAndExit(filePath) {
	var fileContents;
	fileContents = fs.readFileSync(filePath);
	
	console.log(new String(fileContents).toString());
	process.exit(0);
}

if (process.argv.length < 3) {
	printAndExit('./cc/short_usage.txt');
}

var opts = require ('./include/load_opts');

if (opts.fullUsage) {
	printAndExit('./cc/usage.txt');
}

var inStr = opts.options.argv 
			  &&  opts.options.argv.remain 
			  &&  opts.options.argv.remain[0];

if (!inStr) {
	console.error('No tag specifier string! \nFor usage info specify -u option.');
	process.exit(1);
}

var printer = new require('./qhtmlprinter')();
printer.setPadPerLevel(opts.tabSize);

var parser = new require('./qhtmlparser')();
parser.setInStr(inStr);
parser.setTagProcessor(printer);

printer.printHead(opts.docType, opts.addStyle, opts.addMeta);
parser.parseAndProcess();
printer.closeHtml();

