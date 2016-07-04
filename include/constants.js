module.exports = function () {

	this.DEFAULT_TABSIZE = 4;

	this.SPACE = ' ';
	this.QUOTE = '\'';
	this.DQUOTE = '"';

	// this.PAR_TOK = "P";
	// this.CLASS_TOK =".";
	// this.ID_TOK="#";
	// this.OPEN_TOK = "[";
	// this.CLOSE_TOK = "]";

	this.HTML5_OPT = "5";
	this.HTML4_01_STRICT_OPT = "401s";
	this.HTML4_01_TRANS_OPT = "401t";
	this.HTML4_01_FRAMES_OPT = "401f";
	this.XHTML1_0_STRICT_OPT = "x10s";
	this.XHTML1_0_TRANS_OPT = "x10t";
	this.XHTML1_0_FRAMES_OPT = "x10f";
	this.XHTML1_1_OPT = "x11";

	this.DOCTYPE_HTML5 = "<!DOCTYPE html>";

	this.DOCTYPE_HTML4_01_STRICT = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">";

	this.DOCTYPE_HTML4_01_TRANS = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">";

	this.DOCTYPE_HTML4_01_FRAMES = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\">";

	this.DOCTYPE_XHTML1_0_STRICT = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">";

	this.DOCTYPE_XHTML1_0_TRANS = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">";

	this.DOCTYPE_XHTML1_0_FRAMES = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Frameset//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd\">";

	this.DOCTYPE_XHTML1_1 = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">";

	this.HTML_OPTS = [
		this.HTML5_OPT, 
		this.HTML4_01_STRICT_OPT,
		this.HTML4_01_TRANS_OPT,
		this.HTML4_01_FRAMES_OPT,
		this.XHTML1_0_STRICT_OPT,
		this.XHTML1_0_TRANS_OPT,
		this.XHTML1_0_FRAMES_OPT,
		this.XHTML1_1_OPT,
	];

	DOCTYPES = {};
	DOCTYPES[this.HTML5_OPT] = this.DOCTYPE_HTML5;
	DOCTYPES[this.HTML4_01_STRICT_OPT] = this.DOCTYPE_HTML4_01_STRICT;
	DOCTYPES[this.HTML4_01_TRANS_OPT] = this.DOCTYPE_HTML4_01_TRANS;
	DOCTYPES[this.HTML4_01_FRAMES_OPT] = this.DOCTYPE_HTML4_01_FRAMES;
	DOCTYPES[this.XHTML1_0_STRICT_OPT] = this.DOCTYPE_XHTML1_0_STRICT;
	DOCTYPES[this.XHTML1_0_TRANS_OPT] = this.DOCTYPE_XHTML1_0_TRANS;
	DOCTYPES[this.XHTML1_0_FRAMES_OPT] = this.DOCTYPE_XHTML1_0_FRAMES;
	DOCTYPES[this.XHTML1_1_OPT] = this.DOCTYPE_XHTML1_1;

	this.DOCTYPES = DOCTYPES;

}
