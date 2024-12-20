/*!
 * ENCORE GENERAL ICON SYSTEM
 * Author: NATSKI
 * MIT License
 */

import { values } from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_GIS_DATASET.mjs';
import * as DP from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_DP.mjs';

var GISobj;

export default class GIS {
	constructor() {}

	init() {
		this.applyMasks(document.getElementsByTagName('GIS'));
		this.#createObserver();
	}

	applyMasks(icons) {
		for (const icon of icons) {
			if (
				icon.hasAttribute('name') &&
				values.includes(icon.getAttribute('name'))
			) {
				icon.style.mask = `url(https://natski.netlify.app/ENCORE/dependencies/GIS_icons/${icon.getAttribute(
					'name',
				)}.svg) no-repeat center`;
			} else if (icon.hasAttribute('src')) {
				let buffer = new Image();
				buffer.onload = function () {
					if (DP.getExtention(icon.getAttribute('src')) === '.svg') {
						icon.style.mask = `url(${icon.getAttribute(
							'src',
						)}) no-repeat center`;
					} else {
						icon.style.backgroundImage = `url(${icon.getAttribute(
							'src',
						)}) no-repeat center`;
					}
					icon.style.mask = `url(${icon.getAttribute(
						'src',
					)}) no-repeat center`;
				};
				buffer.onerror = function () {
					icon.style.mask = `url(https://natski.netlify.app/ENCORE/dependencies/GIS_icons/alert.svg) no-repeat center`;
				};
				buffer.src = icon.getAttribute('src');
			} else {
				icon.style.mask = `url(https://natski.netlify.app/ENCORE/dependencies/GIS_icons/alert.svg) no-repeat center`;
			}
			icon.style.visibility = 'visible';
		}
	}

	#createObserver() {
		this.observer = new MutationObserver(this.#mutations.bind(this));
		this.observer.observe(document, {
			attributes: false,
			childList: true,
			characterData: false,
			subtree: true,
		});
	}

	#mutations() {
		this.applyMasks(document.getElementsByTagName('GIS'));
	}
}

function loadGIS() {
	GISobj = new GIS().init();
}

window.addEventListener('DOMContentLoaded', loadGIS);
