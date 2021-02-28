#ifndef __QHTML_CONSTANTS__
#define __QHTML_CONSTANTS__

#include <string>
#include <map>

#include "usage.h"
#include "short_usage.h"

using namespace std;

const int DEFAULT_TABSIZE = 4;

const char SPACE = ' ';
const char QUOTE = '\'';
const char DQUOTE = '"';

// const string PAR_TOK = "P";
// const string CLASS_TOK =".";
// const string ID_TOK="#";
// const string OPEN_TOK = "[";
// const string CLOSE_TOK = "]";

const string HTML5_OPT = "5";
const string HTML4_01_STRICT_OPT = "401s";
const string HTML4_01_TRANS_OPT = "401t";
const string HTML4_01_FRAMES_OPT = "401f";
const string XHTML1_0_STRICT_OPT = "x10s";
const string XHTML1_0_TRANS_OPT = "x10t";
const string XHTML1_0_FRAMES_OPT = "x10f";
const string XHTML1_1_OPT = "x11";

const string DOCTYPE_HTML5 = "<!DOCTYPE html>";

const string DOCTYPE_HTML4_01_STRICT = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">";

const string DOCTYPE_HTML4_01_TRANS = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">";

const string DOCTYPE_HTML4_01_FRAMES = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\">";

const string DOCTYPE_XHTML1_0_STRICT = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">";

const string DOCTYPE_XHTML1_0_TRANS = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">";

const string DOCTYPE_XHTML1_0_FRAMES = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Frameset//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd\">";

const string DOCTYPE_XHTML1_1 = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">";

const string OPTS[] = {
	HTML5_OPT, 
	HTML4_01_STRICT_OPT,
	HTML4_01_TRANS_OPT,
	HTML4_01_FRAMES_OPT,
	XHTML1_0_STRICT_OPT,
	XHTML1_0_TRANS_OPT,
	XHTML1_0_FRAMES_OPT,
	XHTML1_1_OPT,
};

const string DOCTYPES[] = {
    DOCTYPE_HTML5,
    DOCTYPE_HTML4_01_STRICT,
    DOCTYPE_HTML4_01_TRANS,
    DOCTYPE_HTML4_01_FRAMES,
    DOCTYPE_XHTML1_0_STRICT,
    DOCTYPE_XHTML1_0_TRANS,
    DOCTYPE_XHTML1_0_FRAMES,
    DOCTYPE_XHTML1_1,
};

const int N_DOCTYPES = 8;


// const string SHORT_USAGE_TERMINATE = "OPTIONS:";

// const string FOR_FULL_USAGE = "\tFor full usage info, specify the -? option.";

#endif