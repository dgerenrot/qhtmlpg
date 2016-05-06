#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var err = require('./include/err').err;

var USAGE_FILE = 'cc' + path.sep + 'usage.txt';
var SHORT_USAGE_FILE = 'cc' + path.sep + 'short_usage.txt';
var JS_EXTENSION = '.js';

var fullUsage = '';
var shortUsage = '';

var basedir = loadUsage();


if (process.argv.length < 3){
	printAndExit(shortUsage);
}

var opts = require ('./include/load_opts');

if (opts.fullUsage) {
	printAndExit(fullUsage);
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


function printAndExit(fileContents) {
	console.log(fileContents);
	process.exit(0);
}

function loadUsageFrom(file1, file2) {
		
	try {
		fullUsage = fs.readFileSync(file1).toString();
		shortUsage = fs.readFileSync(file2).toString();
		if (fullUsage
			&& shortUsage
			&& fullUsage.length > 0
			&& shortUsage.length  >0)
			
			return true;
	}
	catch (e) {
	}
	
	return false;
}

function loadUsage() {
    var basedir = './';

	if (loadUsageFrom(basedir + USAGE_FILE, basedir + SHORT_USAGE_FILE)) {
		return ;
	}
	
	var ind;
	
	if (process.argv.length > 1 
		&& process.argv[1].endsWith(JS_EXTENSION)) {
		ind = 1;
	}
	else if (process.argv[0].endsWith(JS_EXTENSION)) {
		ind = 0;
	}
	else {
		console.error('Cannot find JavaScript program name!');
		console.error('You should use this utility as a nodejs module!.');
		process.exit(8);
	}
	
	basedir = path.dirname(process.argv[ind]);
	
	console.log(basedir + ';')
	if (!basedir.endsWith(path.sep)) {
		basedir = basedir + path.sep;
	}

	if (loadUsageFrom(basedir + USAGE_FILE, basedir + SHORT_USAGE_FILE)) {
		return;
	}
	
    try {
		basepath = path.dirname(fs.readlinkSync(process.argv[ind]));
		return;
    }
	catch (exception) {
		console.error('Cannot find JavaScript program name!');
		console.error('You should use this utility as a nodejs module!.');
		process.exit(8);
    }
}
