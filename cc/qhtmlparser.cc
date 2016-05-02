#include <iostream>
#include <sstream>
#include <deque>
#include <ctype.h>
#include <cstdarg>

#include "qhtmlparser.h"

using namespace std;

const char QhtmlParser::ID_TOK = '#';
const char QhtmlParser::CLASS_TOK = '.';
const char QhtmlParser::HEADER_TOK = 'h';
const char QhtmlParser::FOOTER_TOK = 'f';
const char QhtmlParser::SECTION_TOK = 's';
const char QhtmlParser::SPAN_TOK = 'S';
const char QhtmlParser::PARAGRAPH_TOK = 'p';
const char QhtmlParser::DIV_TOK = 'd';

const char QhtmlParser::TAG_OPEN = '[';
const char QhtmlParser::TAG_CLOSE = ']';
const char QhtmlParser::ATTRLIST_OPEN = '(';
const char QhtmlParser::ATTRLIST_CLOSE = ')';
const char QhtmlParser::EQUAL = '=';
const char QhtmlParser::COMMA = ',';

const string QhtmlParser::ATTRIBUTES_START = ".#(";

//TODO; consistent with isspace ????
const string QhtmlParser::NONWORD_TOKENS = ".#=,'\"[]() \t\n\r\f";


QhtmlParser::QhtmlParser(string &input, QhtmlTagProcessor &processor) 
		: input(input),
	      processor(processor),
		  pos(0) {
}

void QhtmlParser::parseAndProcess() {
	parseInput();
}

void QhtmlParser::parseInput() {
	while (!isEnd()) {
		spaces();
		nextTag();
		advanceNextToken();
		
		while (curr() == TAG_CLOSE) {
			processor.closeCurrTag();
			pos++;
			spaces();
		}
	}
}

void QhtmlParser::nextTag() {
	
	if (isEnd() || curr() == TAG_CLOSE) return;
			
	handleTagStartToken();

	if (!isAttrStart(tolower(curr())) && curr() != TAG_OPEN) {
		pos++;
		
		if (isspace(curr())) {		
			eatSpaceEnsureEndsWith(2, ATTRLIST_OPEN, TAG_OPEN);
		}
	} 

	if (isAttrStart(curr())) {
		readAllAttrs();
	}
	
	eatSpaceEnsureEndsWith(1, TAG_OPEN);

	processor.finishCurrOpenTag();
	
	
	// while (curr() != TAG_CLOSE) {
		// nextTag();
		// advanceNextToken();
	// }
	
	//processor.closeCurrTag();
}

void QhtmlParser::handleTagStartToken() {
	switch (curr()) {		
		case HEADER_TOK:
			processor.openTag(processor.HEADER);
			break;

		case FOOTER_TOK:
			processor.openTag(processor.FOOTER);
			break;

		case PARAGRAPH_TOK:
			processor.openTag(processor.PAR);
			break;

		case SECTION_TOK:
			processor.openTag(processor.SECTION);
			break;
			
		case SPAN_TOK:
			processor.openTag(processor.SPAN);
			break;
			
		case DIV_TOK:
			
		case ID_TOK:
		case CLASS_TOK:
		case TAG_OPEN:
		case ATTRLIST_OPEN:
			processor.openTag(processor.DIV);
			break;
			
		default:
			errUnexpected(pos);
	}
}

void QhtmlParser::readAllAttrs() {
	bool idFound = false;
	
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
		
		eatSpaceEnsureEndsWith(4, CLASS_TOK, ID_TOK, ATTRLIST_OPEN, TAG_OPEN);
		
		if (curr() == TAG_OPEN) break;
	}
}

void QhtmlParser::readNonstdAttrs() {

	advanceNextToken();
	
	for (;;) {
		nextAttr();		
		if (curr() == ATTRLIST_CLOSE) break;
		advanceNextToken();
	}
	
	advanceNoEnd();
}

void QhtmlParser::nextClass() {
	advanceNoEnd();
	string wd = nextWord();
	processor.addClass(wd);
}

void QhtmlParser::nextId() {
	advanceNoEnd();

	string wd = nextWord();
	processor.addId(wd);
}

void QhtmlParser::nextAttr() {
	string attrName = nextWord();
	eatSpaceEnsureEndsWith(1, EQUAL);

	pos++;
	eatSpaceEnsureEndsWith(2, QUOTE, DQUOTE);	
	char quoteChar = curr();
	
	advanceNextToken();
	
	// TODO : ensure proper start of attr value;
	string attrValue = nextWord();
	noEndHere();

	if (curr() != quoteChar) {
		errMismatchQuote(pos);
	}

	pos++;
	eatSpaceEnsureEndsWith(2, COMMA, ATTRLIST_CLOSE);
	
	processor.addAttr(attrName, attrValue);
}

string QhtmlParser::nextWord() {
	string retVal;
	
	while (pos < input.length() && !isNonWordTok(curr())) {
		retVal += curr();
		pos++;
	} 
	
	return retVal;
}

inline bool QhtmlParser::isAttrStart(char c) {
	return ATTRIBUTES_START.find(c) != string::npos;
}

inline bool QhtmlParser::isNonWordTok(char c) {
	return NONWORD_TOKENS.find(c) != string::npos;
}


void QhtmlParser::eatSpaceEnsureEndsWith(int n, ...) {
	spaces();
	noEndHere();
	va_list args;
	va_start(args, n);	
	ensureOneOf(n, args);
	va_end(args);
}

void QhtmlParser::ensureOneOf(int n, ...) {
	bool ok  = false;
	int c;
	int i;
	
	va_list args;
	va_start(args, n);

	ensureOneOf(n, args);
	
	va_end(args);
}

void QhtmlParser::ensureOneOf(int n, va_list args) {
	bool ok  = false;
	int c;
	int i;
	
	for (i = 0; i < n; i++) {
		c = va_arg(args, int);

		if ((int)(curr()) == c) {
			ok = true;
			break;
		}
	}
	
	if (!ok) {
		errUnexpected(pos);
	}
}


void QhtmlParser::advanceNextToken() {
	pos++;
	spaces();
	noEndHere();
}

void QhtmlParser::advanceNoEnd() {
	pos++;
	noEndHere();
}

void QhtmlParser::spaces() {
	while (pos < input.size() && isspace(curr())) {
		pos++;
    }
}

