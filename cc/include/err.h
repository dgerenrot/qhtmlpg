#ifndef __QHTML_ERR__
#define __QHTML_ERR__

#include <iostream>
#include <sstream>
#include <string>
#include <cstdlib>

using namespace std;

const int PARSE_ERR = 1;
const int DUP_ID_ERR = 2;
const int BAD_DOCTYPE = 3;
const int MISSING_ARG = 4;

inline void err(int code, const string &msg) { 
	cerr << msg << endl;
	exit(code);
}

inline void err(int code, const char* msg) { 
	cerr << msg << endl;
	exit(code);
}

inline void errUnexpected(int pos) {
	
	cerr << "Unexpected character at position " << pos << endl;
	exit(PARSE_ERR);
}

inline void errMismatchQuote(int pos) {
	
	cerr << "Quote mismatch at position " << pos << endl;
	exit(PARSE_ERR);
}

inline void errUnexpectedEOL() {
	cerr << "Unexpected end of input." << endl;
	exit(PARSE_ERR);
}

inline void errDuplicateId(int pos) {
	cerr << "Duplicate id for a tag at " << pos << endl;
	exit(DUP_ID_ERR);	
}

#endif
