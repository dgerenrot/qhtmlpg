
var consts = require('./include/constants');
require('./qhtmltagprocessor')();


var EQ = '=';

//var ENDL = '\n';
var LT = '<';
var GT = '>';
var START_CLOSE_TAG = '</';

var STYLE = '<link rel=\'stylesheet\' href=\'\' >';
var META_CHARSET = '<meta charset=\'UTF-8\' />';
var META_KEYWORDS = '<meta name=\'keywords\' content=\'\' />';
var SPACE = consts.SPACE;
var QUOTE = consts.QUOTE;

var tags = [];
var classes = [];
var attributes = {};
var currId = "";
var padPerLevel;

var padding = "";
var tagStr = "";

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
		console.log(tagStr + GT);
		addPadding();
	};

	this.closeCurrTag = function() {
		decreasePadding();
		console.log(padding + START_CLOSE_TAG + tags.pop() + GT);
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
		console.log(docPrefix);
		
		openTag(HTML);
		finishCurrOpenTag();	
		openTag(HEAD);
		finishCurrOpenTag();	
		openTag(TITLE);
		finishCurrOpenTag();	
		closeCurrTag();
		
		if (addStyle) {
			console.log(padding + STYLE);
		}

		if (addMeta) {
			console.log(padding + META_CHARSET );
			console.log(padding + META_KEYWORDS);
		}
		
		closeCurrTag();

		openTag(BODY);
		finishCurrOpenTag();	
	};

	this.closeHtml = function() {
		closeCurrTag();
		closeCurrTag();
	};	
	return this;
};




function addPadding() {
	padding += SPACE.repeat(padPerLevel);
}

function decreasePadding() {
	padding = SPACE.repeat(padding.length - padPerLevel);
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

