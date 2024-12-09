/*!
 * ENCORE SLIDE SHOW CONTAINER ULT
 * Author: NATSKI
 * MIT License
 */

import * as ENCORE_SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';
import * as ENCORE_DP from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_nav.mjs';

var SSCUobjs = [];
const SSCUicons = {
	leftArrow:
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M16.05,354l302.18,269.96c30.98,27.68,80.12,5.69,80.12-35.86V48.18c0-41.55-49.14-63.54-80.12-35.86L16.05,282.28c-21.4,19.12-21.4,52.6,0,71.72Z"/></svg>',
	rightArrow:
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.35 636.29"><path d="M382.3,282.28L80.12,12.32C49.14-15.36,0,6.63,0,48.18V588.11c0,41.55,49.14,63.54,80.12,35.86L382.3,354c21.4-19.12,21.4-52.6,0-71.72Z"/></svg>',
	play: '<svg class="SSCUplay" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756.99 850.4"><path d="M718.32,358.21c51.56,29.77,51.56,104.2,0,133.97l-301.15,173.87L116.02,839.92c-51.56,29.77-116.02-7.44-116.02-66.98V77.46C0,17.92,64.46-19.29,116.02,10.48L417.17,184.35l301.15,173.87h0Z"/></svg>',
	pause: '<svg class="SSCUpause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850.4 850.4"><rect x="46.77" y=".17" width="239.38" height="850.07" rx="90.18" ry="90.18"/><rect x="564.25" y=".17" width="239.38" height="850.07" rx="93.7" ry="93.7"/></svg>',
};

function reloadSSCU(settings) {
	let sscuVersions = document.getElementsByTagName('sscu');
	for (let i = 0; i < SSCUobjs.length; i++) {
		SSCUobjs[i].pause();
	}
	SSCUobjs = [];
	for (let i = 0; i < sscuVersions.length; i++) {
		if (sscuVersions[i].getElementsByClassName('banner-bg-u').length > 1) {
			if (sscuVersions[i].getElementsByClassName('SSCUthumbs')[0]) {
				sscuVersions[i]
					.getElementsByClassName('SSCUthumbs')[0]
					.remove();
			}
			if (sscuVersions[i].getElementsByClassName('SSCUpauseButton')[0]) {
				sscuVersions[i]
					.getElementsByClassName('SSCUpauseButton')[0]
					.remove();
			}
			if (sscuVersions[i].getElementsByClassName('SSCUpageButton')[0]) {
				for (let y = 0; y < 2; y++) {
					sscuVersions[i]
						.getElementsByClassName('SSCUpageButton')
						[1 - y].remove();
				}
			}
		}
	}
	loadSSCU(settings);
}

class SSCU {
	constructor(element, settings) {
		this.SSCU = element;
		this.pages = this.SSCU.getElementsByClassName('banner-bg-u');
		this.settings = settings;
		this.index = 1;
		this.prevIndex = 0;
		this.barWidth = 0;
		this.timer = Math.max(this.settings.timer, 5000);
		this.swapTimer = Math.min(
			Math.max(this.settings.slideSpeed, 300),
			1000,
		);
		this.device = ENCORE_DP.userDevice();
		this.hasVideos = false;
		this.videos = [];
		this.paused = false;
		this.pauseMemory = false;
	}

	directPage(index) {
		if (this.swapTimerFunc) return;
		this.prevIndex = this.index;
		this.index = index;
		this.displayPage();
	}

	changePage(index) {
		if (index == 0 || this.swapTimerFunc) return;
		this.prevIndex = this.index;
		this.index += index;
		this.displayPage();
	}

	checkPages() {
		return this.pages.length <= 1;
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
		if (this.settings.thumbs) {
			clearInterval(this.barTimerFunc);
			this.thumbs[this.index - 1].children[0].style.transform =
				'scaleX(0)';
		}
		if (this.settings.pauseButton) {
			this.pauseButton.classList.add('SSCUpaused');
		}
		if (this.hasVideos && this.videos[this.index - 1] != 0) {
			this.videos[this.index - 1].forEach((video) => {
				video.pause();
			});
		}
	}

	play() {
		this.paused = false;
		this.startTimers();
		if (this.settings.pauseButton) {
			this.pauseButton.classList.remove('SSCUpaused');
		}
		if (this.hasVideos && this.videos[this.index - 1] != 0) {
			this.videos[this.index - 1].forEach((video) => {
				video.currentTime = 0;
				video.play();
			});
		}
	}

	startTimers() {
		if (!this.paused) {
			Promise.resolve(clearInterval(this.timerFunc)).then(() => {
				this.timerFunc = setInterval(() => {
					this.changePage(1);
				}, this.timer);
			});
			if (this.settings.thumbs) {
				this.barWidth = 0;
				this.thumbs[this.prevIndex - 1].children[0].style.transform =
					'scaleX(0)';
				Promise.resolve(clearInterval(this.barTimerFunc)).then(() => {
					this.barTimerFunc = setInterval(() => {
						this.thumbs[
							this.index - 1
						].children[0].style.transform = `scaleX(${(this.barWidth += 0.01)})`;
					}, this.timer / 100);
				});
			}
		}
	}

