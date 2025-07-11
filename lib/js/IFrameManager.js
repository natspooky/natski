import { jsonElementify } from '../../apis/encore/element-creator/ec.min.js';
import IS from '../../apis/encore/icon-system/is.min.js';
import Navigator from './navigator.js';
import BackButton from '../components/widgets/backButton.js';
import CloseButton from '../components/widgets/closeButton.js';
import Loader from '../components/widgets/loader.js';

class FrameManager {
	#pageHistory = [];
	#navigator;
	#pageFrame;
	#pageFrameContainer;
	#currentPageURL;

	constructor() {
		this.#navigator = new Navigator(document.getElementById('navigator'));
		document.body.appendChild(this.#navigator.element);
		this.#pageFrameContainer = document.getElementById('embedded-frame');
		this.#pageFrame = document.getElementById('iframe');
	}

	init() {
		new IS().observe(document);

		setTimeout(() => {
			this.#navigator.show();
		}, 100);

		if (window.location.hash.length > 2) {
			this.changeFrame(window.location.href);
		}

		window.addEventListener('popstate', () => {
			if (window.location.hash.length > 2) {
				this.changeFrame(window.location.href);
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
		const { page } = this.prepareURL();

		this.#pageHistory.push(page);

		this.addWidget('left', 'backButton', BackButton());
	}

	loadHistory() {
		this.hash = this.#pageHistory.pop();
	}

	checkHistory(URL) {
		if (this.#pageHistory.includes(URL)) {
			this.#pageHistory.length = this.#pageHistory.indexOf(URL);
		}
		if (this.#pageHistory.length === 0) {
			this.removeWidget('left', 'backButton');
		}
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

		this.#pageFrameContainer.classList.remove('active');

		this.#navigator.changeTitle('Home');

		this.prepareFrame('');

		this.clearHistory();

		this.scrollable = true;
	}

	changeFrame(url) {
		/*this.addWidget('right', 'size', Shrink());
		this.addWidget('right', 'siez', Zoom());
		this.addWidget('right', 'sie', Rotate());
		this.addWidget('right', 'si', Download());*/

		const pageURL = new URL(url.replace('.html', ''));

		this.#currentPageURL = new URL(
			pageURL.protocol + '//' + pageURL.host + pageURL.hash.slice(1),
		);

		if (this.#navigator.widgetCount('right') < 1) {
			this.#navigator.element.classList.add('right');
			this.addWidget('right', 'loader', Loader());
		}

		this.scrollable = false;

		const { title, page } = this.prepareURL();

		const tempFrameURL = `${
			pageURL.protocol + '//' + this.#currentPageURL.host + page
		}.html${this.#currentPageURL.hash}`;

		if (this.#currentPageURL.searchParams.get('embed') === 'false') {
			window.open(`${tempFrameURL}?embed=false`, '_self');
		}

		this.#navigator.changeTitle(title);

		this.prepareFrame(tempFrameURL);

		this.checkHistory(page);

		this.#pageFrameContainer.classList.add('active');
		this.#navigator.element.classList.add('left');
		this.addWidget('left', 'closeButton', CloseButton());
		this;
	}

	//.contentWindow

	prepareURL() {
		let page, title;

		page = this.#currentPageURL.pathname
			.replaceAll('%20', '-')
			.replaceAll('_', '-');

		title = page
			.split('/')
			[page.split('/').length - 1].split('-')
			.map((word) => {
				return word.slice(0, 1).toUpperCase() + word.slice(1);
			})
			.join(' ');

		return { page, title };
	}

	removeWidget(direction, id) {
		if (this.#navigator.checkWidget(direction, id)) {
			this.#navigator.getWidget(direction, id).classList.remove('fadein');
			setTimeout(() => {
				this.#navigator.removeWidget(direction, id);
				if (this.#navigator.widgetCount(direction) === 0)
					this.#navigator.element.classList.remove(direction);
			}, 300);
		}
	}

	removeAllWidgets(direction) {
		Object.entries(
			this.#navigator.getWidgetsByDirection(direction),
		).forEach(([key, _]) => {
			this.removeWidget(direction, key);
		});
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

	/**
	 * @param {boolean} bool
	 */

	set scrollable(bool) {
		if (bool) {
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
