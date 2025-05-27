import { jsonElementify } from '../../api/encore/element-creator/ec.min.js';
import IS from '../../api/encore/icon-system/is.min.js';
import Navigator from './navigator.js';
import BackButton from '../components/widgets/backButton.js';
import CloseButton from '../components/widgets/closeButton.js';
import Loader from '../components/widgets/loader.js';
import Progress from '../components/widgets/progress.js';
import {
	Rotate,
	Shrink,
	Zoom,
	Download,
} from '../components/widgets/imageTools.js';
import Dropper from '../components/widgets/dropper.js';
import IconSystem from '../components/widgets/iconSystem.js';

if (!window.location.href.includes('index')) {
	window.open('index.html#', '_self');
}

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

		document.addEventListener('dragover', this.dropper.bind(this));

		document.addEventListener('drop', this.removeDropper.bind(this));

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
		const { page } = this.prepareURL(window.location.hash.slice(1));

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

	changeFrame(URL) {
		this.addWidget('right', 'size', Shrink());
		/*this.addWidget('right', 'siez', Zoom());
		this.addWidget('right', 'sie', Rotate());
		this.addWidget('right', 'si', Download());*/

		if (this.#navigator.widgetCount('right') < 1) {
			this.addWidget('right', 'loader', Loader());
		}

		this.scrollable = false;

		const { page, hash, title, query } = this.prepareURL(URL);

		if (query == 'embed=false') {
			console.log(page);
			this.closeFrame();
			window.open(
				'https://natski.netlify.app/' + page + '#' + hash + '?' + query,
				'_self',
			);
		}

		console.log(query);

		this.#navigator.changeTitle(title);

		this.prepareFrame(`${page}.html#${hash}`);
		this.#pageFrame.focus();

		this.checkHistory(page);

		this.#pageFrameContainer.classList.add('active');

		this.addWidget('left', 'closeButton', CloseButton());
	}

	//.contentWindow

	prepareURL(URL) {
		const hashIndex = URL.indexOf('#');

		let page, hash, title, query;

		if (URL.indexOf('?')) {
			let index = URL.indexOf('?');
			query = URL.slice(index + 1);
			URL = URL.slice(0, index);
		}

		page = URL.replaceAll('%20', '-').replaceAll('_', '-');

		if (hashIndex !== -1) {
			hash = page.slice(hashIndex + 1);
			page = page.slice(0, hashIndex);
		} else {
			hash = '';
		}

		title = page
			.split('/')
			[page.split('/').length - 1].split('-')
			.map((word) => {
				return word.slice(0, 1).toUpperCase() + word.slice(1);
			})
			.join(' ');

		return { page, hash, title, query };
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

	////////////

	dropper(ev) {
		ev.preventDefault();
		this.addWidget('center', 'dropper', Dropper());
		this.#navigator.element.style.height = '100px';
		this.#navigator.element.classList.add('center');
	}

	removeDropper(ev) {
		ev.preventDefault();
		this.removeWidget('center', 'dropper');
		this.removeCenter();
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
