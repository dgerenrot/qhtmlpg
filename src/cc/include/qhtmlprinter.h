#ifndef __QHTML_PRINTER__
#define __QHTML_PRINTER__

#include <iostream>
#include <stack>
#include <list>
#include <map>
#include <string>

#include "qhtmltagprocessor.h"
#include "constants.h"

using namespace std;

class QhtmlPrinter : public QhtmlTagProcessor {

	public:
		
		static const string EQ;
		
		static const string ENDL;
		static const string LT;
		static const string GT;
		static const string START_CLOSE_TAG;

		static const string STYLE;

		static const string META_CHARSET;
		static const string META_KEYWORDS;

	public:
	
		QhtmlPrinter(int initPadLength, int padPerLevel) 
			: padding(initPadLength, SPACE),
			padPerLevel(padPerLevel),
			os(cout)
		{
		}
	
		void openTag(string tag);
		void finishCurrOpenTag();
		void closeCurrTag();
		
		void addClass(string clazz);
		void addId(string id);
		void addAttr(string attr, string val);
		void printHead(string const &docPrefix, 
							 bool addStyle, 
							 bool addMeta);
							
		void closeHtml();
		void printEndl() { os << ENDL; }
	private:
		
		void addPadding();
		void decreasePadding();
		void printClasses();
		void printId();
		void printAttrs();
		
		stack<string> tags;
		list<string> classes;
		map<string, string> attributes;
		string id;
		
		ostream &os;
		
		string padding;
		int padPerLevel;
};

#endif
