#ifndef __QHTML_USAGE__
#define __QHTML_USAGE__
#include <string>

// GENERATED FILE! DO NOT EDIT!

using namespace std;

const string USAGE = "\n"
"\tUSAGE:\n"
"\n"
"\tqhtmlpg [OPTIONS] <TagPatternString>\n"
"\n"
"\tQuickly specify the structure of your HTML template on the command line!\n"
"\tThe <TagPatternString> determines the nesting of the tags using square\n"
"\tbrackets. \n"
"\t\n"
"\tThe correct doctype, html head and title tags are also included.\n"
"\n"
"\tFor example, if <TagPatternString> is '[]', then the output BODY contains\n"
"\ta single pair of open/close DIV tags. Some other tags are also supported.\n"
"\t\n"
"\tThe resulting HTML template is printed to stdout.\n"
"\n"
"\tOPTIONS:\n"
"\n"
"\t\t-h <DoctypeSpec>\tDoctype specifying the html version. \n"
"\t\t\t\t\t<DoctypeSpec> must be one of \n"
"\n"
"\t\t\t\t\t5, 401s, 401t, 401f, x10s, x10t, x10t or x11\n"
"\n"
"\t\t\t\t\t5 is the default, specifying HTML5. \n"
"\t\t\t\t\tSee www.w3.org for various HTML versions.\n"
"\n"
"\t\t-t <TabSize>\t\tTab size to use when nesting the tags.\n"
"\t\t\t\t\tThe default is 4.\n"
"\n"
"\t\t-s <YesOrNo>\t\tWhether or not to include <link rel=\"stylesheet\" ../>\n"
"\t\t\t\t\tdummy tag in the header. The default is Yes.\n"
"\n"
"\t\t-m <YesOrNo>\t\tWhether or not to include <meta  ... />\n"
"\t\t\t\t\tdummy tag in the header. The default is Yes.\n"
"\t\t\t\t\t\n"
"\tTAG PATTERN STRING.\n"
"\t\t\n"
"\t\tThe tag pattern string consists of nested pairs of square brackets. Each opening\n"
"\t\tbracket may be preceded by a <TagDescriptor>. The <TagDescriptor> starts with\n"
"\t\tan optional <TagSpecifier_opt> followed by any number of <ClassSpecifier_opt> strings, \n"
"\t\tat most one <IdSpecifier_opt> and other attributes enclosed in parentheses. \n"
"\t\t\n"
"\t\tThis closely resebles the syntax of jade template language. (See jade-lang.com).\n"
"\t\t\n"
"\t\tThus, the <TagDescriptor> has the form:\n"
"\t\t\n"
"\t\t<TagSpecifier_opt>(<ClassSpecifier_opt>)*(<IdSpecifier_opt>)?(<ClassSpecifier_opt>)*<AttrSpecifiers_opt>\n"
"\t\t\n"
"\t\tThe <TagSpecifier_opt> is one of:\n"
"\t\t\n"
"\t\td\t\tDIV tag (the default).\n"
"\t\tp\t\tP tag (paragraph).\n"
"\t\th\t\tHEADER tag (HTML5).\n"
"\t\tf\t\tFOOTER tag (HTML5).\n"
"\t\ts\t\tSECTION tag (HTML5)\n"
"\t\tS\t\tSPAN tag.\n"
"\t\t\n"
"\t\tThe <ClassSpecifier_opt> strings are of the form .classname \n"
"\t\t\n"
"\t\tThe <IdSpecifier_opt> string is of the form: #idname\n"
"\t\t\n"
"\t\tThe <AttrSpecifiers_opt> string is of the form: \n"
"\t\t\t\t(attribute1=\"value1\", attribute2=\"value2\", ...)\n"
"\t\t\n"
"\t\tAlthought HEADER, FOOTER and SECTION tags should be used with HTML5 or higher,\n"
"\t\tthis utility will NOT enforce such consistency nor will it warn the user.\n"
"\t\t\n"
"\tEXAMPLES:\n"
"\t\n"
"\t\tExample 1\n"
"\t\t\n"
"\t\t$ ./qhtmlpg '[] p[] s[[] []]' \n"
"\t\t\n"
"\t\t<!DOCTYPE html>\n"
"\t\t<html>\n"
"\t\t\t<head>\n"
"\t\t\t\t<title>\n"
"\t\t\t\t</title>\n"
"\t\t\t\t<link rel=\"stylesheet\" href=\"\" >\n"
"\t\t\t\t<meta/>\n"
"\t\t\t</head>\n"
"\t\t\t<body>\n"
"\n"
"\t\t\t\t<div>\n"
"\t\t\t\t</div>\n"
"\t\t\t\t<p>\n"
"\t\t\t\t</p>\n"
"\t\t\t\t<section>\n"
"\t\t\t\t\t<div>\n"
"\t\t\t\t\t</div>\n"
"\t\t\t\t\t<div>\n"
"\t\t\t\t\t</div>\n"
"\t\t\t\t</section>\n"
"\n"
"\t\t\t</body>\n"
"\t\t</html>\n"
"\n"
"\t\t\n"
"\t\t\n"
"\t\tExample 2\n"
"\t\t\n"
"\t\t>./qhtmlpg 'S.myclass1.foo.#myId.myclass2(att=\"bar\", att2=\"baz\")[ [] ]'\n"
"\n"
"\t\t<!DOCTYPE html>\n"
"\t\t<html>\n"
"\t\t\t<head>\n"
"\t\t\t\t<title>\n"
"\t\t\t\t</title>\n"
"\t\t\t\t<link rel=\"stylesheet\" href=\"\" >\n"
"\t\t\t\t<meta/>\n"
"\t\t\t</head>\n"
"\t\t\t<body>\n"
"\n"
"\t\t\t\t<span class=\"myclass1 foo  myclass2\" id='myId' att=\"bar\" att2=\"baz\">\n"
"\t\t\t\t\t<div>\n"
"\t\t\t\t\t</div>\n"
"\t\t\t\t</span>\n"
"\n"
"\t\t\t</body>\n"
"\t\t</html>\n"
"\n"
"\t\t\n"
;

#endif