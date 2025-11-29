/* -----------------------------------------------
/* Author : NATSKI - natski.dev
/* MIT license : https://opensource.org/license/MIT
/* GitHub : https://github.com/natspooky/encore
/* How to use? : Check the GitHub README or visit https://natski.dev/apis/encore/icon-system
/* ----------------------------------------------- */

import { IS_DATA } from './dependencies/icon-system/IS_DATA.js';
import { fileExtention } from '../dependencies/file-utils.js';
import Console from '../dependencies/console.js';

const iconSystemConsole = new Console('Icon System', '#1fa5baff');

class IS extends HTMLElement {
	static observedAttributes = ['name', 'src', 'positionable'];

	#iconPath;
	#self;

	constructor() {
		const self = super();

		this.#self = self;
		this.#iconPath =
			'https://natski.vercel.app/apis/encore/dependencies/icon-system/svg/?.svg';
	}

	#createMask(icon, custom) {
		if (!IS_DATA.includes(icon) && !custom) {
			iconSystemConsole.message({
				error: `The Icon-System icon '${icon}' doesn't exist. Did you mean to use 'src' instead of 'name'?`,
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
			iconSystemConsole.message({
				error: `No 'src' or 'name' provided`,
				message: `Icon load error:`,
			});
			this.#self.style.mask = this.#createMask('alert', false);
			this.#showIcon();
			return;
		}

		if (name) {
			this.#self.style.mask = this.#createMask(name, false);
			this.#showIcon();
			return;
		}

		if (source) {
			if (fileExtention(source) === 'svg') {
				this.#self.style.mask = this.#createMask(source, true);
			} else {
				this.#self.style.backgroundImage = this.#createMask(
					source,
					true,
				);
			}
			this.#showIcon();

			const buffer = new Image();

			buffer.onerror = () => {
				iconSystemConsole.message({
					message: 'Icon load error:',
					error: `The custom icon '${source}' doesn't exist`,
				});
				this.#self.style.mask = this.#createMask('alert', false);
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

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.#scanIcon();
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

		iconSystemConsole.message({
			message: 'Construction error:',
			error: 'An instance of Icon System is already active',
		});
	}
}
