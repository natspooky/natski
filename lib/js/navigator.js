import { jsonElementify } from '../../api/encore/element-creator/ec.min.js';

export default class Navigator {
	#element;
	#title;
	#root;
	#timers = {};
	#widgets = {
		left: {
			size: 30,
			widgets: {},
			container: null,
		},
		right: {
			size: 30,
			widgets: {},
			container: null,
		},
		center: {
			size: 40,
			widgets: {},
			container: null,
		},
		default: 30,
	};

	constructor(element) {
		this.#element = element;
		this.#root = window.getComputedStyle(document.body);
		this.#title = this.#element.children[0].children[0];
		this.#widgets.center.container = this.#element.children[1];
		this.#widgets.left.container = this.#element.children[2];
		this.#widgets.right.container = this.#element.children[3];
		this.width();
	}

	static create(title) {
		return new Navigator(
			jsonElementify({
				tag: 'nav',
				attributes: {
					style: '--left: 30px; --right: 30px; --border: var(--border-color)',
				},
				children: [
					{
						tag: 'div',
						children: {
							tag: 'section',
							classes: 'title fadeout fadein',
							innerHTML: title,
						},
					},
					{
						tag: 'span',
						classes: 'center',
					},
					{
						tag: 'span',
						classes: 'left',
					},
					{
						tag: 'span',
						classes: 'right',
					},
				],
			}),
		);
	}

	size(direction, size) {
		if (size < this.#widgets.default) {
			this.#element.style.setProperty(
				`--${direction}`,
				`${this.#widgets.default}px`,
			);
		} else {
			this.#element.style.setProperty(
				`--${direction}`,
				`${size + this.#widgets.default}px`,
			);
		}
	}

	width() {
		this.#element.style.width = `${this.#title.offsetWidth}px`;
	}

	border(name) {
		//////////cahnge to be better
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

	changeTitle(title) {
		clearTimeout(this.#timers.width);
		clearTimeout(this.#timers.title);

		this.#title.classList.remove('fadein');

		this.#timers.title = setTimeout(() => {
			this.#title.innerHTML = title;
			this.#title.classList.add('fadein');
		}, 400);

		this.#timers.width = setTimeout(() => {
			this.width();
		}, 410);
	}

	addWidget(direction, id, widget) {
		this.#widgets[direction].widgets[id] = jsonElementify(widget);
		this.#widgets[direction].container.appendChild(
			this.#widgets[direction].widgets[id],
		);
		this.changeSize(direction);
	}

	getWidget(direction, id) {
		return this.#widgets[direction].widgets[id];
	}

	widgetSize(direction) {
		return this.#widgets[direction].container.offsetWidth;
	}

	checkWidget(direction, id) {
		if (this.#widgets[direction].widgets[id]) {
			return true;
		}
		return false;
	}

	removeWidget(direction, id) {
		if (this.#widgets[direction].widgets[id]) {
			this.#widgets[direction].widgets[id].remove();
			delete this.#widgets[direction].widgets[id];
			this.changeSize(direction);
		}
	}

	changeSize(direction) {
		this.#widgets[direction].size = this.widgetSize(direction);
		this.size(direction, this.#widgets[direction].size);
	}

	show() {
		this.#element.classList.add('open');
	}

	hide() {
		this.#element.classList.remove('open');
	}

	get element() {
		return this.#element;
	}
}
