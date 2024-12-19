/*!
 * ENCORE SLIDE SHOW CONTAINER ULT
 * Author: NATSKI
 * MIT License
 */

import * as SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';
import * as ENCORE_DP from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_DP.mjs';
import * as GIS from 'https://natski.netlify.app/ENCORE/ENCORE_GIS.js';

var SSCUobjs = [];

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
		this.observer;
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
			this.SSCU.setAttribute('paused', false);
		} else {
			this.SSCU.setAttribute('paused', true);
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
			for (const thumb of this.thumbs) {
				thumb.classList.add('SSCUhidden');
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
			for (const thumb of this.thumbs) {
				thumb.classList.remove('SSCUselected');
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
		for (const page of this.pages) {
			page.style.transition = `transform ${this.swapTimer}ms ease-in-out, visibility ${this.swapTimer}ms ease-in-out, opacity ${this.swapTimer}ms`;
			page.classList.add('SSCUloaded');
		}
		if (this.settings.thumbs) {
			(() => {
				let thumbcont = SEC.jsonElementify({
					tag: 'div',
					classes: ['SSCUthumbs'],
				});
				for (let i = 0; i < this.pages.length; i++) {
					let thumb = SEC.jsonElementify({
						tag: 'div',
						classes: ['SSCUthumb'],
						events: {
							click: {
								func: this.directPage.bind(this),
								var: i + 1,
							},
						},
						children: [
							{
								tag: 'div',
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
					SEC.jsonElementify({
						tag: 'button',
						classes: ['SSCUpauseButton'],
						events: { click: { func: this.togglePlay.bind(this) } },
						attributes: { ariaLabel: 'Play / Pause' },
						children: [
							{
								tag: 'GIS',
								classes: ['SSCUpause'],
								attributes: { name: 'pause' },
							},
							{
								tag: 'GIS',
								classes: ['SSCUplay'],
								attributes: { name: 'play' },
							},
						],
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
			SEC.appendChildren(
				this.SSCU,
				SEC.jsonMultiElementify([
					{
						tag: 'button',
						classes: ['SSCUpageButton'],
						events: {
							click: {
								func: this.changePage.bind(this),
								var: -1,
							},
						},
						attributes: { ariaLabel: 'Previous Page' },
						children: [
							{
								tag: 'GIS',
								attributes: { name: 'mini_arrow_left' },
							},
						],
					},
					{
						tag: 'button',
						classes: ['SSCUpageButton'],
						events: {
							click: { func: this.changePage.bind(this), var: 1 },
						},
						attributes: { ariaLabel: 'Next Page' },
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

	checkMedia() {
		for (const page of this.pages) {
			let videos = page.getElementsByTagName('video');
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
				.call(page.getElementsByTagName('img'))
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
				for (const page of this.pages) {
					page.style.opacity = '1';
				}
			});
		}
	}

	mutationObserver() {
		this.observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === 'attributes' &&
					mutation.target.hasAttribute('paused')
				) {
					if (mutation.target.getAttribute('paused') === 'true') {
						this.pause();
					} else {
						this.play();
					}
				}
			});
		});
		this.observer.observe(this.SSCU, {
			attributes: true,
			subtree: false,
			childList: false,
			characterData: false,
			attributeFilter: ['paused'],
		});
	}

	pageFocus() {
		window.addEventListener('focus', () => {
			if (this.pauseMemory) {
				this.pauseMemory = false;
			} else {
				this.SSCU.setAttribute('paused', false);
			}
		});
		window.addEventListener('blur', () => {
			if (this.paused) {
				this.pauseMemory = true;
			} else {
				this.pauseMemory = false;
				this.SSCU.setAttribute('paused', true);
			}
		});
	}

	init() {
		if (!this.checkPages()) {
			this.checkMedia();
			this.swipeSystem();
			this.pageFocus();
			this.mutationObserver();
			Promise.resolve(this.createElements()).then(() => {
				new GIS.GIS().applyMasks(this.SSCU.getElementsByTagName('GIS'));
				this.directPage(1);
			});
		} else {
			this.pages[0].classList.add('SSCUloaded');
		}
	}
}

function load() {
	let elements = document.getElementsByTagName('sscu');
	/*if (!SSCU_settings) {
		console.log(SSCU_settings, !SSCU_settings);
		console.log('no SSCU settings found, reverting to default');
		var SSCU_settings = {
			thumbs: true,
			sideButtons: true,
			pauseButton: true,
			timer: 10000,
			slideSpeed: 500,
			style: 'STANDARD',
		};
	}*/

	for (const element of elements) {
		SSCUobjs.push(new SSCU(element, SSCU_settings).init());
	}
}

window.addEventListener('DOMContentLoaded', load);
