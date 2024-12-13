/*!
 * ENCORE GENERAL ICON SYSTEM
 * Author: NATSKI
 * MIT License
 */

import * as GIS_data from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_GIS_DATASET.mjs';

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
				GIS_data.values.includes(icon.getAttribute('name'))
			) {
				icon.style.mask = `url(https://natski.netlify.app/ENCORE/dependencies/GIS_icons/${icon.getAttribute(
					'name',
				)}.svg) no-repeat center`;
			} else {
				icon.style.mask = `url(https://natski.netlify.app/ENCORE/dependencies/GIS_icons/alert.svg) no-repeat center`;
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

window.addEventListener('DOMContentLoaded', loadGIS);
