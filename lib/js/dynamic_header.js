import { default as IS } from '../../api/encore/icon-system/is.min.js';

export default class dynamic {
	#widgets = {};
	#timers = {};
	#element;
	#title;
	#root;
	#states = {
		left: false,
		right: false,
	};

	constructor(element) {
		this.#element = element;
		this.#title = this.#element.children[0].children[0];
		this.#root = window.getComputedStyle(document.body);
		this.width();
	}

	get element() {
		return this.#element;
	}

	get states() {
		return this.#states;
	}

	right(size) {
		if (size) {
			this.#element.style.setProperty('--right', `${size}px`);
		} else {
			this.#element.style.setProperty('--right', '32px');
		}
	}

	separate(type) {
		switch (type) {
			case 'left':
				this.#element.classList.add('split-left');
				break;
			case 'right':
				this.#element.classList.add('split-right');
				break;
		}
		this.width();
	}

	join(type) {
		switch (type) {
			case 'left':
				this.#element.classList.remove('split-left');
				break;
			case 'right':
				this.#element.classList.remove('split-right');
				break;
		}
		this.width();
	}

	left(size) {
		if (size) {
			this.#element.style.setProperty('--left', `${size}px`);
		} else {
			this.#element.style.setProperty('--left', '32px');
		}
	}

	border(name) {
		if (name) {
			this.#element.style.setProperty(
				'--border',
				this.#root.getPropertyValue(name),
			);
		} else {
			this.#element.style.setProperty(
				'--border',
				this.#root.getPropertyValue('--border-color'),
			);
		}
		this.#element.classList.add('border');
	}

	removeBorder() {
		this.#element.classList.remove('border');
	}

	height(size) {
		if (size) {
			this.#element.style.height = `${size}px`;
		} else {
			this.#element.style.height = '40px';
		}
	}

	width(size) {
		if (size) {
			this.#element.style.width = `${size}px`;
		} else {
			this.#element.style.width = `${this.#title.offsetWidth}px`;
		}
	}

	setTitleWidth(name) {
		clearTimeout(this.#timers.width);

		this.pageTitle(name);
		this.#timers.width = setTimeout(() => {
			this.width();
		}, 410);
	}

	pageTitle(name) {
		clearTimeout(this.#timers.title);
		this.#title.classList.remove('fadein');
		this.#timers.title = setTimeout(() => {
			this.#title.innerHTML = name;
			this.#title.classList.add('fadein');
		}, 400);
	}

	show() {
		this.#element.classList.add('open');
	}

	hide() {
		this.#element.classList.remove('open');
	}

	dataDrop() {
		this.#element.classList.add('dropper');
	}

	endDrop() {
		this.#element.classList.remove('dropper');
	}

	setWidget(widget, id) {
		this.#widgets[id] = SEC.jsonElementify(widget);
		this.#element.children[0].appendChild(this.#widgets[id]);
	}

	getWidget(id) {
		return this.#widgets[id];
	}

	removeWidget(id) {
		if (this.#widgets[id]) {
			this.#widgets[id].remove();
			delete this.#widgets[id];
		}
	}
}
