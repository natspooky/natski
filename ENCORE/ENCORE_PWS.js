/*!
 * ENCORE PARALLAX WINDOW SYSTEM
 * Author: NATSKI
 * MIT License
 */

function PWSstyleCall(url, load) {
	let style = document.createElement('link');
	style.rel = 'stylesheet';
	style.type = 'text/css';
	style.href = url;
	document.getElementsByTagName('head')[0].appendChild(style);
	let linkloaded = document.createElement('img');
	linkloaded.onerror = function () {
		if (load) load();
	};
	linkloaded.src = url;
}

function checkLoadedPWS() {
	return document.readyState === 'complete';
}

function PWScssLoader() {
	if (deviceCheckPWS()) {
		PWSstyleCall(
			'https://natski.netlify.app/lib/ENCORE_DB/PWS/' +
				PWS_settings.style +
				'mobile.css',
			loadPWS,
		);
	} else {
		PWSstyleCall(
			'https://natski.netlify.app/lib/ENCORE_DB/PWS/' +
				PWS_settings.style +
				'.css',
			loadPWS,
		);
	}
}

if (checkLoadedPWS() == true) {
	PWScssLoader();
}

window.addEventListener('load', function () {
	setTimeout(() => {
		PWScssLoader();
	}, 300);
});

// MAKE SYSTEM HAVE DIFFERENT LAYERS THAT CAN BE STACKED USING CUSTOM ATTRIBUTES

//two settings, scroll and cursor

// mobile will be set to scroll by default
