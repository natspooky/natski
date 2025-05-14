/* -----------------------------------------------
/* Author : NATSKI - natski.net
/* MIT license : https://opensource.org/license/MIT
/* How to use? : Visit https://natski.net/dependencies/file-utils
/* ----------------------------------------------- */

export function MIME(file) {
	switch (fileExtention(file)) {
		case '.html':
		case '.htm':
			return 'text/html';
		case '.css':
			return 'text/css';
		case '.js':
		case '.mjs':
			return 'text/javascript';
		case '.csv':
			return 'text/csv';
		case '.txt':
			return 'text/plain';
		case '.json':
			return 'application/json';
		case '.xhtml':
			return 'application/xhtml+xml';
		case '.xml':
			return 'application/xml';
		case '.ogx':
			return 'application/ogg';
		case '.ico':
			return 'image/vnd.microsoft.icon';
		case '.jpg':
		case '.jpeg':
			return 'image/jpeg';
		case '.png':
			return 'image/png';
		case '.apng':
			return 'image/apng';
		case '.gif':
			return 'image/gif';
		case '.webp':
			return 'image/webp';
		case '.svg':
			return 'image/svg+xml';
		case '.avif':
			return 'image/avif';
		case '.bmp':
			return 'image/bmp';
		case '.tiff':
		case '.tif':
			return 'image/tiff';
		case '.mp4':
			return 'video/mp4';
		case '.ts':
			return 'video/mp2t';
		case '.avi':
			return 'video/x-msvideo';
		case '.webm':
			return 'video/webm';
		case '.mpeg':
			return 'video/mpeg';
		case '.ogv':
			return 'video/ogg';
		case '.aac':
			return 'audio/aac';
		case '.mp3':
			return 'audio/mpeg';
		case '.wav':
			return 'audio/wav';
		case '.weba':
			return 'audio/webm';
		case '.oga':
		case '.opus':
			return 'audio/ogg';
		case '.mid':
		case '.midi':
			return 'audio/midi';
		case '.ttf':
			return 'font/ttf';
		case '.otf':
			return 'font/otf';
		case '.woff':
			return 'font/woff';
		case '.woff2':
			return 'font/woff2';
		default:
			return 'application/octet-stream';
	}
}

export function checkMediaType(file, type) {
	let ext = fileExtention(file).substring(1);
	switch (type) {
		case 'video':
			return /mp(4|eg)|ts|avi|webm|ogv/i.test(ext);
		case 'audio':
			return /(web|og)a|opus|mp3|wav|aac|mi(di|d)/i.test(ext);
		case 'image':
			return /ico|jp(g|eg)|(pn|apn|sv)g|(gi|avi|tif|ti)f|(web|bm)p/i.test(
				ext,
			);
		case 'font':
			return /(o|t)tf|wof(f2|f)/i.test(ext);
		default:
			return undefined;
	}
}

export function fileExtention(file) {
	if (file.indexOf('.') != -1) {
		return file.substring(file.lastIndexOf('.'));
	}
	return 'unknown extention';
}

export function fileName(file) {
	if (file.indexOf('.') === -1) return undefined;

	let start = file.lastIndexOf('/');

	return file.substring(start !== -1 ? start + 1 : 0, file.indexOf('.'));
}
/*
export function fileDomain(file) {
	// make it only get domain
	if (file.indexOf('.') != -1) {
		return file.substring(file.lastIndexOf('.'));
	}
	return 'unknown extention';
}

export function filePath(file) {
	// make it remove domain but keep directory
	if (file.indexOf('.') != -1) {
		return file.substring(file.lastIndexOf('.'));
	}
	return 'unknown extention';
}*/
