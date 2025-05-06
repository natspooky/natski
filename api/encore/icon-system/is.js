/* -----------------------------------------------
/* Author : NATSKI - natski.net
/* MIT license : https://opensource.org/license/MIT
/* GitHub : https://github.com/natspooky/encore
/* How to use? : Check the GitHub README or visit https://natski.net/api/encore/icon-system
/* ----------------------------------------------- */

import { default as IS_DATA } from 'https://natski.net/api/encore/icon-system/dependencies/IS_DATA.js';
import * as DP from 'https://natski.netlify.app/api/encore/dependencies/dp.js';

export default class IconSystem {
	#observer;
	constructor() {
		this.#observer = new MutationObserver(this.#mutations.bind(this));
		this.setIcons(document.getElementsByTagName('IS'));
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
				IS_DATA.includes(icon.getAttribute('name'))
			) {
				icon.style.mask = `url(https://natski.netlify.app/api/encore/icon-system/dependencies/svg/${icon.getAttribute(
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
					icon.style.mask = `url(https://natski.netlify.app/api/encore/icon-system/dependencies/svg/alert.svg) no-repeat center`;
				};
				buffer.src = icon.getAttribute('src');
			} else {
				icon.style.mask = `url(https://natski.netlify.app/api/encore/icon-system/dependencies/svg/alert.svg) no-repeat center`;
			}
			icon.style.visibility = 'visible';
		}
	}

	#mutations() {
		this.setIcons(document.getElementsByTagName('IS'));
	}
}
