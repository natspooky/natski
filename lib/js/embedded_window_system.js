/*!
 * Embedded Window System
 * Author: NATSKI
 * MIT License
 */

import { default as dyn } from 'https://natski.netlify.app/lib/js/dynamic_header.js';
import { default as IS } from 'https://natski.netlify.app/api/encore/icon-system/is.js';

if (!window.location.href.includes('index')) {
	window.open('index.html#', '_self');
}

class FWS {
	constructor() {
		this.pageTrack = [];
		this.dynamic = new dyn(document.getElementById('dynamic'));
		this.iframeContainer = document.getElementById('embedded-frame');
		this.iframe = document.getElementById('iframe');
	}

	init() {
		this.setButtons();
		new IS().observe(document);
		this.dynamic.show();
		this.dynamic.border();

		if (window.location.hash.length > 0) {
			this.changeFrame(
				window.location.hash.slice(1, window.location.hash.length),
			);
		}
		window.addEventListener('popstate', () => {
			if (window.location.hash.length > 0) {
				this.changeFrame(
					window.location.hash.slice(1, window.location.hash.length),
				);
			} else {
				this.closeFrame();
			}
		});

		let screen = document.getElementById('load');
		setTimeout(() => {
			screen.classList.add('loaded');
		}, 10);
		setTimeout(() => {
			screen.remove();
		}, 800);
		return this;
	}

	setButtons() {
		let buttons = document.getElementsByClassName('linker');
		for (const button of buttons) {
			if (button.hasAttribute('name')) {
				switch (button.getAttribute('name')) {
					case 'HOME':
						button.addEventListener('click', () => {
							this.changeHash('');
						});
						break;
					case 'BACK':
						button.addEventListener('click', () => {
							this.undoSubPage();
						});
						break;
					default:
						button.addEventListener('click', () => {
							this.changeHash(button.getAttribute('name'));
							this.resetBack();
						});
						break;
				}
			}
		}
	}

	reGenerateIframe(URL) {
		this.iframe.classList.add('closed');
		setTimeout(() => {
			this.iframe.remove();
			this.iframe = document.createElement('iframe');
			this.iframe.id = 'iframe';
			this.iframe.title = URL;
			this.iframeContainer.appendChild(this.iframe);
			this.iframe.addEventListener(
				'load',
				this.removePageLoader.bind(this),
			);
			this.iframe.src = URL;
		}, 305);
	}

	changeFrame(URL) {
		if (!this.dynamic.getWidget('loader')) {
			this.addPageLoader();
		}

		this.bodyScroll(false);
		this.iframe.focus();
		let formatted = this.formatURL(URL);
		this.changeTitle(
			formatted.page.split('/')[formatted.page.split('/').length - 1],
		);
		this.reGenerateIframe(`${formatted.page}.html#${formatted.hash}`);

		this.checkPriorVisit();
		this.iframeContainer.classList.add('active');
		if (!this.dynamic.getWidget('closeButton')) {
			this.addClose();
		}
		//document.getElementsByTagName('sscu')[0].setAttribute('paused', true);
	}

	formatURL(URL) {
		let formatted = { page: URL, hash: '' };
		if (formatted.page.includes('%20')) {
			formatted.page = formatted.page.replaceAll('%20', '_');
		}
		if (formatted.page.includes('.html')) {
			formatted.page = formatted.page.replace('.html', '');
		}
		if (formatted.page.includes('#')) {
			let index = formatted.page.indexOf('#');
			formatted.hash = formatted.page.slice(
				index + 1,
				formatted.page.length,
			);
			formatted.page = formatted.page.slice(0, index);
		}
		return formatted;
	}

	closeFrame() {
		this.removePageLoader();
		this.iframeContainer.classList.remove('active');
		this.removeClose();
		this.bodyScroll(true);
		this.changeTitle('Home');
		this.reGenerateIframe('');
		this.resetBack();
	}

	checkPriorVisit() {
		let name = window.location.hash.slice(1, window.location.hash.length);
		name = name.toLowerCase();
		name = name.replaceAll('_', ' ');
		name = name.replaceAll('%20', ' ');

		if (this.pageTrack.includes(name)) {
			//console.log('contains function called')
			this.pageTrack.length = this.pageTrack.indexOf(name);
			//console.log('inludes', this.pageTrack, this.pageTrack.length)
		}
		if (
			this.pageTrack.length == 0 &&
			this.dynamic.getWidget('backButton')
		) {
			this.removeBack();
		}
	}

