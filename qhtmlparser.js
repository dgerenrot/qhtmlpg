
require ('./include/err')();

const ID_TOK = '#';
const CLASS_TOK = '.';
const HEADER_TOK = 'h';
const FOOTER_TOK = 'f';
const SECTION_TOK = 's';
const SPAN_TOK = 'S';
const PARAGRAPH_TOK = 'p';
const DIV_TOK = 'd';

const TAG_OPEN = '[';
const TAG_CLOSE = ']';
const ATTRLIST_OPEN = '(';
const ATTRLIST_CLOSE = ')';
const EQUAL = '=';
const COMMA = ',';

const ATTRIBUTES_START = '.#(';

//TODO; consistent with isspace ????
const NONWORD_TOKENS = '.#=,\'\"[]() \t\n\r\f';
const SPACES = ' \t\n\r\f';
const NPOS = -1;

var input;
var tagProcessor;
var pos = 0;

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
