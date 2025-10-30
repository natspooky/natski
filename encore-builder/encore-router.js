import { MIME } from '../app/apis/dependencies/file-utils.js';
import Build from './build.js';
import { createServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import { existsSync, stat as _stat, readFile as _readFile } from 'fs';
import terminalLink from 'terminal-link';
import { join, extname as _extname } from 'path';
import path from 'path';
import { parse, fileURLToPath } from 'url';

const consoleColor = {
	reset: '\x1b[0m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	magenta: '\x1b[35m',
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const portNumber = 8080;

const httpServer = createServer((req, res) => {
	const parsedUrl = parse(req.url, true);
	const pathname = parsedUrl.pathname;
	let contentType = MIME(pathname);
	let filePath = join(__dirname + '\\..\\.encore\\', pathname);

	_stat('val', (err, stat) => {
		stat;
	});

	if (req.url == '/') {
		filePath += 'home.html';
		contentType = 'text/html';
	} else if (_extname(filePath) === '') {
		filePath += '.html';
		contentType = 'text/html';
	} else if (!existsSync(filePath)) {
		let time = performance.now();
		message(true, time, filePath);
		//readFile(filePath + '\\404.html', 'text/html', res);
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
	const finalTime = Math.round(performance.now() - time);

	console.log(
		`${state ? '❌' : '✅'} ${
			state ? consoleColor.red : consoleColor.green
		}[ ${state ? 'ERR' : 'GET'} ] ${consoleColor.reset}${
			file_path.split('\\')[file_path.split('\\').length - 1]
		} in ${consoleColor.magenta}${finalTime > 0 ? finalTime : '< 1'}ms ${
			consoleColor.reset
		}${state ? 'attempeted ' : ''}from ${
			consoleColor.yellow
		}${file_path.slice(0, file_path.lastIndexOf('\\') + 1)}${
			consoleColor.reset
		}`,
	);
}

const handleError = () => {
	console.log('errored');
};

httpServer.listen(portNumber, async () => {
	let link = terminalLink(portNumber, `http://localhost:${portNumber}`);

	console.clear();
	console.log(
		`${consoleColor.magenta}
    _/_/_/_/  _/      _/    _/_/_/    _/_/    _/_/_/    _/_/_/_/   
   _/        _/_/    _/  _/        _/    _/  _/    _/  _/          
  _/_/_/    _/  _/  _/  _/        _/    _/  _/_/_/    _/_/_/       
 _/        _/    _/_/  _/        _/    _/  _/    _/  _/            
_/_/_/_/  _/      _/    _/_/_/    _/_/    _/    _/  _/_/_/_/       
${consoleColor.reset}`,
	);

	console.log('*');

	await Build('./.encore');

	console.log(`Local Server on port: ${link}`);
});
