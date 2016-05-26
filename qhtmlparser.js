
var consts = require('./include/constants');
require ('./include/err')();

var QUOTE = consts.QUOTE;
var DQUOTE = consts.DQUOTE;

var ID_TOK = '#';
var CLASS_TOK = '.';
var HEADER_TOK = 'h';
var FOOTER_TOK = 'f';
var SECTION_TOK = 's';
var SPAN_TOK = 'S';
var PARAGRAPH_TOK = 'p';
var DIV_TOK = 'd';
var MAIN_TOK = 'm';
var FORM_TOK = 'F';

var H1_TOK = '1';
var H2_TOK = '2';
var H3_TOK = '3';
var H4_TOK = '4';
var H5_TOK = '5';
var H6_TOK = '6';
var TABLE_TOK = 't';

var TAG_OPEN = '[';
var TAG_CLOSE = ']';
var ATTRLIST_OPEN = '(';
var ATTRLIST_CLOSE = ')';
var EQUAL = '=';
var COMMA = ',';

var ATTRIBUTES_START = '.#(';

//TODO; consistent with isspace ????
var NONWORD_TOKENS = '.#=,\'\"[]() \t\n\r\f';
var SPACES = ' \t\n\r\f';
var NUMBERS = '0123456789';
var BYX = "x";
var NPOS = -1;

var input;
var tagProcessor;
var pos = 0;

var tabRows = 0;
var tabCols = 0;

module.exports = function () {

	this.setInStr = function (inStr) {
		input = inStr;
	};

	this.setTagProcessor = function(p) {
		tagProcessor = p;
	};
	
	this.parseAndProcess = function parseAndProcess() {
		parseInput();
	};

	this.parseInput = function parseInput() {
		while (!isEnd()) {
			spaces();
			nextTag();
			advanceNextToken();
			
			while (curr() == TAG_CLOSE) {
				tagProcessor.closeCurrTag();
				pos++;
				spaces();
			}
		}
	};
	
	return this;
};

function isEnd() {
	return pos >= input.length;
}

function noEndHere() {
	if (isEnd()) 
		errUnexpectedEOL();
}

function curr() {
	return input[pos];
}

function nextTag() {
	
	if (isEnd() || curr() == TAG_CLOSE) return;
			
	handleTagStartToken(); 

	if (!isAttrStart(curr()) && curr() != TAG_OPEN) {
		pos++;
		
		if (isspace(curr())) {		
			eatSpaceEnsureEndsWith(ATTRLIST_OPEN, TAG_OPEN);
		}
	} 

	if (isAttrStart(curr())) {
		readAllAttrs();
	}
	
	eatSpaceEnsureEndsWith(TAG_OPEN);

	tagProcessor.finishCurrOpenTag();
	tagProcessor.processTableDims(tabRows, tabCols);
}

function handleTagStartToken() {
	switch (curr()) {		
		case HEADER_TOK:
			tagProcessor.openTag(tagProcessor.HEADER);
			break;

		case FOOTER_TOK:
			tagProcessor.openTag(tagProcessor.FOOTER);
			break;

		case PARAGRAPH_TOK:
			tagProcessor.openTag(tagProcessor.PAR);
			break;

		case SECTION_TOK:
			tagProcessor.openTag(tagProcessor.SECTION);
			break;
			
		case SPAN_TOK:
			tagProcessor.openTag(tagProcessor.SPAN);
			break;
			
		case MAIN_TOK:
			tagProcessor.openTag(tagProcessor.MAIN);
			break;

		case FORM_TOK:
			tagProcessor.openTag(tagProcessor.FORM);
			tagProcessor.addAttr(tagProcessor.METHOD, tagProcessor.POST);
			tagProcessor.addAttr(tagProcessor.ACTION, '');
			break;

		case H1_TOK:
			tagProcessor.openTag(tagProcessor.H1);
			break;
		case H2_TOK:
			tagProcessor.openTag(tagProcessor.H2);
			break;
		case H3_TOK:
			tagProcessor.openTag(tagProcessor.H3);
			break;
		case H4_TOK:
			tagProcessor.openTag(tagProcessor.H4);
			break;
		case H5_TOK:
			tagProcessor.openTag(tagProcessor.H5);
			break;
		case H6_TOK:
			tagProcessor.openTag(tagProcessor.H6);
			break;

		case TABLE_TOK:
			tagProcessor.openTag(tagProcessor.TABLE);
			handleTableDimsIfNeed(); // must stop @ last digit!
			break;

		case DIV_TOK:
			
		case ID_TOK:
		case CLASS_TOK:
		case TAG_OPEN:
		case ATTRLIST_OPEN:
			tagProcessor.openTag(tagProcessor.DIV);
			break;
			
		default:
			errUnexpected(pos);
	}
}

