import { MIME } from './apis/dependencies/file-utils/fu.min.js';
import { createServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import {
	existsSync,
	stat as _stat,
	readFile as _readFile,
	readdir as _readdir,
} from 'fs';
import terminalLink from 'terminal-link';
import { join, extname as _extname } from 'path';
import path from 'path';
import { parse, fileURLToPath } from 'url';

const red = '\x1b[31m';
const green = '\x1b[32m';
const reset = '\x1b[0m';
const yellow = '\x1b[33m';
const magenta = '\x1b[35m';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const portNumber = 8080;

const httpServer = createServer((req, res) => {
	const parsedUrl = parse(req.url, true);
	const pathname = parsedUrl.pathname;
	let contentType = MIME(pathname);
	let filePath = join(__dirname, pathname);

	_stat('val', (err, stat) => {
		stat;
	});

	if (req.url == '/') {
		filePath += 'index.html';
		contentType = 'text/html';
	} else if (!existsSync(filePath) || _extname(filePath) === '') {
		let time = performance.now();
		message(true, time, filePath);
		readFile(__dirname + '\\404.html', 'text/html', res);
		return;
	}

	readFile(filePath, contentType, res);
});

function readFile(file_path, contentType, res) {
	let time = performance.now();
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

			message(false, time, file_path);

			res.end();
		});
	} else {
		message(true, time, file_path);
	}
}

function message(state, time, file_path) {
	console.log(
		`${state ? '❌' : '✅'} ${state ? red : green}[ ${
			state ? 'ERR' : 'GET'
		} ] ${reset}${
			file_path.split('\\')[file_path.split('\\').length - 1]
		} in ${magenta}${((performance.now() - time) * 100).toFixed(
			0,
		)}ms ${reset}${
			state ? 'attempeted ' : ''
		}from ${yellow}${file_path.slice(
			0,
			file_path.lastIndexOf('\\') + 1,
		)}${reset}`,
	);
}

const handleError = (res) => {
	console.log('errored');
};

httpServer.listen(portNumber, () => {
	let link = terminalLink(portNumber, `http://localhost:${portNumber}`);
	console.log('Starting ENCORE server dependencies...');

	console.log(`Server is running on port ${link}`);
});
