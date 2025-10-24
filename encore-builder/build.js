import fs from 'node:fs';
import fsPromise from 'node:fs/promises';
import path from 'path';
import { minify } from 'minify';
import tryToCatch from 'try-to-catch';

export default async function createBuildFolder() {
	console.log('BUILDING');

	const buildRoot = './.encore';

	try {
		if (fs.existsSync(buildRoot)) {
			await fsPromise.rm(
				buildRoot,
				{ recursive: true, force: true },
				(err) => {
					if (err) {
						throw err;
					}
				},
			);
		}

		//fs.mkdirSync(buildRoot);

		/*
		const globals = {
			css: findFiles('./app/lib/css/global.css'),
			js: findFiles('./app/lib/js/global.js'),
		};*/

		const pageArr = findFiles('./app/lib/pages');

		const allDataArr = [
			...findFiles('./app/lib'),
			...findFiles('./app/apis'),
			...findFiles('./app/icon'),
		];

		pageArr.forEach(async (file) => {
			const dirArray = path.dirname(file).split('\\');

			const dir = dirArray
				.slice(dirArray.indexOf('pages') + 1)
				.join('\\');
			const name = path.basename(file, path.extname(file));

			const htmlDir = path.format({
				root: '/ignored',
				dir: path.join(buildRoot, dir),
				name: name,
				ext: 'html',
			});

			//	const { meta } = await import(file);

			createPage(htmlDir, {
				pageJsPath: path.relative(
					htmlDir,
					path.join(
						path.dirname(file).split('\\').slice(1).join('\\'),
						path.basename(file),
					),
				),
				//...meta,
			});
		});

		allDataArr.forEach((file) => {
			copyMinFile(
				file,
				path.join(
					buildRoot,
					path.dirname(file).split('\\').slice(1).join('\\'),
					path.basename(file),
				),
			);
		});

		console.log('BUILD COMPLETE');
		//const cssArr = findFiles('./lib/css');
	} catch (err) {
		console.error(err);
	}
}

function findFiles(dir) {
	const dirContent = fs.readdirSync(dir).map((fileName) => {
		const filePath = path.join(dir, fileName);

		if (path.extname(filePath) === '') {
			return findFiles(filePath);
		}

		return filePath;
	});

	return dirContent.flat(Infinity);
}

function createLongDir(dir) {
	const pathname = path.dirname(dir);

	const pathArr = pathname.split('\\');

	pathArr.forEach((pathName, index, arr) => {
		const directory = arr
			.filter((item, i) => {
				return i <= index;
			})
			.join('\\');
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory);
		}
	});
}

async function copyMinFile(dir, endDir) {
	const options = {
		js: {
			type: 'putout',
			putout: {
				quotes: `'`,
				fixCount: 1,
				conditions: false,
				mangleClassNames: false,
				mangle: false,
				mergeVariables: false,
				removeUnusedVariables: false,
				removeConsole: false,
				removeUselessSpread: false,
				applyTemplateLiterals: false,
				convertStrictEqualToEqual: false,
			},
		},
		css: {
			type: 'lightningcss',
		},
	};

	const [, data] = await tryToCatch(minify, dir, options);
	createLongDir(endDir);

	console.log(endDir);
	if (true) {
		//console.error(error);

		fs.copyFile(dir, endDir, function (err) {
			if (err) {
				return console.log(err);
			}
		});
		return;
	}

	fs.writeFile(endDir, data, function (err) {
		if (err) {
			return console.log(err);
		}
	});
}

function createPage(dir, meta) {
	createLongDir(dir);

	const page = `
	<!DOCTYPE html>
<html lang="en-US">
	<head>
        
		<meta charset="UTF-8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
		/>
		<meta name="theme-color" content="#010409" />
		<meta
			name="description"
			content="The home of NATSKI web tools and games"
		/>
		<meta name="keywords" content="portfolio, natspooky, natski" />
		<meta name="author" content="NATSKI" />
		<meta name="copyright" content="NATSKI" />
		<meta name="color-scheme" content="normal" />
		<link
			rel="icon"
			type="image/png"
			href="https://natski.vercel.app/icon/system_icons/favicon/favicon-96x96.png"
			sizes="96x96"
		/>
		<link
			rel="icon"
			type="image/svg+xml"
			href="https://natski.vercel.app/icon/system_icons/favicon/favicon.svg"
		/>
		<link
			rel="shortcut icon"
			href="https://natski.vercel.app/icon/system_icons/favicon/favicon.ico"
		/>
		<link
			rel="apple-touch-icon"
			sizes="180x180"
			href="https://natski.vercel.app/icon/system_icons/favicon/apple-touch-icon.png"
		/>
		<meta name="apple-mobile-web-app-title" content="Natski" />
		<link
			rel="manifest"
			href="https://natski.vercel.app/icon/system_icons/favicon/site.webmanifest"
		/>
		<meta property="og:title" content="Home" />
		<meta
			property="og:description"
			content="The home of NATSKI web tools and games"
		/>
		<meta
			property="og:image"
			content="https://natski.vercel.app/icon/system_icons/embed/400.png"
		/>
		<meta property="og:image:width" content="400" />
		<meta property="og:image:height" content="400" />
		<meta property="og:url" content="https://natski.vercel.app" />
		<meta property="og:locale" content="en_US" />
		<meta property="og:type" content="website" />
		<meta property="og:site_name" content="NATSKI" />
		<meta name="twitter:title" content="Home" />
		<meta
			name="twitter:description"
			content="The home of NATSKI web tools and games"
		/>
		<meta
			name="twitter:image"
			content="https://natski.vercel.app/icon/system_icons/embed/400.png"
		/>
		<meta name="twitter:site" content="@natspooky_" />
		<meta name="twitter:creator" content="@natspooky_" />
		<meta name="twitter:card" content="summary" />
		<link rel="stylesheet" type="text/css" href="lib/css/main.css" />
		<link rel="stylesheet" type="text/css" href="lib/css/index.css" />
		<link
			rel="stylesheet"
			type="text/css"
			media="screen and (orientation: portrait)"
			href="lib/css/scale.css"
		/>
		<script type="module" src="../lib/js/embedded_page_scripts.js"></script>
		<script async type="module" src="${meta.pageJsPath}"></script>
	</head>

	<body id="root"></body>
</html>

	`;

	fs.writeFile(dir, page, function (err) {
		if (err) {
			return console.log(err);
		}
	});
}
