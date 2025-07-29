const url = new URL(window.location.href);

if (!(url.searchParams.get('embed') == 'false')) {
	if (window.location === window.parent.location) {
		window.location.href = `${url.protocol + '//' + url.host}/#${
			url.pathname.replace('.html', '') + url.hash
		}${
			url.searchParams.get('embed')
				? '?' + url.searchParams.get('embed')
				: ''
		}`.toLowerCase();
	}
} else {
	document.body.style.padding = '20px 0 0 0';
}
