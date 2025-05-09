/*!
 * ENCORE CONTEXT MENU SYSTEN
 * Author: NATSKI
 * MIT License
 */

let CMSobj;

function loadCMS(settings) {
	let check = false;
	(function (a) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
				a,
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4) && 'ontouchend' in document,
			)
		)
			check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	if (!check && document.getElementsByClassName('CMS')[0] != undefined) {
		document.getElementsByClassName('CMS')[0].style.display = 'block';
		CMSobj = new CMS(
			document.getElementsByClassName('CMS')[0],
			settings,
		).init();
	}
}

function reloadCMS(settings) {
	if (CMSobj != undefined) {
		CMSobj.resetTempEvents();
		CMSobj.resetEvents();
		Promise.resolve((CMSobj = undefined)).then(() => {
			loadCMS(settings);
		});
	} else {
		loadCMS(settings);
	}
}

function CMSstyleCall(url, settings, load) {
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

function checkLoadedCMS() {
	return document.readyState === 'complete';
}

if (checkLoadedCMS() == true) {
	CMSstyleCall(
		`https://natski.netlify.app/lib/ENCORE_DB/CMS/${CMS_settings.style}CMS.css`,
		CMS_settings,
		loadCMS,
	);
}

class CMS {
	constructor(element, settings) {
		this.CMS = element;
		this.pages = this.CMS.getElementsByClassName('CMScontext');
		this.startPage = this.pages[0];
		//this.isOpen = false
		this.currentPage = undefined;
		this.settings = settings;
		this.eventListeners = [];
		this.tempEventListeners = [];
	}

	init() {
		this.attachToElement();
		this.createSubPageListeners();
	}

	open(event) {
		this.reset();

		//this.target = event.target

		this.CMS.style.top = `${event.clientY + 5}px`;
		this.CMS.style.left = `${event.clientX + 5}px`;

		this.CMS.classList.add('active');

		this.checkPageOverflow();

		this.createCloseListeners();

		// create the close event listener here so it isnt always running.

		// also create the fade out mouse move event listener here.
	}

	close() {
		//if(!event.target.classList.contains('CMSclickable')) {

		this.resetTempEvents();
		Promise.resolve((this.CMS.style.opacity = null)).then(() => {
			this.reset();
			this.CMS.classList.remove('active');
		});
	}

	changePage(pageID) {
		this.currentPage = document.getElementById(pageID);

		this.CMS.style.transition =
			'top 0.25s, transform 0.25s, opacity 0.25s, visibility 0.25s, height 0.25s';

		this.checkPageOverflow();

		this.checkWindowCollisions();

		for (let i = 0; i < this.pages.length; i++) {
			this.pages[i].classList.remove('active');
		}

		this.currentPage.classList.add('active');

		//this.startPage.classList.add('active') // hides startpage
		this.CMS.style.height = `${this.currentPage.offsetHeight + 4}px`;
	}

	reset() {
		this.currentPage = this.startPage;
		this.CMS.style.opacity = null;
		this.CMS.style.transition =
			'top 0s, transform 0.25s, opacity 0.25s, visibility 0.25s, height 0.25s'; // make this work through classes
		for (let i = 0; i < this.pages.length; i++) {
			this.pages[i].classList.remove('active');
		}
		this.currentPage.classList.add('active');
		this.checkPageOverflow();
		this.CMS.style.height = `${this.startPage.offsetHeight + 4}px`;
	}

	checkWindowCollisions() {
		if (
			this.currentPage.offsetHeight + this.CMS.offsetTop >=
			window.innerHeight - 10
		) {
			this.CMS.style.top = `${
				window.innerHeight - this.currentPage.offsetHeight - 10
			}px`;
		}
		if (
			this.CMS.offsetWidth + this.CMS.offsetLeft >=
			window.innerWidth - 10
		) {
			this.CMS.style.left = `${
				window.innerWidth - this.currentPage.offsetWidth - 10
			}px`;
		}
	}

	checkPageOverflow() {
		if (
			this.currentPage.scrollHeight > 240 ||
			this.currentPage.offsetHeight > 240
		) {
			this.currentPage.style.overflow = 'scroll';
		} else {
			this.currentPage.style.overflow = 'hidden';
		}
	}

	fadeOut(event) {
		let distance = Math.sqrt(
			(event.clientX - this.CMS.offsetLeft - this.CMS.offsetWidth / 2) **
				2 +
				(event.clientY -
					this.CMS.offsetTop -
					this.CMS.offsetHeight / 2) **
					2,
		);
		if (distance >= 200) {
			this.CMS.style.opacity = Math.max(1 - (distance - 200) / 100, 0);
			if (distance >= 300) {
				this.close();
			}
		} else {
			this.CMS.style.opacity = null;
		}
	}

	resetEvents() {
		this.eventListeners.forEach((remover) => {
			remover();
		});
		this.tempEventListeners.forEach((remover) => {
			remover();
		});
	}

	resetTempEvents() {
		this.tempEventListeners.forEach((remover) => {
			remover();
		});
	}

	createCloseListeners() {
		let closer = (event) => {
				if (!event.target.classList.contains('CMSclickable')) {
					this.close();
				}
			},
			fader = (event) => this.fadeOut(event);
		document.addEventListener('click', closer);
		document.addEventListener('mousemove', fader);
		this.tempEventListeners = [
			() => document.removeEventListener('click', closer),
			() => document.removeEventListener('mousemove', fader),
		];
	}

	createSubPageListeners() {
		Array.prototype.forEach.call(this.pages, (element) => {
			this.eventListeners.push(
				...Array.prototype.map.call(element.children, (child) => {
					if (child.classList.contains('CMSclickable')) {
						let clicker = () => {
							this.changePage(
								child.getAttribute('CMSreturnPage'),
							);
						};
						child.addEventListener('click', clicker);
						return () =>
							child.removeEventListener('click', clicker);
					} else {
						return () => {
							return;
						};
					}
				}),
			);
		});
	}

	attachToElement() {
		let attachment =
				this.settings.attachment == null
					? document
					: document.querySelectorAll(this.settings.attachment),
			opener = (event) => {
				console.log('open', event);
				event.preventDefault();
				this.open(event);
			};
		if (attachment == document) {
			document.addEventListener('contextmenu', opener);
			this.eventListeners.push(() =>
				document.removeEventListener('contextmenu', opener),
			);
		} else if (attachment.length > 1) {
			attachment.forEach((element) => {
				element.addEventListener('contextmenu', opener);
				this.eventListeners.push(() =>
					element.removeEventListener('contextmenu', opener),
				);
			});
		} else {
			console.log(document.querySelector(this.settings.attachment));
			document
				.querySelector(this.settings.attachment)
				.addEventListener('contextmenu', opener);
			this.eventListeners.push(() =>
				document
					.querySelector(this.settings.attachment)
					.removeEventListener('contextmenu', opener),
			);
		}
	}
}

window.addEventListener('load', function () {
	CMSstyleCall(
		`https://natski.netlify.app/lib/ENCORE_DB/CMS/${CMS_settings.style}CMS.css`,
		CMS_settings,
		loadCMS,
	);
});
