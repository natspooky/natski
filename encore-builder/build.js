import fs from 'node:fs';
import fsPromise from 'node:fs/promises';
import path from 'path';
import { minify } from 'terser';

export default async function createBuildFolder(folder) {
	console.log('BUILDING');

	const buildRoot = folder;

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

		const globals = {
			css: fs.existsSync('app/lib/css/global.css')
				? 'app/lib/css/global.css'
				: null,
			js: fs.existsSync('app/lib/js/global.js')
				? 'app/lib/js/global.js'
				: null,
		};

		const pageArr = findFiles('app/lib/pages');

		const allDataArr = findFiles('app');

		pageArr.forEach(async (file) => {
			const dirArray = path.dirname(file).split(/\/|\\/);

			//	let { metadata } = await import('../' + file);

			//	console.log('../' + file);

			const dir = path.join(
				...dirArray.slice(dirArray.indexOf('pages') + 1),
			);

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
						...path.dirname(file).split(/\/|\\/).slice(1),
						path.basename(file),
					),
				),
				globalCssPath: globals.css
					? path.relative(
							htmlDir,
							path.join(
								buildRoot,
								...path
									.dirname(globals.css)
									.split(/\/|\\/)
									.slice(1),
								path.basename(globals.css),
							),
					  )
					: null,
				globalJsPath: globals.js
					? path.relative(
							htmlDir,
							path.join(
								buildRoot,
								...path
									.dirname(globals.js)
									.split(/\/|\\/)
									.slice(1),

								path.basename(globals.js),
							),
					  )
					: null,
			});
		});

		allDataArr.forEach((file) => {
			copyMinFile(
				file,
				path.join(
					buildRoot,
					...path.dirname(file).split(/\/|\\/).slice(1),
					path.basename(file),
				),
			);
		});

		//const cssArr = findFiles('./lib/css');
	} catch (err) {
		console.error(err);
	}
	console.log('BUILD COMPLETE');
}

function createLongDir(dir) {
	const pathname = path.dirname(dir);

	const pathArr = pathname.split(/\/|\\/);

	pathArr.forEach((pathName, index, arr) => {
		const directory = path.join(
			...arr.filter((item, i) => {
				return i <= index;
			}),
		);
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory);
		}
	});
}

async function copyMinFile(dir, endDir) {
	createLongDir(endDir);

	if (path.extname(dir) !== '.js') {
		fs.copyFile(dir, endDir, function (err) {
			if (err) {
				return console.log(err);
			}
		});
		return;
	}

	const min = await minify(
		await fsPromise.readFile(dir, {
			encoding: 'utf8',
		}),
	);

	await fsPromise.writeFile(endDir, min['code']);
}

function createPage(dir, metaData) {
	createLongDir(dir);

	const element = ({ tag, children, params }) => {
		return `<${tag}${params ? ' ' + params.join(' ') : ''}>${
			children ?? ''
		}</${tag}>`;
	};

	const meta = ({ tag, params }) => {
		return `<${tag}${params ? ' ' + params.join(' ') : ''}/>`;
	};

	const page =
		'<!DOCTYPE html>' +
		element({
			tag: 'html',
			params: ['lang="en-US"'],
			children: [
				element({
					tag: 'head',
					children: [
						element({
							tag: 'title',
							children: path
								.basename(dir, path.extname(dir))
								.split('-')
								.map((word) => {
									return (
										word.slice(0, 1).toUpperCase() +
										word.slice(1)
									);
								})
								.join(' '),
						}),
						meta({
							tag: 'meta',
							params: ['charset="UTF-8"'],
						}),
						meta({
							tag: 'meta',
							params: [
								'name="viewport"',
								'content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"',
							],
						}),
						meta({
							tag: 'meta',
							params: ['name="theme-color"', 'content="#010409"'],
						}),
						meta({
							tag: 'meta',
							params: [
								'name="description"',
								`content="${metaData.description}"`,
							],
						}),
						metaData.pageCssPath
							? element({
									tag: 'link',
									params: [
										'rel="stlyesheet"',
										'type="text/css"',
										`href="${metaData.pageCssPath}"`,
									],
							  })
							: '',
						metaData.globalCssPath
							? element({
									tag: 'link',
									params: [
										'rel="stylesheet"',
										'type="text/css"',
										`href="${metaData.globalCssPath}"`,
									],
							  })
							: '',
						metaData.globalJsPath
							? element({
									tag: 'script',
									params: [
										'type="module"',
										`src="${metaData.globalJsPath}"`,
									],
							  })
							: '',
						element({
							tag: 'script',
							params: [
								'async',
								'type="module"',
								`src="${metaData.pageJsPath}"`,
							],
						}),
					].join(''),
				}),
				element({
					tag: 'body',
					params: ['id="root"'],
				}),
			].join(''),
		}); /*`



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
		
	

	`;*/

	fs.writeFile(dir, page, function (err) {
		if (err) {
			return console.log(err);
		}
	});
}

async function build(rootFolder) {
	if (fs.existsSync(rootFolder)) {
		await fsPromise.rm(
			rootFolder,
			{ recursive: true, force: true },
			(err) => {
				if (err) {
					throw err;
				}
			},
		);
	}

	const appContents = findFiles('app');
	const pageDir = findDirectory('pages', 'app');

	console.log(pageDir);

	const promise1 = Promise.resolve(3);
	const promise2 = 42;
	const promise3 = new Promise((resolve, reject) => {
		setTimeout(resolve, 100, 'foo');
	});

	return Promise.all([promise1, promise2, promise3]);
}

function findFiles(dir) {
	if (!fs.existsSync(dir)) return null;
	const dirContent = fs.readdirSync(dir).map((fileName) => {
		const filePath = path.join(dir, fileName);

		if (path.extname(filePath) === '') {
			return findFiles(filePath);
		}

		return filePath;
	});

	return dirContent.flat(Infinity);
}

function findDirectory(name, root) {
	const directory = fs.readdirSync(root);
	for (const fileName of directory) {
		console.log(fileName);
		if (fileName === name) return path.join(root, fileName);

		if (path.extname(fileName) === '') {
			const filePath = path.join(root, fileName);

			return findDirectory(name, filePath);
		}
	}
	return null;

	//	console.log(...dirContent.flat(Infinity).filter((item) => item != null));
}

function copyFileToLocation(copyPath, pastePath) {
	return new Promise(async (resolve, reject) => {
		let fileData;

		if (willMinify) {
			fileData = await minifyFile(copyPath);
		} else {
			fileData = copyPath;
		}

		if (fileData) resolve(fileData);
		reject('broken :(');
	});
}

async function minifyFile(path) {
	const contents = await fsPromise.readFile(path, {
		encoding: 'utf8',
	});
	return await minify(contents);
}
/*
function BuildDirectory(path) {
	if (!fs.existsSync(path)) return;

	const pathComponents = path.dirname(path).split(/\/|\\/);

	pathComponents.forEach((pathName, index, arr) => {
		const pathFragment = path.join(
			...arr.filter((item, i) => {
				return i <= index;
			}),
		);

		if (!fs.existsSync(pathFragment)) {
			fs.mkdirSync(pathFragment);
		}
	});
}

function buildRoot() {}

function BuildPage() {}
*/
