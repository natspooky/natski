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
	}

	init() {
		if (!this.isMobileTouch) {
			for (const button of this.buttons) {
				button.addEventListener(
					'mouseenter',
					this.mouseEnter.bind(this),
				);
				button.addEventListener('mousemove', this.mouseMove.bind(this));
				button.addEventListener(
					'mouseleave',
					this.mouseLeave.bind(this),
				);
			}
		}
	}

	mouseEnter(ev) {
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
	}

	mouseMove(ev) {
		this.element.style.left = `${Math.min(
			this.element.offsetWidth + 10,
			ev.clientX,
		)}px`;
		this.element.style.top = `${Math.min(
			this.element.offsetHeight + 10,
			ev.clientY,
		)}px`;
	}

	mouseLeave(ev) {
		this.element.classList.remove('visible');
		setTimeout(() => {
			this.element.remove();
		}, 210);
	}

	createElements(data) {
		SEC.jsonElementify({
			tag: 'div',
			classes: ['BIM-container'],
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
