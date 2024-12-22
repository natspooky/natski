/*!
 * ENCORE BUTTON INFO MANAGER
 * Author: NATSKI
 * MIT License
 */

import * as SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';
import * as DP from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_DP.mjs';

export default class BIM {
	constructor(className) {
		this.isMobileTouch = DP.userDevice();
		this.BIM = this.createElements();
		document.body.appendChild(this.BIM);

		for (const button of document.getElementsByClassName(className)) {
			button.addEventListener('mouseenter', this.mouseEnter.bind(this));
			button.addEventListener('mousemove', this.mouseMove.bind(this));
			button.addEventListener('mouseleave', this.mouseLeave.bind(this));
		}
	}

	mouseEnter(ev) {
		let data = {
			icon: ev.target.getAttribute('BIM-icon'),
			title: ev.target.getAttribute('BIM-title'),
			text: ev.target.getAttribute('BIM-text'),
		};

		this.timer = setTimeout(() => {
			this.BIM.children[0].children[0].setAttribute('name', data.icon);
			this.BIM.children[0].children[2].innerHTML = data.title;
			this.BIM.children[1].children[0].innerHTML = data.text;
			this.BIM.classList.add('visible');
			this.moveable = true;
			this.mouseMove(ev, true);
		}, 400);
	}

	mouseMove(ev, ovr) {
		if (this.moveable || ovr) {
			this.BIM.style.top = `${Math.max(
				ev.clientY,
				60 + this.BIM.offsetHeight,
			)}px`;
			this.BIM.style.left = `${Math.min(
				Math.max(ev.clientX, 20 + this.BIM.offsetWidth / 2),
				window.innerWidth - this.BIM.offsetWidth / 2 - 20,
			)}px`;
		}
	}

	mouseLeave(ev) {
		clearTimeout(this.timer);
		this.moveable = false;
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
