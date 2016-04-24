#include <iostream>
#include <string>
#include <algorithm>

#include <cstdlib>
#include <cctype>
#include <unistd.h>

#include "constants.h"
#include "qhtmlparser.h"
#include "err.h"

using namespace std;

void processOpts(int ac, 
                 char* av[], 
				 int& paddingSize, 
				 string& docType,
				 bool& addStyle,
				 bool& addMeta);
    
void processDoctype(string opt, string& docType);
void printUsageAndExit();
void printShortUsageAndExit();

string optArgLowercase(char * optarg);
	
int main(int ac, char *av[]) {

	string output = "";
	// setConstants();
	

	int paddingSize = DEFAULT_PADSIZE;
	bool addStyle = true;
	bool addMeta = true;
	string docType = DOCTYPE_HTML5;

	
	if (ac < 2) {
		printShortUsageAndExit();
	}
	
	processOpts(ac, av, paddingSize, docType, addStyle, addMeta);
	
	QhtmlPrinter printer(0, paddingSize);
	string inStr = av[optind];

	QhtmlParser parser(inStr, printer);
	
	parser.someTestingRemoveMe(); 
	
	printer.printHead(docType, addStyle, addMeta);
	printer.printEndl();
	parser.parseAndProcess();
	
	printer.printEndl();
	printer.closeHtml();
	// cout << transformInput(inStr) << endl;
}


void processOpts(int ac, 
                 char* av[], 
				 int& paddingSize, 
				 string& docType,
				 bool& addStyle,
				 bool& addMeta) {
	int optChar;
	string optargStr;

	
	while ((optChar = getopt(ac, av, "h:t:s:m:u")) != -1) {
		
		switch (optChar) {
			case 'h':
				optargStr = optArgLowercase(optarg);
				processDoctype(optargStr, docType);
				break;
			case 't':
				paddingSize = atoi(optarg);
				break;
			case 's':
				optargStr = optArgLowercase(optarg);
				addStyle = (optargStr == "true" || optargStr == "yes");
				break;
			case 'm':
				optargStr = optArgLowercase(optarg);
				addMeta = (optargStr == "true" || optargStr == "yes");
				break;
			case 'u':
				printUsageAndExit();
				break;
			// TODO : output file -f ?
		}
	}
}

string optArgLowercase(char * optarg) {
	string optargStr = optarg;
	
	for (int i = 0; i < optargStr.length(); i++) {
		optargStr[i] = tolower(optargStr[i]);
	}	
	
	return optargStr;
} 		

    
void processDoctype(string opt, string& docType) {
	
	string* type = find(const_cast<string*> (&OPTS[0]),
					    const_cast<string*> (&OPTS[N_DOCTYPES]),
						opt);
	
	if (type >= &OPTS[N_DOCTYPES]) {
		err(BAD_DOCTYPE, "Unknown doctype option " + opt);
	}
	
	docType = *(DOCTYPES + (type - &OPTS[0]));
}
	

void printShortUsageAndExit() {
	cout << SHORT_USAGE << '\n';
	exit(0);
}

void printUsageAndExit() {
	cout << USAGE << '\n';
	exit(0);
}