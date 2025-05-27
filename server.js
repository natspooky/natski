import { MIME } from './api/dependencies/file-utils/fu.min.js';
import { createServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import { existsSync, stat as _stat, readFile as _readFile } from 'fs';
import { join, extname as _extname } from 'path';
import path from 'path';
import { parse, fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const portNumber = 8080;
let i = 0;

const httpServer = createServer((req, res) => {
	const parsedUrl = parse(req.url, true);
	const pathname = parsedUrl.pathname;
	let contentType = MIME(pathname);
	let filePath = join(__dirname, pathname);

	console.log(
		`${existsSync(filePath) ? 'GET' : 'ERROR'}`,
		filePath.split('\\')[filePath.split('\\').length - 1],
		i++,
	);

	_stat('val', (err, stat) => {
		stat;
	});

	if (req.url == '/') {
		filePath += 'index.html';
		contentType = 'text/html';
	} else if (!existsSync(filePath) || _extname(filePath) === '') {
		return;
	}

	readFile(filePath, contentType, res);
});

function readFile(file_path, contentType, res) {
	if (existsSync(file_path)) {
		res.writeHead(StatusCodes.OK, {
			'Content-Type': contentType,
		});

		_readFile(file_path, (error, data) => {
			if (error) {
				handleError(res);
				return;
			}
			res.write(data);
			res.end();
		});
	} else {
		readFile(__dirname + '\\404.html', 'text/html', res);
	}
}

const handleError = (res) => {
	console.log('errored');
};

httpServer.listen(portNumber, () => {
	console.log(`Server is listening on port ${portNumber}`);
});
