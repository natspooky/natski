/* -----------------------------------------------
/* Author : NATSKI - natski.dev
/* MIT license : https://opensource.org/license/MIT
/* GitHub : https://github.com/natspooky/encore
/* How to use? : Check the GitHub README or visit https://natski.dev/apis/encore/icon-system
/* ----------------------------------------------- */

import { IS_DATA } from './dependencies/IS_DATA.js';
import { fileExtention } from '../../dependencies/file-utils/fu.min.js';

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
				icon.style.mask = `url(https://natski.vercel.app/apis/encore/icon-system/dependencies/svg/${icon.getAttribute(
					'name',
				)}.svg) no-repeat center`;
			} else if (icon.hasAttribute('src')) {
				let buffer = new Image();
				buffer.onload = () => {
					if (fileExtention(icon.getAttribute('src')) === 'svg') {
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
				buffer.onerror = () => {
					icon.style.mask = `url(https://natski.vercel.app/apis/encore/icon-system/dependencies/svg/alert.svg) no-repeat center`;
				};
				buffer.src = icon.getAttribute('src');
			} else {
				icon.style.mask = `url(https://natski.vercel.app/apis/encore/icon-system/dependencies/svg/alert.svg) no-repeat center`;
			}
			icon.style.visibility = 'visible';
		}
	}

	#mutations() {
		this.setIcons(document.getElementsByTagName('IS'));
	}
}
