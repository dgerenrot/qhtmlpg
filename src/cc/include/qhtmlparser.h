#ifndef __QHTML_PARSER__
#define __QHTML_PARSER__

#include <string>
#include <deque>
#include <map>
#include <cstdarg>

#include "qhtmlprinter.h"
#include "constants.h"
#include "err.h"

using namespace std;



class QhtmlParser {
	public:

		static const char ID_TOK;
		static const char CLASS_TOK;
		static const char HEADER_TOK;
		static const char FOOTER_TOK;
		static const char SECTION_TOK;
		static const char SPAN_TOK;
		static const char PARAGRAPH_TOK;
		static const char DIV_TOK;

		static const char TAG_OPEN;
		static const char TAG_CLOSE;
		static const char ATTRLIST_OPEN;
		static const char ATTRLIST_CLOSE;
		static const char EQUAL;
		static const char COMMA;
	
		static const string NONWORD_TOKENS;
		static const string ATTRIBUTES_START;

		QhtmlParser(string& input, QhtmlTagProcessor &printer); 
		void parseAndProcess();
		
		inline void setInput(string& input) { this->input = input; }
			

	private:
	
		string &input;
		string outputHtml;
		int pos;

		QhtmlTagProcessor & processor;
		
		void parseInput();
		
		void nextTag();
		void nextClass();
		void nextId();
		void nextAttr();
		string nextWord();

		void readAllAttrs();
		void readNonstdAttrs();
		
		void handleTagStartToken();

		void eatSpaceEnsureEndsWith(int n, ...);
		void ensureOneOf(int n, ...);
		void ensureOneOf(int n, va_list args);

		void advanceNextToken();
		void advanceNoEnd();
		void spaces();

		inline bool isAttrStart(char c);
		inline bool isNonWordTok(char c);
		inline char curr() { return input[pos]; }
		inline bool isEnd() { return pos >= input.size(); }
		inline void noEndHere() { if (isEnd()) errUnexpectedEOL(); }
		
};



#endif