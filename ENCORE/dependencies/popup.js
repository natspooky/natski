class alert {
	constructor() {
		this.data = [];
		this.timer;
	}

	init() {
		this.generateAlert().then((output) => {
			document.body.appendChild(output.box);
			setTimeout(() => {
				this.start(output.data, output.box);
			}, 10);
		});
	}

	checkData() {
		return this.data.length > 0;
	}

	add(text, icon, duration, prompt, colour) {
		if (!(this.data.length > 6)) {
			this.data.push({
				txt: text,
				icn: icon,
				dur: duration,
				pmt: prompt,
				col: colour,
			});
		}
		if (!this.timer) {
			this.init();
		}
	}

	start(data, box) {
		box.classList.add('open');
		if (data.dur) {
			this.remove(data.dur, box);
		} else {
			this.timer = 'await';
		}
	}

	end(box) {
		box.classList.remove('open');
	}

	remove(duration, box) {
		this.timer = setTimeout(() => {
			this.end(box);
			setTimeout(() => {
				box.remove();
				if (this.checkData()) {
					this.init();
				}
				this.timer = undefined;
			}, 510);
		}, duration);
	}

	elementCreator(
		elementType,
		elementClass,
		attribute,
		attributeValue,
		innerHTML,
		eventType,
		eventFunction,
		functionVariable,
	) {
		let element = document.createElement(elementType);
		if (elementClass) {
			element.className = elementClass;
		}
		if (attribute) {
			element.setAttribute(attribute, attributeValue);
		}
		if (innerHTML) {
			element.innerHTML = innerHTML;
		}
		if (eventType) {
			element.addEventListener(
				eventType,
				functionVariable
					? () => eventFunction(functionVariable)
					: () => eventFunction(),
			);
		}
		return element;
	}

	generateAlert() {
		let data = this.data.shift(),
			box = this.elementCreator('div', 'window-popup'),
			textContainer = this.elementCreator('div'),
			text = this.elementCreator('p', null, null, null, data.txt),
			divider = this.elementCreator('span'),
			icon = this.elementCreator('GIS-icon', null, 'name', data.icn);
		if (data.col) {
			box.style.backgroundColor = data.col;
		}

		switch (data.pmt) {
			case 'boolean':
				break;
			case 'text':
				break;
			case '':
				break;
			default:
				break;
		}

		textContainer.appendChild(icon);
		textContainer.appendChild(divider);
		textContainer.appendChild(text);
		box.appendChild(textContainer);
		return Promise.resolve({ box: box, data: data });
	}
}

module.exports = { alert };
