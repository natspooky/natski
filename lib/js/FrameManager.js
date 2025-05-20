import { jsonElementify } from '../../api/encore/element-creator/ec.min.js';
import IS from '../../api/encore/icon-system/is.min.js';
import Navigator from './navigator.js';
import BackButton from '../components/widgets/backButton.js';
import CloseButton from '../components/widgets/closeButton.js';
import Loader from '../components/widgets/loader.js';

if (!window.location.href.includes('index')) {
	window.open('index.html#', '_self');
}

class FWS {
	constructor() {
		this.pageTrack = [];
		this.navigator = new dyn(document.getElementById('navigator'));
		this.iframeContainer = document.getElementById('embedded-frame');
		this.iframe = document.getElementById('iframe');
	}

	init() {
		new IS().observe(document);
		this.navigator.show();
		this.navigator.border();

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

	changeFrame(URL) {
		if (!this.navigator.getWidget('loader')) {
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
		if (!this.navigator.getWidget('closeButton')) {
			this.addClose();
		}
		//document.getElementsByTagName('sscu')[0].setAttribute('paused', true);
	}

	formatURL(URL) {
		let formatted = { page: URL, hash: '' };
		if (formatted.page.includes('%20')) {
			formatted.page = formatted.page.replaceAll('%20', '-');
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
			this.pageTrack.length = this.pageTrack.indexOf(name);
		}
		if (
			this.pageTrack.length == 0 &&
			this.navigator.getWidget('backButton')
		) {
			this.removeBack();
		}
	}

	undoSubPage() {
		window.location.hash = this.pageTrack.pop();
	}

	incrementSubPage() {
		let name = window.location.hash.slice(1, window.location.hash.length);
		name = name.toLowerCase();
		name = name.replaceAll('_', ' ');
		name = name.replaceAll('%20', ' ');
		this.pageTrack.push(name);

		if (!this.navigator.getWidget('backButton')) {
			this.addBack();
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
		this.navigator.setTitleWidth(text);
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
	window.frameManager = new FrameManager().init();
});

class FrameManager {
	#pageHistory = [];
	#navigator;
	#pageFrame;
	#pageFrameContainer;

	constructor() {
		this.#navigator = new Navigator(document.getElementById('navigator'));
		this.#pageFrameContainer = document.getElementById('embedded-frame');
		this.#pageFrame = document.getElementById('iframe');
	}

	init() {
		new IS().observe(document);
		this.#navigator.show();
		this.#navigator.border();

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

	clearHistory() {
		this.#pageHistory = [];
		this.removeWidget('left', 'backButton');
	}

	addHistory() {
		const hash = window.location.hash;

		this.#pageHistory.push(hash);

		this.addWidget('left', 'backButton', BackButton());
	}

	generateFrame(URL) {
		return jsonElementify({
			tag: 'iframe',
			events: {
				load: {
					func: this.removeWidget.bind(this),
					var: ['right', 'loader'],
				},
			},
			attributes: {
				id: 'iframe',
				title: URL,
				src: URL,
			},
		});
	}

	prepareFrame(URL) {
		this.#pageFrame.classList.add('closed');
		setTimeout(() => {
			this.#pageFrame.remove();
			this.#pageFrame = this.generateFrame(URL);
			this.#pageFrameContainer.appendChild(this.#pageFrame);
		}, 305);
	}

	closeFrame() {
		this.removeWidget('right', 'loader');
		this.removeWidget('left', 'closeButton');

		this.#navigator.changeTitle('Home');

		this.prepareFrame('');
	}

	changeFrame(URL) {
		this.addWidget('right', 'loader', Loader());

		const { page, hash, title } = this.prepareURL(URL);

		this.#navigator.changeTitle(title);

		this.prepareFrame(`${page}.html#${hash}`);
		this.#pageFrame.focus();

		this.addWidget('left', 'closeButton', CloseButton());
	}

	prepareURL(URL) {
		return { page, hash, title };
	}

	removeWidget(direction, id) {
		if (this.#navigator.checkWidget(direction, id)) {
			this.#navigator.getWidget(direction, id).classList.remove('fadein');
			setTimeout(() => {
				this.#navigator.removeWidget(direction, id);
			}, 300);
		}
	}

	addWidget(direction, id, widget) {
		if (!this.#navigator.checkWidget(direction, id)) {
			this.#navigator.addWidget(direction, id, widget);
			setTimeout(() => {
				this.#navigator
					.getWidget(direction, id)
					.classList.add('fadein');
			}, 200);
		}
	}

	/**
	 * @param {string} hash
	 */

	set hash(hash) {
		window.location.hash = hash;
	}
}
