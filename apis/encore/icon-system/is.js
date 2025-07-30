/* -----------------------------------------------
/* Author : NATSKI - natski.dev
/* MIT license : https://opensource.org/license/MIT
/* GitHub : https://github.com/natspooky/encore
/* How to use? : Check the GitHub README or visit https://natski.dev/apis/encore/icon-system
/* ----------------------------------------------- */

import { IS_DATA } from './dependencies/IS_DATA.js';
import { fileExtention } from '../../dependencies/file-utils/fu.min.js';
import encoreConsole from '../dependencies/encoreConsole.js';

class IS extends HTMLElement {
	static observedAttributes = ['name', 'src', 'width', 'height'];

	#iconPath;
	#self;

	constructor() {
		let self = super();

		this.#self = self;
		this.#iconPath =
			'https://natski.vercel.app/apis/encore/icon-system/dependencies/svg/?.svg';
	}

	#createMask(icon, custom) {
		if (!IS_DATA.includes(icon) && !custom) {
			encoreConsole({
				error: `The icon System icon '${icon}' doesn't exist`,
				message: `Icon load error:`,
			});

			icon = 'alert';
		}
		return `url(${
			custom ? icon : this.#iconPath.replace('?', icon)
		}) no-repeat center`;
	}

	#showIcon() {
		this.#self.style.visibility = null;
	}

	#hideIcon() {
		this.#self.style.visibility = 'hidden';
	}

	#scanIcon() {
		this.#hideIcon();

		const name = this.getAttribute('name');
		const source = this.getAttribute('src');

		if (!name && !source) {
			this.#self.style.mask = this.#createMask('alert');
			this.#showIcon();
			return;
		}

		if (name) {
			this.#self.style.mask = this.#createMask(name);
			this.#showIcon();
			return;
		}

		if (source) {
			const buffer = new Image();

			buffer.onload = () => {
				if (fileExtention(source) === 'svg') {
					this.#self.style.mask = this.#createMask(source, true);
				} else {
					this.#self.style.backgroundImage = this.#createMask(
						source,
						true,
					);
				}
				this.#showIcon();
			};

			buffer.onerror = () => {
				encoreConsole({
					message: 'Icon load error:',
					error: `The custom icon '${source}' doesn't exist`,
				});
				this.#self.style.mask = this.#createMask('alert');
				this.#showIcon();
			};

			buffer.src = source;
		}
	}

	connectedCallback() {
		this.#scanIcon();
	}

	disconnectedCallback() {
		this.#hideIcon();
	}

	connectedMoveCallback() {
		this.#showIcon();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		oldValue = newValue;
		switch (name) {
			case 'src':
			case 'name':
				this.#scanIcon();
				break;
			case 'width':
				break;
			case 'height':
				break;
			default:
				throw new Error('FATAL ERROR');
		}
	}
}

export default class IconSystem {
	constructor() {
		if (!window.IconSystem) {
			customElements.define('icon-system', IS);
			window.IconSystem = this;
			return;
		}

		// throw new Error('An instance of Icon System is already active');
	}
}
