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
		this.BIM = createElements();
		document.body.appendChild(this.BIM);
	}

	mouseEnter(ev) {
		let data = {
			icon: ev.target.getAttribute('BIM-icon'),
			title: ev.target.getAttribute('BIM-title'),
			text: ev.target.getAttribute('BIM-text'),
		};

		this.BIM.children[0].children[0].setAttribute('name', data.icon);
		this.BIM.children[0].children[2].innerHTML = data.title;
		this.BIM.children[1].children[0].innerHTML = data.text;
		setTimeout(() => {
			this.BIM.classList.add('visible');
		}, 200);
	}

	mouseMove(ev) {
		this.BIM.style.top = `${ev.clientY}px`;
		this.BIM.style.left = `${ev.clientX}px`;
	}

	mouseLeave(ev) {
		this.BIM.classList.remove('visible');
	}

	createElements() {
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
								name: 'point',
							},
						},
						{
							tag: 'span',
						},
						{
							tag: 'h1',
						},
					],
				},
				{
					tag: 'div',
					classes: ['BIM-info'],
					children: [
						{
							tag: 'p',
						},
					],
				},
			],
		});
	}
}
