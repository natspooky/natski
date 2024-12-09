/*!
 * ENCORE GENERAL ICON SYSTEM
 * Author: NATSKI
 * MIT License
 */

import { iconNames as GISValues } from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_GIS_DATASET.mjs';

var GISobj;

class GIS {
	constructor() {
		this.icons = document.getElementsByTagName('GIS-icon');
		this.observer;
	}

	init() {
		this.applyMasks();
		this.createObserver();
	}

	applyMasks() {
		for (let i = 0; i < this.icons.length; i++) {
			let iconName = this.icons[i].getAttribute('name');
			if (!iconName || !GISValues.includes(iconName)) {
				iconName = 'alert';
			}
			this.icons[
				i
			].style.mask = `url(https://natski.netlify.app/icon/svg/ENCORE_GIS/${iconName}.svg) no-repeat center`;
		}
	}

	createObserver() {
		this.observer = new MutationObserver(this.mutations.bind(this));
		this.observer.observe(document, {
			attributes: false,
			childList: true,
			characterData: false,
			subtree: true,
		});
	}

	mutations() {
		this.icons = document.getElementsByTagName('GIS-icon');
		this.applyMasks();
	}
}

function loadGIS() {
	GISobj = new GIS();
	GISobj.init();
}

function GISstyleCall(url, load) {
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

function checkLoadedGIS() {
	return document.readyState === 'complete';
}
/*
if (checkLoadedGIS()) {
	GISstyleCall(
		`https://natski.netlify.app/lib/ENCORE_DB/GIS/${GIS_settings.style}GIS.css`,
		loadGIS,
	);
}

window.addEventListener('load', function () {
	GISstyleCall(
		`https://natski.netlify.app/lib/ENCORE_DB/GIS/${GIS_settings.style}GIS.css`,
		loadGIS,
	);
});
*/
loadGIS();
