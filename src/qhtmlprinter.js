
require('./utils/constants')();
require('./qhtmltagprocessor')();


var EQ = '=';


var LT = '<';
var GT = '>';
var START_CLOSE_TAG = '</';

var STYLE = '<link rel=\'stylesheet\' href=\'\' >';
var META_CHARSET = '<meta charset=\'UTF-8\' />';
var META_KEYWORDS = '<meta name=\'keywords\' content=\'\' />';
// var SPACE = consts.SPACE;
// var QUOTE = consts.QUOTE;
var TROW = "tr";
var TDIVIDE = "td";

var tags = [];
var classes = [];
var attributes = {};
var currId = '';
var padPerLevel;

var padding = '';
var tagStr = '';
var outFile = '';

module.exports = function() {

	this.setPadPerLevel = function(n) {
		padPerLevel = n;
	};
	
	this.openTag = function(tag) {
		tags.push(tag);
		tagStr = padding + LT + tag;
	};

	this.finishCurrOpenTag = function() {
		printClasses();
		printId();
		printAttrs();
		doPrint(tagStr + GT);
		addPadding();
	};

	this.closeCurrTag = function() {
		decreasePadding();
		doPrint(padding + START_CLOSE_TAG + tags.pop() + GT);
	};

	this.processTableDims = function(tabRows, tabCols) {
		var i , j;
		for (i = 0; i < tabRows; i++) {
			openTag(TROW);
			finishCurrOpenTag();
			for (j = 0; j < tabCols; j++) {
				openTag(TDIVIDE);
				finishCurrOpenTag();
				closeCurrTag();
			}
			closeCurrTag();
		}
	};

	this.addClass = function(clazz) {
		classes.push(clazz);
	};

	this.addId = function(id) {
		currId = id;
	};

	this.addAttr = function(attr, val) {
		attributes[attr] = val;
	};	

	
	this.printHead = function(docPrefix, 
							  addStyle, 
							  addMeta) {
		doPrint(docPrefix);
		
		openTag(HTML);
		finishCurrOpenTag();	
		openTag(HEAD);
		finishCurrOpenTag();	
		openTag(TITLE);
		finishCurrOpenTag();	
		closeCurrTag();
		
		if (addStyle) {
			doPrint(padding + STYLE);
		}

		if (addMeta) {
			doPrint(padding + META_CHARSET );
			doPrint(padding + META_KEYWORDS);
		}
		
		closeCurrTag();

		openTag(BODY);
		finishCurrOpenTag();	
	};

	this.closeHtml = function() {
		closeCurrTag();
		closeCurrTag();
	};	
	
	this.setOutFile = function(fd) {
		outFile = fd;
	}
	return this;
};




function addPadding() {
	
	// ECMA 6 could use repeat(), but...
	for (var i = 0; i < padPerLevel; i++) {
		padding += SPACE;
	}
}

function decreasePadding() {
	var len = padding.length - padPerLevel;
	padding = '';
	for (var i = 0; i < len; i++) {
		padding += SPACE;
	}
}

function printClasses(){

	if (classes.length == 0) 
		return;
	
	tagStr += SPACE + CLASS + EQ + QUOTE; 
	tagStr += classes[0];
	
	for (var i = 1; i < classes.length; i++) {
		tagStr += SPACE + classes[i];
	}
	
	tagStr += QUOTE;

	classes = [];
}

function printId(){
	
	if (currId.length > 0) {
		tagStr += SPACE + ID + EQ + QUOTE + currId + QUOTE;
	}
	
	currId = "";
}

function printAttrs(){

	for (var attName in attributes) {
		tagStr += SPACE + attName + EQ + QUOTE;
		tagStr += attributes[attName] + QUOTE;
	}
	
	attributes = {};
}

function doPrint(str) {
	if (outFile) {
		outFile.write(str + '\n');
	} else {
		console.log(str);
	}
}
