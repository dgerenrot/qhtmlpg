

exports.DEFAULT_TABSIZE = 4;

exports.SPACE = ' ';
exports.QUOTE = '\'';
exports.DQUOTE = '"';

// exports.PAR_TOK = "P";
// exports.CLASS_TOK =".";
// exports.ID_TOK="#";
// exports.OPEN_TOK = "[";
// exports.CLOSE_TOK = "]";

exports.HTML5_OPT = "5";
exports.HTML4_01_STRICT_OPT = "401s";
exports.HTML4_01_TRANS_OPT = "401t";
exports.HTML4_01_FRAMES_OPT = "401f";
exports.XHTML1_0_STRICT_OPT = "x10s";
exports.XHTML1_0_TRANS_OPT = "x10t";
exports.XHTML1_0_FRAMES_OPT = "x10f";
exports.XHTML1_1_OPT = "x11";

exports.DOCTYPE_HTML5 = "<!DOCTYPE html>";

exports.DOCTYPE_HTML4_01_STRICT = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">";

exports.DOCTYPE_HTML4_01_TRANS = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">";

exports.DOCTYPE_HTML4_01_FRAMES = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\">";

exports.DOCTYPE_XHTML1_0_STRICT = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">";

exports.DOCTYPE_XHTML1_0_TRANS = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">";

exports.DOCTYPE_XHTML1_0_FRAMES = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Frameset//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd\">";

exports.DOCTYPE_XHTML1_1 = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">";

exports.HTML_OPTS = [
	exports.HTML5_OPT, 
	exports.HTML4_01_STRICT_OPT,
	exports.HTML4_01_TRANS_OPT,
	exports.HTML4_01_FRAMES_OPT,
	exports.XHTML1_0_STRICT_OPT,
	exports.XHTML1_0_TRANS_OPT,
	exports.XHTML1_0_FRAMES_OPT,
	exports.XHTML1_1_OPT,
];

DOCTYPES = {};
DOCTYPES[exports.HTML5_OPT] = exports.DOCTYPE_HTML5;
DOCTYPES[exports.HTML4_01_STRICT_OPT] = exports.DOCTYPE_HTML4_01_STRICT;
DOCTYPES[exports.HTML4_01_TRANS_OPT] = exports.DOCTYPE_HTML4_01_TRANS;
DOCTYPES[exports.HTML4_01_FRAMES_OPT] = exports.DOCTYPE_HTML4_01_FRAMES;
DOCTYPES[exports.XHTML1_0_STRICT_OPT] = exports.DOCTYPE_XHTML1_0_STRICT;
DOCTYPES[exports.XHTML1_0_TRANS_OPT] = exports.DOCTYPE_XHTML1_0_TRANS;
DOCTYPES[exports.XHTML1_0_FRAMES_OPT] = exports.DOCTYPE_XHTML1_0_FRAMES;
DOCTYPES[exports.XHTML1_1_OPT] = exports.DOCTYPE_XHTML1_1;

exports.DOCTYPES = DOCTYPES;

//exports.N_DOCTYPES = exports.DOCTYPES.length;

// Object.freeze(exports);