# qhtmlpg

	USAGE:

	./qhtmlpg [OPTIONS] <TagPatternString>

	Quickly specify the structure of your HTML template on the command line!
	The <TagPatternString> determines the nesting of the tags using square
	brackets. 
	
	The correct doctype, html head and title tags are also included.

	For example, if <TagPatternString> is '[]', then the output BODY contains
	a single pair of open/close DIV tags. Some other tags are also supported.
	
	The resulting HTML template is printed to stdout.

	OPTIONS:

		-h <DoctypeSpec>	Doctype specifying the html version. 
					<DoctypeSpec> must be one of 

					5, 401s, 401t, 401f, x10s, x10t, x10t or x11

					5 is the default, specifying HTML5. 
					See www.w3.org for various HTML versions.

		-t <TabSize>		Tab size to use when nesting the tags.
					The default is 4.

		-s <YesOrNo>		Whether or not to include <link rel="stylesheet" ../>
					dummy tag in the header. The default is Yes.

		-m <YesOrNo>		Whether or not to include <meta  ... />
					dummy tag in the header. The default is Yes.
					
	TAG PATTERN STRING.
		
		The tag pattern string consists of nested pairs of square brackets. Each opening
		bracket may be preceded by a <TagDescriptor>. The <TagDescriptor> starts with
		an optional <TagSpecifier_opt> followed by any number of <ClassSpecifier_opt> strings, 
		at most one <IdSpecifier_opt> and other attributes enclosed in parentheses. 
		
		This closely resebles the syntax of jade template language. (See jade-lang.com).
		
		Thus, the <TagDescriptor> has the form:
		
		<TagSpecifier_opt>(<ClassSpecifier_opt>)*(<IdSpecifier_opt>)?(<ClassSpecifier_opt>)*<AttrSpecifiers_opt>
		
		The <TagSpecifier_opt> is one of:
		
		d		DIV tag (the default).
		p		P tag (paragraph).
		h		HEADER tag (HTML5).
		f		FOOTER tag (HTML5).
		s		SECTION tag (HTML5)
		S		SPAN tag.
		
		The <ClassSpecifier_opt> strings are of the form .classname 
		
		The <IdSpecifier_opt> string is of the form: #idname
		
		The <AttrSpecifiers_opt> string is of the form: 
				(attribute1="value1", attribute2="value2", ...)
		
		Althought HEADER, FOOTER and SECTION tags should be used with HTML5 or higher,
		this utility will NOT enforce such consistency nor will it warn the user.
		
	EXAMPLES:
	
		Example 1
		
		$ ./qhtmlpg '[] p[] s[[] []]' 
		
		<!DOCTYPE html>
		<html>
			<head>
				<title>
				</title>
				<link rel="stylesheet" href="" >
				<meta/>
			</head>
			<body>

				<div>
				</div>
				<p>
				</p>
				<section>
					<div>
					</div>
					<div>
					</div>
				</section>

			</body>
		</html>

		
		
		Example 2
		
		>./qhtmlpg 'S.myclass1.foo.#myId.myclass2(att="bar", att2="baz")[ [] ]'

		<!DOCTYPE html>
		<html>
			<head>
				<title>
				</title>
				<link rel="stylesheet" href="" >
				<meta/>
			</head>
			<body>

				<span class="myclass1 foo  myclass2" id='myId' att="bar" att2="baz">
					<div>
					</div>
				</span>

			</body>
		</html>

		
