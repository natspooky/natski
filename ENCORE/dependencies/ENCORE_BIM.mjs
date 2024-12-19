/*!
 * ENCORE BUTTON INFO MANAGER
 * Author: NATSKI
 * MIT License
 */

import * as SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';
import * as DP from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_DP.mjs';

export class BIM {
	constructor() {
		this.buttons = document.getElementsByClassName('BIM');
		this.isMobileTouch = DP.userDevice();
		this.timeout;
	}

	init() {
		if (!this.isMobileTouch) {
			for (const button of this.buttons) {
				button.addEventListener(
					'mouseenter',
					this.mouseEnter.bind(this),
				);
				button.addEventListener(
					'mouseleave',
					this.mouseLeave.bind(this),
				);
			}
		}
	}

	mouseEnter(ev) {
		this.timeout = setTimeout(() => {
			new Promise((resolve) => {
				let data = ev.target;
				let element = this.createElements({
					icon: data.getAttribute('BIM-icon'),
					title: data.getAttribute('BIM-title'),
					info: data.getAttribute('BIM-info'),
				});
				document.body.appendChild(element);
				setTimeout(() => {
					resolve(element);
				}, 10);
			}).then((element) => {
				this.element = element;
				this.element.classList.add('visible');
			});
		}, 200);
	}

	mouseLeave(ev) {
		clearTimeout(this.timeout);
		if (this.element) {
			this.element.classList.remove('visible');
			this.element.remove();
			this.element = null;
		}
	}

	createElements(data) {
		return SEC.jsonElementify({
			tag: 'div',
			classes: ['BIM-popup'],
			children: [
				{
					tag: 'div',
					classes: ['BIM-header'],
					children: [
						{
							tag: 'GIS',
							attributes: {
								name: data.icon,
							},
						},
						{
							tag: 'span',
						},
						{
							tag: 'h1',
							innerHTML: data.title,
						},
					],
				},
				{
					tag: 'div',
					classes: ['BIM-info'],
					children: [
						{
							tag: 'p',
							innerHTML: data.info,
						},
					],
				},
			],
		});
	}
}
