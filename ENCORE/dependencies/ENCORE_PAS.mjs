/*!
 * ENCORE PORTABLE ALERT SYSTEM
 * Author: NATSKI
 * MIT License
 */

import * as ENCORE_SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';

export class PAS {
	constructor() {
		this.alerts = [];
		this.timer = true;
	}

	add(data) {
		if (!this.alerts.length > 0)
			this.alerts.push(() => {
				new Promise((resolve) => {
					console.log('prerun');
					let y = this.createElements(data);
					document.body.appendChild(y);
					resolve(y);
					console.log('run');
				}).then((element) => {
					console.log('postrun');
					element.classList.add('open');
					if (!data.pmt) {
						this.createTimer(data.dur, element);
					}
				});
			});
		this.loadAlert();
	}

	createTimer(duration, element) {
		this.timer = false;
		setTimeout(() => {
			element.classList.remove('open');
			setTimeout(() => {
				element.remove();
				this.timer = true;
				this.loadAlert();
			}, 501);
		}, duration);
	}

	loadAlert() {
		if (this.alerts.length > 0 && this.timer) {
			let x = this.alerts.shift();
			console.log(x);
			x();
		}
	}

	createElements(data) {
		return ENCORE_SEC.jsonElementify({
			tag: 'div',
			classes: ['PAS-popup'],
			attributes: {
				style: data.col ? `background-color: ${data.col}` : null,
			},
			children: [
				{
					tag: 'div',
					children: [
						{
							tag: 'GIS',
							attributes: { name: data.icn },
						},
						{
							tag: 'span',
						},
						{
							tag: 'p',
							innerHTML: data.txt,
						},
					],
				},
			],
		});
	}
}
