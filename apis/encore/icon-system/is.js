/* -----------------------------------------------
/* Author : NATSKI - natski.dev
/* MIT license : https://opensource.org/license/MIT
/* GitHub : https://github.com/natspooky/encore
/* How to use? : Check the GitHub README or visit https://natski.dev/apis/encore/icon-system
/* ----------------------------------------------- */

import { IS_DATA } from './dependencies/IS_DATA.js';
import { fileExtention } from '../../dependencies/file-utils/fu.min.js';

class IS extends HTMLElement {
	static observedAttributes = ['name', 'src', 'width', 'height'];

	#iconPath;
	#self;

	constructor() {
		this.#self = super();

		this.#iconPath =
			'https://natski.vercel.app/apis/encore/icon-system/dependencies/svg/?.svg';

		//	this.attachShadow({ mode: 'closed' });

		this.style.display = 'none';
		this.style.visibility = 'hidden';
	}

	#createMask(icon, custom) {
		if (!IS_DATA.includes(icon)) {
			icon = 'alert';
		}
		return `url(${
			custom ? icon : this.#iconPath.replace('?', icon)
		}) no-repeat center`;
	}

	#showIcon() {
		this.style.display = null;
		this.style.visibility = null;
	}

	connectedCallback() {
		const name = this.getAttribute('name');
		const source = this.getAttribute('src');

		if (!(name && source)) {
			this.style.mask = this.#createMask('alert');
			this.#showIcon();
			return;
		}

		if (name) {
			this.style.mask = this.#createMask(name);
			this.#showIcon();
		}

		if (source) {
			const buffer = new Image();

			buffer.onload = () => {
				if (fileExtention(source) === 'svg') {
					this.style.mask = this.#createMask(source, true);
				} else {
					this.style.backgroundImage = this.#createMask(source, true);
				}
				this.#showIcon();
			};

			buffer.onerror = () => {
				this.style.mask = this.#createMask('alert');
				this.#showIcon();
			};

			buffer.src = source;
		}
	}

	disconnectedCallback() {
		this.style.visibility = 'hidden';
	}

	connectedMoveCallback() {
		this.style.visibility = 'visible';
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'src':
				break;
			case 'name':
				break;
			case 'width':
				break;
			case 'height':
				break;
			default:
				throw new Error('yeah idk how this happened');
		}
	}
}

export default class IconSystem {
	#observer;

	constructor() {
		if (window.IconSystem) {
			throw new Error(
				'An instance of ENCORE Icon System is already running',
			);
		}

		customElements.define('icon-system', IS);

		window.IconSystem = this;
	}
}
