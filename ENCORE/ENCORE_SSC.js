/*!
 * ENCORE SLIDE SHOW CONTAINER
 * Author: NATSKI
 * MIT License
 */

import * as ENCORE_SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';
import * as ENCORE_DP from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_nav.mjs';

var SSCobjs = [];
const SSCicons = {
	leftArrow:
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M16.05,354l302.18,269.96c30.98,27.68,80.12,5.69,80.12-35.86V48.18c0-41.55-49.14-63.54-80.12-35.86L16.05,282.28c-21.4,19.12-21.4,52.6,0,71.72Z"/></svg>',
	rightArrow:
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M382.3,282.28L80.12,12.32C49.14-15.36,0,6.63,0,48.18V588.11c0,41.55,49.14,63.54,80.12,35.86L382.3,354c21.4-19.12,21.4-52.6,0-71.72Z"/></svg>',
	play: '<svg class="SSCplay" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756.99 850.4"><path d="M718.32,358.21c51.56,29.77,51.56,104.2,0,133.97l-301.15,173.87L116.02,839.92c-51.56,29.77-116.02-7.44-116.02-66.98V77.46C0,17.92,64.46-19.29,116.02,10.48L417.17,184.35l301.15,173.87h0Z"/></svg>',
	pause: '<svg class="SSCpause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.4 850.4"><rect x="46.77" y=".17" width="239.38" height="850.07" rx="90.18" ry="90.18"/><rect x="564.25" y=".17" width="239.38" height="850.07" rx="93.7" ry="93.7"/></svg>',
};

function SSCstyleCall(url, settings, load) {
	let style = document.createElement('link');
	style.rel = 'stylesheet';
	style.type = 'text/css';
	style.href = url;
	document.getElementsByTagName('head')[0].appendChild(style);
	let linkloaded = document.createElement('img');
	linkloaded.onerror = function () {
		if (load) load(settings);
	};
	linkloaded.src = url;
}

function reloadSSC(settings) {
	let sscVersions = document.getElementsByTagName('ssc');
	for (let i = 0; i < SSCobjs.length; i++) {
		SSCobjs[i].pause();
	}
	SSCobjs = [];
	for (let i = 0; i < sscVersions.length; i++) {
		if (sscVersions[i].getElementsByClassName('banner-bg').length > 1) {
			if (sscVersions[i].getElementsByClassName('SSCthumbs')[0]) {
				sscVersions[i].getElementsByClassName('SSCthumbs')[0].remove();
			}
			if (sscVersions[i].getElementsByClassName('SSCprogress')[0]) {
				sscVersions[i]
					.getElementsByClassName('SSCprogress')[0]
					.remove();
			}
			if (sscVersions[i].getElementsByClassName('SSCpauseButton')[0]) {
				sscVersions[i]
					.getElementsByClassName('SSCpauseButton')[0]
					.remove();
			}
			if (sscVersions[i].getElementsByClassName('SSCpageButton')[0]) {
				for (let y = 0; y < 2; y++) {
					sscVersions[i]
						.getElementsByClassName('SSCpageButton')
						[1 - y].remove();
				}
			}
		}
	}
	loadSSC(settings);
}

function pauseSSC(index) {
	if (SSCobjs[index].checkPages()) return;
	SSCobjs[index].pause();
}

function playSSC(index) {
	if (SSCobjs[index].checkPages()) return;
	SSCobjs[index].play();
}

function pauseAllSSC() {
	for (let i = 0; i < SSCobjs.length; i++) {
		pauseSSC(i);
	}
}

function playAllSSC() {
	for (let i = 0; i < SSCobjs.length; i++) {
		playSSC(i);
	}
}

function nextSlideSSC(index) {
	if (SSCobjs[index].checkPages()) return;
	SSCobjs[index].changePage(1);
}

function previousSlideSSC(index) {
	if (SSCobjs[index].checkPages()) return;
	SSCobjs[index].changePage(-1);
}

class SSC {
	constructor(element, settings) {
		this.SSC = element;
		this.pages = this.SSC.getElementsByClassName('banner-bg');
		this.settings = settings;
		this.index = 1;
		this.barWidth = 0;
		this.timer = Math.max(this.settings.timer, 5000);
		this.device = ENCORE_DP.userDevice();
		this.paused = false;
		this.hasVideos = false;
		this.videos = [];
		this.pauseMemory = false;
	}

