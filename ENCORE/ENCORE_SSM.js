/*!
 * ENCORE SIMPLE SETTINGS MENU
 * Author: NATSKI
 * MIT License
 */

import * as SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';
import * as DP from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_DP.mjs';
import GIS from 'https://natski.netlify.app/ENCORE/ENCORE_GIS.js';

class SSM {
	#SSM;
	#GIS;
	#observers = {};
	#data = {
		width: 0,
		height: 0,
		observerHeight: 0,
	};
	constructor(element, settings) {
		this.#SSM = SEC.jsonElementify(element);
		this.#GIS = new GIS.observe(this.#SSM);

		this.#observers.intersect = new IntersectionObserver(this.#intersect, {
			root: document.querySelector('.SSM-item-container'),
			rootMargin: '0px',
			threshold: this.#thresholdList(),
		});
		for (const element of this.#SSM.getElementsByClassName('SSM-panel')) {
			this.#observers.intersect.observe(element);
		}

		this.#observers.resize = new ResizeObserver(this.#resize);
		this.#observers.resize.observe(this.#SSM);

		this.#resize();
	}

	//allow for settings toggling / changing with the use of hotkeys

	#thresholdList() {
		let thresholds = [],
			steps = 10;
		for (let i = 1; i <= steps; i++) {
			let ratio = i / steps;
			thresholds.push(ratio);
		}
		thresholds.push(0);
		return thresholds;
	}

	#resize() {
		for (const slider of this.#SSM.getElementsByClassName('SSM-slider')) {
			this.#sliderBars(slider);
		}
	}

	#dropdownToggle() {}

	#dropdownClose() {}

	#dropdownSelect() {}

	#sliderBars(event) {
		const element = event.target ? event.target : event;
		const min = parseInt(element.min);
		const max = parseInt(element.max);
		const value = parseInt(element.value);

		element.style.setProperty(
			'--value',
			`${
				((value + Math.abs(min)) / Math.abs(max - min)) *
				element.offsetWidth
			}px`,
		);
	}

	#intersect(entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				if (
					entry.intersectionRect.height >= this.#data.observerHeight
				) {
					entry.target.classList.add('SSM-visible');
				} else {
					entry.target.classList.remove('SSM-visible');
				}
			}
		});
	}

	get SSM() {
		return this.#SSM;
	}

	open() {
		this.#SSM.classList.add('SSM-visible');
	}

	close() {
		this.#SSM.classList.remove('SSM-visible');
	}
}
