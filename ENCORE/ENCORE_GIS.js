/*!
 * ENCORE GENERAL ICON SYSTEM
 * Author: NATSKI
 * MIT License
 */

import { iconNames as GISValues } from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_GIS_DATASET.mjs';

var GISobj;

class GIS {
	constructor() {
		this.icons = document.getElementsByTagName('GIS');
		this.observer;
	}

	init() {
		this.applyMasks();
		this.createObserver();
	}

	applyMasks() {
		for (const icon of this.icons) {
			if (
				icon.hasAttribute('name') &&
				GISValues.includes(icon.getAttribute('name'))
			) {
				icon.style.mask = `url(https://natski.netlify.app/icon/svg/ENCORE_GIS/${icon.getAttribute(
					'name',
				)}.svg) no-repeat center`;
			} else {
				icon.style.mask = `url(https://natski.netlify.app/icon/svg/ENCORE_GIS/alert.svg) no-repeat center`;
			}
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
		this.icons = document.getElementsByTagName('GIS');
		this.applyMasks();
	}
}

function loadGIS() {
	GISobj = new GIS().init();
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