	directPage(index) {
		this.index = index;
		this.displayPage();
	}

	changePage(index) {
		this.index += index;
		this.displayPage();
	}

	displayPage() {
		let pageLen = this.pages.length;
		if (!this.paused) {
			this.startTimers();
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
			this.thumbMinifier();
			for (let i = 0; i < this.thumbs.length; i++) {
				this.thumbs[i].classList.remove('SSCselected');
			}
			this.thumbs[this.index - 1].classList.add('SSCselected');
		}
		this.pages[this.index - 1].classList.add('currentSSC');
	}

	startTimers() {
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

	togglePlay() {
		if (this.paused) {
			this.play();
		} else {
			this.pause();
		}
	}

	pause() {
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

	play() {
		this.paused = false;
		this.startTimers();
		if (this.settings.pauseButton) {
			this.pauseButton.classList.remove('SSCpaused');
		}
	}

	checkPages() {
		return this.pages.length <= 1;
	}

	createElements() {
		if (this.settings.thumbs) {
			(() => {
				let thumbcont = ENCORE_SEC.jsonElementify({
					type: 'div',
					classes: ['SSCthumbs'],
				});
				for (let i = 0; i < this.pages.length; i++) {
					thumbcont.appendChild(
						ENCORE_SEC.jsonElementify({
							type: 'div',
							classes: ['SSCthumb'],
							events: {
								click: {
									func: this.directPage.bind(this),
									var: i + 1,
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
					ENCORE_SEC.jsonElementify({
						type: 'div',
						classes: ['SSCprogress'],
						children: [
							{
								type: 'div',
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
					ENCORE_SEC.jsonElementify({
						type: 'button',
						classes: ['SSCpauseButton'],
						events: {
							click: {
								func: this.togglePlay.bind(this),
							},
						},
						attributes: { ariaLabel: 'Play / Pause' },
						innerHTML: `${SSCicons['pause']} ${SSCicons['play']}`,
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
			ENCORE_SEC.appendChildren(this.SSC, [
				ENCORE_SEC.jsonElementify({
					type: 'button',
					classes: ['SSCpageButton'],
					events: {
						click: {
							func: this.changePage.bind(this),
							var: -1,
						},
					},
					attributes: {
						ariaLabel: 'Previous Page',
					},
					innerHTML: SSCicons['leftArrow'],
				}),
				ENCORE_SEC.jsonElementify({
					type: 'button',
					classes: ['SSCpageButton'],
					events: {
						click: {
							func: this.changePage.bind(this),
							var: 1,
						},
					},
					attributes: {
						ariaLabel: 'Next Page',
					},
					innerHTML: SSCicons['rightArrow'],
				}),
			]);
		}
		return Promise.resolve(0);
	}

	checkMedia() {
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
	thumbMinifier() {
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

	swipeSystem() {
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

	pageFocus() {
		window.addEventListener('focus', () => {
			//if(this.paused == false)
			if (this.pauseMemory) {
				this.pauseMemory = false;
			} else {
				this.play();
			}
		});
		window.addEventListener('blur', () => {
			if (this.paused) {
				this.pauseMemory = true;
			} else {
				this.pauseMemory = false;
				this.pause();
			}
		});
	}

	init() {
		if (!this.checkPages()) {
			this.checkMedia();
			this.swipeSystem();
			this.pageFocus();
			this.createElements().then(() => {
				this.directPage(1);
			});
		} else {
			this.pages[0].classList.add('currentSSC');
		}
	}
}

function loadSSC(settings) {
	let count = document.getElementsByTagName('ssc');
	for (let i = 0; i < count.length; i++) {
		SSCobjs.push(new SSC(count[i], settings));
	}
	for (let i = 0; i < count.length; i++) {
		SSCobjs[i].init();
	}
}

function checkLoadedSSC() {
	return document.readyState === 'complete';
}

if (checkLoadedSSC()) {
	SSCstyleCall(
		`https://natski.netlify.app/lib/ENCORE_DB/SSC/${SSC_settings.style}SSC.css`,
		SSC_settings,
		loadSSC,
	);
}

window.addEventListener('load', function () {
	SSCstyleCall(
		`https://natski.netlify.app/lib/ENCORE_DB/SSC/${SSC_settings.style}SSC.css`,
		SSC_settings,
		loadSSC,
	);
});
