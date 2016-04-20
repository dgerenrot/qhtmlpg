#ifndef __QHTML_TAGPROCESSOR__
#define __QHTML_TAGPROCESSOR__

#include <string>

using namespace std;


class QhtmlTagProcessor {
	
	public:
		static const string HTML;
		static const string HEAD;
		static const string TITLE;
		static const string BODY;

		static const string HEADER;
		static const string FOOTER;
		static const string SECTION;

		static const string SPAN;
		static const string DIV;
		static const string PAR;

		
		static const string CLASS;
		static const string ID;
			
		virtual void openTag(string tag) =  0;
		virtual void finishCurrOpenTag() =  0;
		virtual void closeCurrTag() =  0;
		
		virtual void addClass(string clazz) =  0;
		virtual void addId(string id) =  0;
		virtual void addAttr(string attr, string val) =  0;
};



#endif