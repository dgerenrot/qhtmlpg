# qhtmlpg

	USAGE:

	./qhtmlpg [OPTIONS] <TagPatternString>

	Quickly specify the structure of your HTML template on the command line!
	From your brain to your hard drive in seconds! Executables provided.
	
	The <TagPatternString> argument specifies the nesting of the tags inside the body,
	while <!DOCTYPE...> and <HEAD> stuff is generated automatically.
	
		
	EXAMPLES:
	
		
		$ ./qhtmlpg '[] p[] s[ [] [] ]' 
		
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
		
		
		
	
		$./qhtmlpg.exe -h 401t '[[]] f[]'
		
		<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
		<html>
		    <head>
		        <title>
		        </title>
		        <link rel="stylesheet" href="" >
		        <meta charset="UTF-8" />
		        <meta name="keywords" content="" />
		    </head>
		    <body>
		
		        <div>
		            <div>
		            </div>
		        </div>
		        <footer>
		        </footer>
		
		    </body>
		</html>

		
		$./qhtmlpg 'S.myclass1.foo.#myId.myclass2(att="bar", att2="baz")[ [] ]'

		<!DOCTYPE html>
		<html>
			<head>
				<title>
				</title>
				<link rel="stylesheet" href="" >
				<meta/>
			</head>
			<body>

				<span class="myclass1 foo  myclass2" id="myId" att="bar" att2="baz">
					<div>
					</div>
				</span>

			</body>
		</html>

		