	thumbMinifier() {
		if (
			this.thumbs[this.index - 1].parentNode.offsetWidth >
				this.SSCU.offsetWidth / 2 &&
			!this.thumbOffset
		) {
			this.thumbOffset = Math.min(
				Math.floor(
					this.SSCU.offsetWidth /
						2 /
						(this.thumbs[this.index - 1].offsetWidth + 30),
				),
				5,
			);
			for (let i = 0; i < this.thumbs.length; i++) {
				this.thumbs[i].classList.add('SSCUhidden');
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
				//console.log( i, this.thumbs.length)
				this.thumbs[i].classList.remove('SSCUhidden');
			}
		} else if (this.thumbOffset) {
			for (let i = 0; i < this.thumbs.length; i++) {
				this.thumbs[i].classList.add('SSCUhidden');
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
				this.thumbs[i].classList.remove('SSCUhidden');
			}
		}
	}

	displayPage() {
		if (!this.paused) {
			this.startTimers();
		}
		if (this.index < 1) {
			this.index = this.pages.length;
		} else if (this.index > this.pages.length) {
			this.index = 1;
		}
		if (this.settings.thumbs) {
			this.thumbMinifier();
			for (let i = 0; i < this.thumbs.length; i++) {
				this.thumbs[i].classList.remove('SSCUselected');
			}
			this.thumbs[this.index - 1].classList.add('SSCUselected');
		}
		if (this.hasVideos && !this.paused) {
			if (this.videos[this.prevIndex - 1] != 0) {
				this.videos[this.prevIndex - 1].forEach((video) => {
					video.pause();
				});
			}
			if (this.videos[this.index - 1] != 0) {
				this.videos[this.index - 1].forEach((video) => {
					video.currentTime = 0;
					video.play();
				});
			}
		}

		this.setPositions();
		/*
        for(let i = 0; i < pageLen; i++) {
            if(!this.pages[i].classList.contains('SSCUprior') && !this.pages[i].classList.contains('SSCUfollowing')) {
                indexStorage = i
                break;
            }
        }*/
		/*
        (() => {
            this.pages[indexStorage].style.transform = 'translateX(0%)'

            if(this.index > this.prevIndex){
                this.pages[this.index-1].classList = `translateX(${reversed ? '-' : ''}100%)`
            }else {
                this.pages[this.index-1].style.transform = `translateX(${reversed ? '' : '-'}100%)`
            }

            this.pages[this.index-1].style.display = 'flex'

            return Promise.resolve(0)

        })().then(() => {
            setTimeout(() => {
                
                this.pages[this.index-1].style.transform = 'translateX(0%)'
                if(this.index > this.prevIndex) {
                    this.pages[indexStorage].style.transform = `translateX(${reversed ? '' : '-'}100%)`
                }else {
                    this.pages[indexStorage].style.transform = `translateX(${reversed ? '-' : ''}100%)`
                }
                this.swapTimerFunc = setTimeout(() => {
                    this.pages[indexStorage].style.display = 'none'
                    this.swapTimerFunc = undefined
                }, this.swapTimer)
            },20);
        })


        this.pages[this.index-1].style.display = 'flex'*/
	}

	setPositions() {
		for (let i = 0; i < this.pages.length; i++) {
			if (i < this.index - 1) {
				this.pages[i].classList.add('SSCUprior');
				this.pages[i].classList.remove('SSCUfollowing');
			} else if (i > this.index - 1) {
				this.pages[i].classList.remove('SSCUprior');
				this.pages[i].classList.add('SSCUfollowing');
			} else {
				this.pages[i].classList.remove('SSCUprior');
				this.pages[i].classList.remove('SSCUfollowing');
			}
		}
		this.swapTimerFunc = setTimeout(() => {
			this.swapTimerFunc = undefined;
		}, this.swapTimer);
	}

	//make this use extra classes E.G. .prior.looping