	undoSubPage() {
		window.location.hash = this.pageTrack.pop();
		console.log(this.pageTrack);
	}

	incrementSubPage() {
		let name = window.location.hash.slice(1, window.location.hash.length);
		name = name.toLowerCase();
		name = name.replaceAll('_', ' ');
		name = name.replaceAll('%20', ' ');
		this.pageTrack.push(name);
		console.log(this.pageTrack);
		if (!this.dynamic.getWidget('backButton')) {
			this.addBack();
		}
	}

	resetBack() {
		this.pageTrack = [];
		if (this.dynamic.getWidget('backButton')) {
			this.removeBack();
		}
	}

	changeTitle(text) {
		if (text.includes('_')) {
			text = text.replaceAll('_', ' ');
		}
		if (text.includes('-')) {
			text = text.replaceAll('-', ' ');
		}
		document.getElementsByTagName('title')[0].innerHTML = text;
		this.dynamic.setTitleWidth(text);
	}

	removePageLoader() {
		if (this.dynamic.getWidget('loader')) {
			this.dynamic.getWidget('loader').classList.remove('fadein');
			setTimeout(() => {
				this.dynamic.right();
				this.dynamic.removeWidget('loader');
			}, 300);
		}
	}

	addPageLoader() {
		this.dynamic.setWidget(
			{
				tag: 'section',
				classes: ['widget', 'fadeout'],
				attributes: {
					style: 'right: -16px',
				},
				children: [
					{
						tag: 'span',
						classes: ['loader'],
					},
				],
			},
			'loader',
		);

		this.dynamic.right(58);
		setTimeout(() => {
			this.dynamic.getWidget('loader').classList.add('fadein');
		}, 200);
	}

	removeClose() {
		this.dynamic.getWidget('closeButton').classList.remove('fadein');
		setTimeout(() => {
			this.dynamic.left();
			this.dynamic.removeWidget('closeButton');
		}, 300);
	}

	addClose() {
		this.dynamic.setWidget(
			{
				tag: 'section',
				classes: ['widget', 'fadeout'],
				attributes: {
					style: 'left: -18px',
				},
				children: [
					{
						tag: 'button',
						classes: ['pageButtons'],
						events: {
							click: {
								func: this.changeHash.bind(this),
								var: '',
								options: {
									once: true,
									passive: true,
									capture: false,
								},
							},
						},
						children: [
							{
								tag: 'IS',
								attributes: {
									name: 'circle_cross',
								},
							},
						],
					},
				],
			},
			'closeButton',
		);
		this.dynamic.left(58);

		setTimeout(() => {
			this.dynamic.getWidget('closeButton').classList.add('fadein');
		}, 200);
	}

	addBack() {
		this.dynamic.setWidget(
			{
				tag: 'section',
				classes: ['widget', 'fadeout'],
				attributes: {
					style: 'left: -55px',
				},
				children: [
					{
						tag: 'button',
						classes: ['pageButtons'],
						events: {
							click: {
								func: this.undoSubPage.bind(this),
								options: {
									once: true,
									passive: true,
									capture: false,
								},
							},
						},
						children: [
							{
								tag: 'IS',
								attributes: { name: 'circle_arrow_left' },
							},
						],
					},
				],
			},
			'backButton',
		);
		this.dynamic.left(95);
		setTimeout(() => {
			this.dynamic.getWidget('backButton').classList.add('fadein');
		}, 200);
	}

	removeBack() {
		this.dynamic.getWidget('backButton').classList.remove('fadein');
		setTimeout(() => {
			this.dynamic.left(58);
			this.dynamic.removeWidget('backButton');
		}, 200);
	}

	changeHash(hash) {
		window.location.hash = hash;
	}

	bodyScroll(boolean) {
		if (boolean) {
			document.body.style.overflow = 'unset';
			document.body.ontouchmove = function () {
				return true;
			};
		} else {
			document.body.style.overflow = 'hidden';
			document.body.ontouchmove = function (event) {
				event.preventDefault();
			};
		}
	}
}

window.addEventListener('DOMContentLoaded', function () {
	window.fram = new FWS().init();
});
