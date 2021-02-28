#include <iostream>
#include <fstream>
#include <string>
#include <algorithm>

#include <cctype>

using namespace std;

const char IFNDEF_PREF[] = "#ifndef __QHTML_";
const char DEFINE_PREF[] = "#define __QHTML_";
const char SUFFIX[] = "__";
const char ENDIF[] = "#endif";
const char INCL_STRING_H[] = "#include <string>";
const char GENERATED_WARNING[] = "// GENERATED FILE! DO NOT EDIT!";
const char CONST_STRING_DECL[] = "const std::string ";
const char EQUALSIGN[] = " = ";
const char FILESEP = '\\';
const char DOT = '.';

void errUsage();
string createBaseName(string& inFileName);

int main(int ac, char *av[]) {

	if (ac != 3) {
		errUsage();
	}

	string inFileName(av[1]);
	string outFileName(av[1]);

	fstream inFile(av[1], ios_base::in);
	fstream outFile(av[2], ios_base::out);

	string baseName = createBaseName(inFileName);
	string varName = baseName;
	transform(varName.begin(), varName.end(), varName.begin(), toupper);

	outFile << IFNDEF_PREF << varName << SUFFIX << '\n';
	outFile << DEFINE_PREF << varName << SUFFIX << '\n';
	outFile << '\n';
	outFile << INCL_STRING_H << '\n';
	outFile << '\n';
	outFile << GENERATED_WARNING << '\n';
	outFile << '\n';
	outFile << CONST_STRING_DECL << varName << EQUALSIGN << '\n';

	char c;
	bool newLine = true;
	while ((c = inFile.get()) != -1) {

		if (newLine) {
			outFile << "\"";
			newLine = false;
		}

		if (c == '\\') {
			outFile << "\\\\";
		}
		else if (c == '"')
		{
			outFile << "\\\"";
		}
		else if (c == '\t')
		{
			outFile << "\\t";
		}
		else if (c == '\n')
		{
			outFile << "\\n\"\n";
			newLine = true;
		}
		else
		{
			outFile << c;
		}
	}

	outFile << ";\n";
	outFile << ENDIF << '\n';


	return 0;
}

void errUsage() {
	cerr << "Usage: make_headers <txt_file> <header>";
	exit(1);
}

string createBaseName(string& fileName) {
	size_t pos = fileName.rfind(FILESEP);
	pos = (pos == string::npos ? 0 : pos + 1);

	string baseName = fileName.substr(pos);
	pos = baseName.find(DOT);
	if (pos != string::npos) {
		baseName = baseName.substr(0, pos);
	}
	return baseName;
}

