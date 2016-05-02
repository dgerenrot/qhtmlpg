var consts= require('./constants');
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
		var optValue = (options[optName].toLowerCase() === "yes"
					    || options[optName].toLowerCase() === "true");

		options[optName] = optValue;
		
	} else {
		options[optName] = true;
	}

	exports[fullName] = options[optName];
}

readBoolStrOrTrue(options, "s", "styles");
readBoolStrOrTrue(options, "m", "metas");

exports.tabsize = options.t || consts.DEFAULT_TABSIZE;
exports.htmlvers = options.h  || consts.HTML5_OPT;

exports.options = options;
