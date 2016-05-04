
const PARSE_ERR = 1;
const DUP_ID_ERR = 2;
const BAD_DOCTYPE = 3;
const MISSING_ARG = 4;


module.exports = function() {

	this.err = function err(code,  msg) { 
		console.error(msg);
		process.exit(code);
	}

	this.errUnexpected = function errUnexpected(pos, badArg) {
		console.error("Unexpected character at position " + pos);

		if (badArg !== undefined) {
			console.error(badArg);
		}

		process.exit(PARSE_ERR);
	}

	this.errMismatchQuote = function errMismatchQuote(pos) {
		console.error("Quote mismatch at position " + pos);
		process.exit(PARSE_ERR);
	}

	this.errUnexpectedEOL = function errUnexpectedEOL() {
		console.error("Unexpected end of input.");
		process.exit(PARSE_ERR);
	}

	this.errDuplicateId = function errDuplicateId(pos) {
		console.error("Duplicate id for a tag at " + pos);
		process.exit(DUP_ID_ERR);	
	}
	
	return this;
};
