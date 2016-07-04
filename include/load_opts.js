require('./constants')();
var nopt = require('nopt');

var knownOpts = {
	  "h" : String
    , "t" : Number
	, "s" : String
	, "m" : String
	, "u" : Boolean
};

var shortHands = {
};

var options = nopt(knownOpts, shortHands);

function readBoolStrOrTrue(options, optName, fullName) {
	if (options[optName] !== undefined) {
		var optValue = (options[optName].toLowerCase() === 'yes'
					    || options[optName].toLowerCase() === 'true');

		options[optName] = optValue;
		
	} else {
		options[optName] = true;
	}

	exports[fullName] = options[optName];
}

readBoolStrOrTrue(options, 's', 'addStyle');
readBoolStrOrTrue(options, 'm', 'addMeta');

exports.tabSize = options.t || DEFAULT_TABSIZE;
exports.fullUsage = options.u;
exports.htmlVersOpt = options.h  || HTML5_OPT;

exports.docType = DOCTYPES[exports.htmlVersOpt];

exports.options = options;
