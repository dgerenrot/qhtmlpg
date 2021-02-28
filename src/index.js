#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var err = require('./include/err').err;

var USAGE_FILE = 'cc' + path.sep + 'usage.txt';
var SHORT_USAGE_FILE = 'cc' + path.sep + 'short_usage.txt';
var JS_EXTENSION = '.js$';

var fullUsage = '';
var shortUsage = '';

var basedir = loadUsage();
var outFilePath = '';

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

if (opts.outFile) {
	var fd = fs.createWriteStream(opts.outFile,
								 {
									  flags : 'w'
									, autoClose : true
								 });
	printer.setOutFile(fd);
}

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
	
	var basedir = process.mainModule && process.mainModule.filename;
	basedir = path.dirname(basedir) + path.sep;
	if (loadUsageFrom(basedir + USAGE_FILE, basedir + SHORT_USAGE_FILE)) {
		return ;
	}
}
