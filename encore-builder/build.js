import fs from 'node:fs';
import fsPromise from 'node:fs/promises';
import path from 'path';

function Meta({ title, description, author, keywords }) {}

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

		fs.mkdirSync(buildRoot);

		//buildPages();

		//buildLib();

		//buildStatic();

		const pageArr = findFiles('./app/lib/pages');

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
				pageJsPath: path.relative(htmlDir, file),
				//...meta,
			});
		});

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

function createPage(dir, meta) {
	createLongDir(dir);
	fs.writeFile(dir, 'HI', function (err) {
		if (err) {
			return console.log(err);
		}
		console.log(`${dir} compiled`);
	});
}