	createElements() {
		for (let i = 0; i < this.pages.length; i++) {
			this.pages[
				i
			].style.transition = `transform ${this.swapTimer}ms ease-in-out, visibility ${this.swapTimer}ms ease-in-out, opacity ${this.swapTimer}ms`;
			this.pages[i].classList.add('SSCUloaded');
		}
		if (this.settings.thumbs) {
			(() => {
				let thumbcont = ENCORE_SEC.jsonElementify({
					type: 'div',
					classes: ['SSCUthumbs'],
				});
				for (let i = 0; i < this.pages.length; i++) {
					let thumb = ENCORE_SEC.jsonElementify({
						type: 'div',
						classes: ['SSCUthumb'],
						events: {
							click: {
								func: this.directPage.bind(this),
								var: i + 1,
							},
						},
						children: [
							{
								type: 'div',
								classes: ['SSCUprogress'],
							},
						],
					});
					thumbcont.appendChild(thumb);
				}
				this.SSCU.appendChild(thumbcont);
				return Promise.resolve(
					this.SSCU.getElementsByClassName('SSCUthumb'),
				);
			})().then((thumbs) => {
				this.thumbs = thumbs;
			});
		}
		if (this.settings.pauseButton) {
			(() => {
				this.SSCU.appendChild(
					ENCORE_SEC.jsonElementify({
						type: 'button',
						classes: ['SSCUpauseButton'],
						events: { click: { func: this.togglePlay.bind(this) } },
						attributes: { ariaLabel: 'Play / Pause' },
						innerHTML: `${SSCUicons['pause']} ${SSCUicons['play']}`,
					}),
				);
				return Promise.resolve(
					this.SSCU.getElementsByClassName('SSCUpauseButton')[0],
				);
			})().then((pauseBtn) => {
				this.pauseButton = pauseBtn;
			});
		}
		if (this.settings.sideButtons && !this.device) {
			ENCORE_SEC.appendChildren(this.SSCU, [
				ENCORE_SEC.jsonElementify({
					type: 'button',
					classes: ['SSCUpageButton'],
					events: {
						click: { func: this.changePage.bind(this), var: -1 },
					},
					attributes: { ariaLabel: 'Previous Page' },
					innerHTML: SSCUicons['leftArrow'],
				}),
				ENCORE_SEC.jsonElementify({
					type: 'button',
					classes: ['SSCUpageButton'],
					events: {
						click: { func: this.changePage.bind(this), var: 1 },
					},
					attributes: { ariaLabel: 'Next Page' },
					innerHTML: SSCUicons['rightArrow'],
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
				let videoArr = Array.prototype.slice
					.call(videos)
					.map((video) => {
						video.pause();
						video.setAttribute('playsinline', '');
						video.setAttribute('muted', '');
						video.setAttribute('loop', '');
						video.setAttribute('preload', 'auto');
						return video;
					});
				this.videos.push(videoArr);
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

	swipeSystem() {
		if (this.device) {
			this.SSCU.addEventListener('touchstart', (event) => {
				this.pages[
					this.index - 1
				].style.transition = `transform ${this.swapTimer}ms ease-in-out, visibility ${this.swapTimer}ms ease-in-out, opacity 0ms`;
				this.touch = event.touches[0].clientX;
			});
			this.SSCU.addEventListener('touchmove', (event) => {
				let SSCUtouchMove = event.changedTouches[0].clientX;
				this.pages[this.index - 1].style.opacity = `${
					1 -
					Math.min(Math.abs(this.touch - SSCUtouchMove), 120) / 200
				}`;
				if (
					Math.abs(SSCUtouchMove - this.touch) > 15 &&
					event.cancelable
				) {
					event.preventDefault();
					this.scrollLock = true;
				} else {
					this.scrollLock = false;
				}
			});
			this.SSCU.addEventListener('touchend', (event) => {
				this.pages[
					this.index - 1
				].style.transition = `transform ${this.swapTimer}ms ease-in-out, visibility ${this.swapTimer}ms ease-in-out, opacity ${this.swapTimer}ms`;
				let SSCUtouchEnd = event.changedTouches[0].clientX,
					SSCUwidth = this.SSCU.offsetWidth / 4.5;
				if (this.scrollLock) {
					if (SSCUtouchEnd - this.touch > SSCUwidth) {
						this.changePage(-1);
					} else if (SSCUtouchEnd - this.touch < -SSCUwidth) {
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
			this.pages[0].classList.add('SSCUloaded');
		}
	}
}

function checkLoadedSSCU() {
	return document.readyState === 'complete';
}

function pauseSSCU(index) {
	if (SSCUobjs[index].checkPages()) return;
	SSCUobjs[index].pause();
}

function playSSCU(index) {
	if (SSCUobjs[index].checkPages()) return;
	SSCUobjs[index].play();
}

function pauseAllSSCU() {
	for (let i = 0; i < SSCUobjs.length; i++) {
		pauseSSCU(i);
	}
}

function playAllSSCU() {
	for (let i = 0; i < SSCUobjs.length; i++) {
		playSSCU(i);
	}
}

function nextSlideSSCU(index) {
	if (SSCUobjs[index].checkPages()) return;
	SSCUobjs[index].changePage(1);
}

function previousSlideSSCU(index) {
	if (SSCUobjs[index].checkPages()) return;
	SSCUobjs[index].changePage(-1);
}

function SSCUstyleCall(url) {
	let style = document.createElement('link');
	style.rel = 'stylesheet';
	style.type = 'text/css';
	style.href = url;
	document.getElementsByTagName('head')[0].appendChild(style);
}

function load() {
	let elements = document.getElementsByTagName('sscu');
	if (!SSCU_settings) {
		var SSCU_settings = {
			thumbs: true,
			sideButtons: true,
			pauseButton: true,
			timer: 10000,
			slideSpeed: 500,
			style: 'STANDARD',
		};
	}
	if (SSCU_settings.style) {
		SSCUstyleCall(
			`https://natski.netlify.app/lib/ENCORE_DB/SSCU/${SSCU_settings.style}.css`,
		);
	}
	for (const element of elements) {
		SSCUobjs.push(new SSCU(element, SSCU_settings).init());
	}
}

window.addEventListener('DOMContentLoaded', load);

window.pauseAllSSCU = pauseAllSSCU;
window.playAllSSCU = playAllSSCU;
