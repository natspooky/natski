/*!
 * ENCORE SLIDE SHOW CONTAINER
 * Author: NATSKI
 * MIT License
 */

import * as SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';
import * as DP from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_DP.mjs';
import GIS from 'https://natski.netlify.app/ENCORE/ENCORE_GIS.js';

var SSCobjs = [];

export default class SSC {
	constructor(element, settings) {
		this.SSC = element;
		this.pages = this.SSC.getElementsByClassName('banner-bg');
		this.settings = settings;
		this.index = 1;
		this.barWidth = 0;
		this.timer = SEC.setFallback(settings.timer, 5000);
		this.device = DP.userDevice();
		this.paused = false;
		this.hasVideos = false;
		this.videos = [];
		this.pauseMemory = false;
	}

	directPage(index) {
		this.index = index;
		this.#displayPage();
	}

	changePage(index) {
		this.index += index;
		this.#displayPage();
	}

	#displayPage() {
		let pageLen = this.pages.length;
		if (!this.paused) {
			this.#startTimers();
		}
		if (this.index < 1) {
			this.index = pageLen;
		} else if (this.index > pageLen) {
			this.index = 1;
		}
		for (let i = 0; i < pageLen; i++) {
			this.pages[i].classList.remove('currentSSC');
		}
		if (this.settings.thumbs) {
			this.#thumbMinifier();
			for (let i = 0; i < this.thumbs.length; i++) {
				this.thumbs[i].classList.remove('SSCselected');
			}
			this.thumbs[this.index - 1].classList.add('SSCselected');
		}
		this.pages[this.index - 1].classList.add('currentSSC');
	}

	#startTimers() {
		if (!this.paused) {
			Promise.resolve(clearInterval(this.timerFunc)).then(() => {
				this.timerFunc = setInterval(() => {
					this.changePage(1);
				}, this.timer);
			});
			if (this.settings.progressBar) {
				this.barWidth = 0;
				Promise.resolve(clearInterval(this.barTimerFunc)).then(() => {
					this.barTimerFunc = setInterval(() => {
						this.progressBar.style.transform = `scaleX(${(this.barWidth += 0.01)})`;
					}, this.timer / 100);
				});
			}
		}
	}

	#togglePlay() {
		if (this.paused) {
			this.SSC.setAttribute('paused', false);
		} else {
			this.SSC.setAttribute('paused', false);
		}
	}

	#pause() {
		this.paused = true;
		clearInterval(this.timerFunc);
		if (this.settings.progressBar) {
			clearInterval(this.barTimerFunc);
			this.progressBar.style.transform = 'scaleX(0)';
		}
		if (this.settings.pauseButton) {
			this.pauseButton.classList.add('SSCpaused');
		}
	}

	#play() {
		this.paused = false;
		this.#startTimers();
		if (this.settings.pauseButton) {
			this.pauseButton.classList.remove('SSCpaused');
		}
	}

	#checkPages() {
		return this.pages.length <= 1;
	}

	#createElements() {
		if (this.settings.thumbs) {
			(() => {
				let thumbcont = SEC.jsonElementify({
					tag: 'div',
					classes: ['SSCthumbs'],
				});
				for (let i = 0; i < this.pages.length; i++) {
					thumbcont.appendChild(
						SEC.jsonElementify({
							tag: 'div',
							classes: ['SSCthumb'],
							events: {
								click: {
									callback: this.directPage.bind(this),
									param: i + 1,
									options: {
										once: false,
										passive: true,
										capture: false,
									},
								},
							},
						}),
					);
				}
				this.SSC.appendChild(thumbcont);
				return Promise.resolve(
					this.SSC.getElementsByClassName('SSCthumb'),
				);
			})().then((thumbs) => {
				this.thumbs = thumbs;
			});
		}
		if (this.settings.progressBar) {
			(() => {
				this.SSC.appendChild(
					SEC.jsonElementify({
						tag: 'div',
						classes: ['SSCprogress'],
						children: [
							{
								tag: 'div',
								classes: ['SSCprogressBar'],
							},
						],
					}),
				);
				return Promise.resolve(
					this.SSC.getElementsByClassName('SSCprogressBar')[0],
				);
			})().then((progBar) => {
				this.progressBar = progBar;
			});
		}
		if (this.settings.pauseButton) {
			(() => {
				this.SSC.appendChild(
					SEC.jsonElementify({
						tag: 'button',
						classes: ['SSCpauseButton'],
						events: {
							click: {
								callback: this.#togglePlay.bind(this),
								options: {
									once: false,
									passive: true,
									capture: false,
								},
							},
						},
						attributes: { ariaLabel: 'Play / Pause' },
						children: [
							{
								tag: 'GIS',
								classes: ['SSCpause'],
								attributes: { name: 'pause' },
							},
							{
								tag: 'GIS',
								classes: ['SSCplay'],
								attributes: { name: 'play' },
							},
						],
					}),
				);
				return Promise.resolve(
					this.SSC.getElementsByClassName('SSCpauseButton')[0],
				);
			})().then((pauseBtn) => {
				this.pauseButton = pauseBtn;
			});
		}
		if (this.settings.sideButtons && !this.device) {
			SEC.appendChildren(
				this.SSC,
				SEC.jsonElementify([
					{
						tag: 'button',
						classes: ['SSCpageButton'],
						events: {
							click: {
								callback: this.changePage.bind(this),
								param: -1,
								options: {
									once: false,
									passive: true,
									capture: false,
								},
							},
						},
						attributes: {
							ariaLabel: 'Previous Page',
						},
						children: [
							{
								tag: 'GIS',
								attributes: { name: 'mini_arrow_left' },
							},
						],
					},
					{
						tag: 'button',
						classes: ['SSCpageButton'],
						events: {
							click: {
								callback: this.changePage.bind(this),
								param: 1,
								options: {
									once: false,
									passive: true,
									capture: false,
								},
							},
						},
						attributes: {
							ariaLabel: 'Next Page',
						},
						children: [
							{
								tag: 'GIS',
								attributes: { name: 'mini_arrow_right' },
							},
						],
					},
				]),
			);
		}
		return 'ready';
	}

	#checkMedia() {
		for (let i = 0; i < this.pages.length; i++) {
			let videos = this.pages[i].getElementsByTagName('video');
			if (videos) {
				this.hasVideos = true;
				let videoArray = Array.prototype.slice
					.call(videos)
					.map((video) => {
						video.pause();
						video.setAttribute('playsinline', '');
						video.setAttribute('muted', '');
						video.setAttribute('loop', '');
						video.setAttribute('preload', 'auto');
						return video;
					});
				this.videos.push(videoArray);
			} else {
				this.videos.push(0);
			}
			Array.prototype.slice
				.call(this.pages[i].getElementsByTagName('img'))
				.forEach((image) => {
					image.loading = 'eager';
					image.draggable = false;
				});
		}
	}
	//check bg for videos and images through any part of SSC

	//improve this
	#thumbMinifier() {
		if (
			this.thumbs[this.index - 1].parentNode.offsetWidth >
				this.SSC.offsetWidth / 2 &&
			!this.thumbOffset
		) {
			this.thumbOffset = Math.min(
				Math.floor(
					this.SSC.offsetWidth /
						2 /
						(this.thumbs[this.index - 1].offsetWidth + 30),
				),
				5,
			);
			for (let i = 0; i < this.thumbs.length; i++) {
				this.thumbs[i].classList.add('SSChidden');
			}
			for (
				let i = Math.min(
					Math.max(this.index - this.thumbOffset, 0),
					this.thumbs.length - this.thumbOffset * 2 + 1,
				);
				i <
				Math.max(
					Math.min(
						this.index - 1 + this.thumbOffset,
						this.thumbs.length,
					),
					this.thumbOffset * 2 - 1,
				);
				i++
			) {
				this.thumbs[i].classList.remove('SSChidden');
			}
		} else if (this.thumbOffset) {
			for (let i = 0; i < this.thumbs.length; i++) {
				this.thumbs[i].classList.add('SSChidden');
			}
			for (
				let i = Math.min(
					Math.max(this.index - this.thumbOffset, 0),
					this.thumbs.length - this.thumbOffset * 2 + 1,
				);
				i <
				Math.max(
					Math.min(
						this.index - 1 + this.thumbOffset,
						this.thumbs.length,
					),
					this.thumbOffset * 2 - 1,
				);
				i++
			) {
				this.thumbs[i].classList.remove('SSChidden');
			}
		}
	}

	#swipeSystem() {
		if (this.device) {
			this.SSC.addEventListener('touchstart', (event) => {
				this.touch = event.touches[0].clientX;
				this.pages[this.index - 1].style.transition = '0s';
			});
			this.SSC.addEventListener('touchmove', (event) => {
				let SSCtouchMove = event.changedTouches[0].clientX;
				this.pages[this.index - 1].style.opacity = `${
					1 - Math.min(Math.abs(this.touch - SSCtouchMove), 120) / 160
				}`;
				if (
					Math.abs(SSCtouchMove - this.touch) > 15 &&
					event.cancelable
				) {
					event.preventDefault();
					this.scrollLock = true;
				} else {
					this.scrollLock = false;
				}
			});
			this.SSC.addEventListener('touchend', (event) => {
				this.pages[this.index - 1].style.transition = null;
				let SSCtouchEnd = event.changedTouches[0].clientX,
					SSCwidth = this.SSC.offsetWidth / 4.5;
				if (this.scrollLock) {
					if (SSCtouchEnd - this.touch > SSCwidth) {
						this.changePage(-1);
					} else if (SSCtouchEnd - this.touch < -SSCwidth) {
						this.changePage(1);
					}
				}
				for (let i = 0; i < this.pages.length; i++) {
					this.pages[i].style.opacity = '1';
				}
			});
		}
	}

	#mutationObserver() {
		this.observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === 'attributes' &&
					mutation.target.hasAttribute('paused')
				) {
					if (mutation.target.getAttribute('paused') === 'true') {
						this.#pause();
					} else {
						this.#play();
					}
				}
			});
		});
		this.observer.observe(this.SSC, {
			attributes: true,
			subtree: false,
			childList: false,
			characterData: false,
			attributeFilter: ['paused'],
		});
	}

	#pageFocus() {
		window.addEventListener('focus', () => {
			//if(this.paused == false)
			if (this.pauseMemory) {
				this.pauseMemory = false;
			} else {
				this.SSC.setAttribute('paused', false);
			}
		});
		window.addEventListener('blur', () => {
			if (this.paused) {
				this.pauseMemory = true;
			} else {
				this.pauseMemory = false;
				this.SSC.setAttribute('paused', true);
			}
		});
	}

	init() {
		if (!this.#checkPages()) {
			this.#checkMedia();
			this.#swipeSystem();
			this.#pageFocus();
			this.#mutationObserver();
			Promise.resolve(this.#createElements()).then(() => {
				new GIS().applyMasks(this.SSC.getElementsByTagName('GIS'));
				this.directPage(1);
			});
		} else {
			this.pages[0].classList.add('currentSSC');
		}
	}
}
/*
class SSCcore {
	constructor(element, settings) {
		this.SSC = element;
		this.settings = settings;
	}
}

class SSC extends SSCcore {
	constructor(element, settings) {
		super(element, settings);
	}
}

class SSCU extends SSCcore {
	constructor(element, settings) {
		super(element, settings);
	}
}*/

function load() {
	let elements = document.getElementsByTagName('ssc');
	for (const element of elements) {
		SSCobjs.push(new SSC(element, SSC_settings).init());
	}
}

window.addEventListener('DOMContentLoaded', load);
