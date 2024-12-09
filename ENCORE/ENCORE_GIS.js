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
		for (const icon of this.icons) {
			//let i = 0; i < this.icons.length; i++) {
			let iconName = icon.getAttribute('name');
			if (!iconName || !GISValues.includes(iconName)) {
				iconName = 'alert';
			}
			icon.style.mask = `url(https://natski.netlify.app/icon/svg/ENCORE_GIS/${iconName}.svg) no-repeat center`;
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

function GISstyleCall(url) {
	let style = document.createElement('link');
	style.rel = 'stylesheet';
	style.type = 'text/css';
	style.href = url;
	document.getElementsByTagName('head')[0].appendChild(style);
}

window.addEventListener('DOMContentLoaded', function () {
	if (GIS_settings.style) {
		GISstyleCall(
			`https://natski.netlify.app/lib/ENCORE_DB/GIS/${GIS_settings.style}GIS.css`,
		);
	}
	loadGIS();
});