function handleTableDimsIfNeed() {
	if (pos >= input.length - 1 || !isnum(input[pos + 1]))
		return;

	var numToken = ' ';
	pos++;

	while (isnum(curr())) {
		numToken += curr();
		pos++;
		noEndHere();
	}

	ensureOneOf(BYX);
	tabRows = +numToken;
	numToken = ' ';
	pos++;
	noEndHere();
	ensureOneOf.apply(null, NUMBERS.split(''));

	while (isnum(curr())) {
		numToken += curr();
		pos++;
		noEndHere();
	}
	pos--;
	tabCols = +numToken;	
}

function readAllAttrs() {
	var idFound = false;
	
	for (;;) {
		switch (curr()) {
			case CLASS_TOK:
				nextClass();
				break;

			case ID_TOK:
				if (idFound) {
					errDuplicateId(pos);
				}
				nextId();
				idFound = true;
				break;
				
			case ATTRLIST_OPEN:
				readNonstdAttrs();
				break;
				
			default:
				errUnexpected(pos);
		}
		
		eatSpaceEnsureEndsWith(CLASS_TOK, ID_TOK, ATTRLIST_OPEN, TAG_OPEN);
		
		if (curr() == TAG_OPEN) break;
	}
}

function readNonstdAttrs() {

	advanceNextToken();
	
	for (;;) {
		nextAttr();		
		if (curr() == ATTRLIST_CLOSE) break;
		advanceNextToken();
	}
	
	advanceNoEnd();
}

function nextClass() {
	advanceNoEnd();
	var wd = nextWord();
	tagProcessor.addClass(wd);
}

function nextId() {
	advanceNoEnd();

	var wd = nextWord();
	tagProcessor.addId(wd);
}

function nextAttr() {
	var attrName = nextWord();
	eatSpaceEnsureEndsWith(EQUAL);

	pos++;
	eatSpaceEnsureEndsWith(QUOTE, DQUOTE);	
	var quoteChar = curr();
	
	advanceNextToken();
	
	// TODO : ensure proper start of attr value;
	var attrValue = nextWord();
	noEndHere();

	if (curr() != quoteChar) {
		errMismatchQuote(pos);
	}

	pos++;
	eatSpaceEnsureEndsWith(COMMA, ATTRLIST_CLOSE);
	
	tagProcessor.addAttr(attrName, attrValue);
}

function nextWord() {
	var retVal = "";
	
	while (pos < input.length && !isNonWordTok(curr())) {
		retVal += curr();
		pos++;
	} 
	
	return retVal;
}

function isAttrStart(c) {
	return ATTRIBUTES_START.indexOf(c) != NPOS;
}

function isNonWordTok(c) {
	return NONWORD_TOKENS.indexOf(c) != NPOS;
}


function eatSpaceEnsureEndsWith() {
	spaces();
	noEndHere();
	ensureOneOf.apply(null, arguments);
}

function ensureOneOf() {
	var ok  = false;
	var c;
	var i;
	
	for (i = 0; i < arguments.length; i++) {
		c = arguments[i];
		
		if (curr() == c) {
			ok = true;
			break;
		}
	}
	
	if (!ok) {
		errUnexpected(pos, curr());
	}
}


function advanceNextToken() {
	pos++;
	spaces();
	noEndHere();
}

function advanceNoEnd() {
	pos++;
	noEndHere();
}

function spaces() {
	while (pos < input.length && isspace(curr())) {
		pos++;
    }
}

function isspace(c) {
	return SPACES.indexOf(c) != NPOS;
}

function isnum(c) {
	return NUMBERS.indexOf(c) != NPOS;
}
