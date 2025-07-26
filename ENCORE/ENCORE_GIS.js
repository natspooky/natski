/*!
 * ENCORE GENERAL ICON SYSTEM
 * Author: NATSKI
 * MIT License
 */

import { values } from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_GIS_DATASET.mjs';
import * as DP from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_DP.mjs';

export default class Gicon-system {
	#observer;
	constructor() {
		this.#observer = new MutationObserver(this.#mutations.bind(this));
		this.setIcons(document.getElementsByTagName('GIS'));
	}

	observe(element) {
		this.#observer.observe(element, {
			childList: true,
			subtree: true,
		});
	}

	unObserve(element) {
		this.#observer.unObserve(element);
	}

	setIcons(icons) {
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

	#mutations() {
		this.setIcons(document.getElementsByTagName('GIS'));
	}
}
