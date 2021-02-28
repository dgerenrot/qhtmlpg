#include "qhtmlprinter.h"


       
const string QhtmlPrinter::EQ = "=";

const string QhtmlPrinter::ENDL = "\n";
const string QhtmlPrinter::LT = "<";
const string QhtmlPrinter::GT = ">";
const string QhtmlPrinter::START_CLOSE_TAG = "</";

const string QhtmlPrinter::STYLE = "<link rel=\"stylesheet\" href=\"\" >";
const string QhtmlPrinter::META_CHARSET = "<meta charset=\"UTF-8\" />";
const string QhtmlPrinter::META_KEYWORDS = "<meta name=\"keywords\" content=\"\" />";


void QhtmlPrinter::openTag(string tag) {
	tags.push(tag);
	os << padding << LT << tag;
}

void QhtmlPrinter::finishCurrOpenTag() {
	printClasses();
	printId();
	printAttrs();
	os << GT << ENDL;
	addPadding();
}

void QhtmlPrinter::closeCurrTag() {
	decreasePadding();
	os << padding << START_CLOSE_TAG << tags.top() << GT << ENDL;
	tags.pop();
}

void QhtmlPrinter::addClass(string clazz) {
	classes.push_back(clazz);
}

void QhtmlPrinter::addId(string id) {
	this->id = id;
}

void QhtmlPrinter::addAttr(string attr, string val) {
	attributes[attr] = val;
}


void QhtmlPrinter::addPadding() {
	string extra(padPerLevel, SPACE);
	padding += extra;
}

void QhtmlPrinter::decreasePadding() {
	padding.resize(padding.length() - padPerLevel);
}

void QhtmlPrinter::printClasses(){
	if (classes.size() == 0) 
		return;
	
	os << SPACE << CLASS << EQ << DQUOTE; 
	list<string>::iterator it = classes.begin();
	os << *it;
	
	while (++it != classes.end()) {
		os << SPACE;
		os << *it;
	}
	
	os << DQUOTE;

	classes.clear();
}

void QhtmlPrinter::printId(){
	if (id.length() == 0) 
		return;
	
	if (id.size() > 0) {
		os << SPACE << ID << EQ << DQUOTE << id << DQUOTE;
	}
	id = "";
}

void QhtmlPrinter::printAttrs(){

	for (map<string,string>::iterator it = attributes.begin();
	     it != attributes.end();
		 it++) {
		
		os << SPACE << it->first << EQ << DQUOTE;
		os << it->second << DQUOTE;
	}
	
	attributes.clear();
}

void QhtmlPrinter::printHead(string const &docPrefix, 
							 bool addStyle, 
							 bool addMeta) {
	os << docPrefix << ENDL;
	
	openTag(HTML);
	finishCurrOpenTag();	
	openTag(HEAD);
	finishCurrOpenTag();	
	openTag(TITLE);
	finishCurrOpenTag();	
	closeCurrTag();
	
	if (addStyle) {
		os << padding <<  STYLE << ENDL;
	}

	if (addMeta) {
		os << padding <<  META_CHARSET << ENDL;
		os << padding <<  META_KEYWORDS << ENDL;
	}
	
	closeCurrTag();

	openTag(BODY);
	finishCurrOpenTag();	
}

void QhtmlPrinter::closeHtml() {
	closeCurrTag();
	closeCurrTag();
}
