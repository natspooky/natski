/*!
 * Cubic Bezier
 * Author: NATSKI
 * MIT License
 */

import * as SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';
import * as DP from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_DP.mjs';
import PAS from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_PAS.mjs';

var library;

class curveGraph {
	constructor() {
		this.canvas = document.getElementById('bezier');
		this.handleL = document.getElementById('handleL');
		this.handleR = document.getElementById('handleR');
		this.dataInfo = document.getElementById('data');

		this.beforeX = document.getElementById('beforeX');
		this.afterX = document.getElementById('afterX');
		this.beforeY = document.getElementById('beforeY');
		this.afterY = document.getElementById('afterY');

		this.outputLeft = document.getElementById('leftCoords');
		this.outputRight = document.getElementById('rightCoords');

		this.isDown = false;
		this.currentAnchor = 'L';
		this.clientRect = this.canvas.getBoundingClientRect();

		this.ctx = this.canvas.getContext('2d');

		this.mobile = DP.userDevice();
	}

	init() {
		this.canvas.height = 600;
		this.canvas.width = 300;
		this.ctx.translate(0, this.canvas.height * (3 / 4));
		this.ctx.scale(this.canvas.width, -(this.canvas.height / 2));
		document
			.getElementsByTagName('INPUT')[0]
			.addEventListener('input', this.setBezier.bind(this));
		this.canvas.parentNode.parentNode.addEventListener(
			this.mobile ? 'touchstart' : 'mousedown',
			this.mobile
				? this.touchStart.bind(this)
				: this.mouseDown.bind(this),
		);
		document.addEventListener(
			this.mobile ? 'touchmove' : 'mousemove',
			this.inputMove.bind(this),
		);
		document.addEventListener(
			this.mobile ? 'touchend' : 'mouseup',
			this.inputEnd.bind(this),
		);
	}

	clamp(number, type) {
		switch (type) {
			case 'X':
				return Math.min(Math.max(number, 0), 1);
			case 'Y':
				return Math.min(Math.max(number, -1), 2);
		}
	}

	calcYfromMouse(value) {
		return (-value / this.canvas.offsetHeight + 3 / 4) * 2;
	}

	round(value) {
		return Number(value).toFixed(2);
	}

	touchStart(event) {
		let x = this.clamp(
				(event.touches[0].clientX - this.clientRect.left) /
					this.canvas.offsetWidth,
				'X',
			),
			y = this.clamp(
				this.calcYfromMouse(
					event.touches[0].clientY -
						this.canvas.parentNode.parentNode.parentNode.parentNode
							.offsetTop +
						window.scrollY -
						this.canvas.parentNode.offsetTop -
						this.canvas.parentNode.parentNode.offsetTop,
				),
				'Y',
			),
			pythagLeft = this.pythag(
				this.handleL.dataset.positionX - x,
				this.handleL.dataset.positionY - y,
			),
			pythagRight = this.pythag(
				this.handleR.dataset.positionX - x,
				this.handleR.dataset.positionY - y,
			);

		if ((pythagLeft < 0.12 || pythagRight < 0.12) && event.cancelable) {
			event.preventDefault();
			if (pythagLeft < pythagRight) {
				this.currentAnchor = 'L';
			} else {
				this.currentAnchor = 'R';
			}
			this.isDown = true;
			this.setBefValue(this.currentAnchor);
			this.dataInfo.classList.add('visible');
		}
	}

	mouseDown(event) {
		let x = this.clamp(
				(event.clientX - this.clientRect.left) /
					this.canvas.offsetWidth,
				'X',
			),
			y = this.clamp(
				this.calcYfromMouse(
					event.clientY -
						this.canvas.parentNode.parentNode.parentNode.parentNode
							.offsetTop +
						window.scrollY -
						this.canvas.parentNode.offsetTop -
						this.canvas.parentNode.parentNode.offsetTop,
				),
				'Y',
			);
		if (
			this.pythag(
				this.handleL.dataset.positionX - x,
				this.handleL.dataset.positionY - y,
			) <
			this.pythag(
				this.handleR.dataset.positionX - x,
				this.handleR.dataset.positionY - y,
			)
		) {
			this.currentAnchor = 'L';
		} else {
			this.currentAnchor = 'R';
		}
		this.isDown = true;
		this.setBefValue(this.currentAnchor);
		this.dataInfo.classList.add('visible');
	}

	inputMove(event) {
		if (this.isDown) {
			this.loadBezierData(this.currentAnchor, {
				x: this.clamp(
					((this.mobile
						? event.changedTouches[0].clientX
						: event.clientX) -
						this.canvas.parentNode.offsetLeft -
						20) /
						this.canvas.offsetWidth,
					'X',
				),
				y: this.clamp(
					this.calcYfromMouse(
						(this.mobile
							? event.changedTouches[0].clientY
							: event.clientY) -
							this.canvas.parentNode.parentNode.parentNode
								.parentNode.offsetTop +
							window.scrollY -
							this.canvas.parentNode.offsetTop -
							this.canvas.parentNode.parentNode.offsetTop,
					),
					'Y',
				),
			});
			this.setAftValue(this.currentAnchor);
		}
	}

	inputEnd() {
		if (this.isDown) {
			this.outputLeft.innerHTML = `${this.round(
				this.handleL.dataset.positionX,
			)}, ${this.round(this.handleL.dataset.positionY)}`;
			this.outputRight.innerHTML = `${this.round(
				this.handleR.dataset.positionX,
			)}, ${this.round(this.handleR.dataset.positionY)}`;
			this.isDown = false;
			this.dataInfo.classList.remove('visible');
			library.checkActive();
			library.setStorage();
		}
	}

	drawAnchor() {
		this.ctx.lineWidth = 0.01;
		this.ctx.strokeStyle = '#000000';
		this.ctx.beginPath();
		this.ctx.moveTo(0, 0);
		this.ctx.lineTo(
			this.handleL.dataset.positionX,
			this.handleL.dataset.positionY,
		);
		this.ctx.moveTo(1, 1);
		this.ctx.lineTo(
			this.handleR.dataset.positionX,
			this.handleR.dataset.positionY,
		);
		this.ctx.stroke();
	}

	getBezierData() {
		return {
			l: {
				x: this.handleL.dataset.positionX,
				y: this.handleL.dataset.positionY,
			},
			r: {
				x: this.handleR.dataset.positionX,
				y: this.handleR.dataset.positionY,
			},
		};
	}

	drawCurve() {
		this.ctx.lineWidth = 0.03;
		this.ctx.strokeStyle = '#e6edf3';
		this.ctx.beginPath();
		this.ctx.moveTo(0, 0);
		this.ctx.bezierCurveTo(
			this.handleL.dataset.positionX,
			this.handleL.dataset.positionY,
			this.handleR.dataset.positionX,
			this.handleR.dataset.positionY,
			1,
			1,
		);
		this.ctx.stroke();
	}

	setBefValue(type) {
		switch (type) {
			case 'L':
				this.beforeX.innerHMTL = `${this.percentageCalc(
					this.handleL.dataset.positionX,
				)}%`;
				this.beforeY.innerHTML = `${this.percentageCalc(
					this.handleL.dataset.positionY,
				)}%`;
				break;
			case 'R':
				this.beforeX.innerHTML = `${this.percentageCalc(
					this.handleR.dataset.positionX,
				)}%`;
				this.beforeY.innerHTML = `${this.percentageCalc(
					this.handleR.dataset.positionY,
				)}%`;
				break;
		}
	}

	setAftValue(type) {
		switch (type) {
			case 'L':
				this.afterX.innerHTML = `${this.percentageCalc(
					this.handleL.dataset.positionX,
				)}%`;
				this.afterY.innerHTML = `${this.percentageCalc(
					this.handleL.dataset.positionY,
				)}%`;
				break;
			case 'R':
				this.afterX.innerHTML = `${this.percentageCalc(
					this.handleR.dataset.positionX,
				)}%`;
				this.afterY.innerHTML = `${this.percentageCalc(
					this.handleR.dataset.positionY,
				)}%`;
				break;
		}
	}

	percentageCalc(value) {
		return (Number(value) * 100).toFixed(0);
	}

	draw() {
		this.ctx.clearRect(0, -1, 1, 3);
		this.drawAnchor();
		this.drawCurve();
	}

	pythag(a, b) {
		return Math.sqrt(a * a + b * b);
	}

	changeAnchor(anchor, values) {
		switch (anchor) {
			case 'L':
				this.handleL.dataset.positionX = values.x;
				this.handleL.dataset.positionY = values.y;
				break;
			case 'R':
				this.handleR.dataset.positionX = values.x;
				this.handleR.dataset.positionY = values.y;
				break;
		}
	}

	loadBezierData(type, values) {
		this.changeHandlesClamped(type, values);
		this.changeAnchor(type, values);
		this.draw();
	}

	loadDualBezierData(values) {
		this.loadBezierData('L', values.l);
		this.loadBezierData('R', values.r);
	}

	changeHandlesClamped(handle, values) {
		switch (handle) {
			case 'L':
				this.handleL.style.left = `${
					values.x * this.canvas.offsetWidth
				}px`;
				this.handleL.style.top = `${
					(-values.y / 2 + 3 / 4) * this.canvas.offsetHeight
				}px`;
				break;
			case 'R':
				this.handleR.style.left = `${
					values.x * this.canvas.offsetWidth
				}px`;
				this.handleR.style.top = `${
					(-values.y / 2 + 3 / 4) * this.canvas.offsetHeight
				}px`;
				break;
		}
	}

	setBezier(event) {
		let coordArray = event.srcElement.value.match(/(\d+)(\.\d+)*/g) || [];
		if (coordArray.length >= 4) {
			this.loadBezierData('L', {
				x: this.clamp(coordArray[0], 'X'),
				y: this.clamp(coordArray[1], 'Y'),
			});
			this.loadBezierData('R', {
				x: this.clamp(coordArray[2], 'X'),
				y: this.clamp(coordArray[3], 'Y'),
			});
			this.setAftValue('L');
			this.setBefValue('R');
		}
	}
}

class miniCurve {
	constructor(values, button) {
		this.bezierValues = values;
		this.canvas = button.children[0];
		this.button = button;
		this.ctx = canvas.getContext('2d');
	}

	init() {
		this.canvas.height = this.canvas.offsetHeight;
		this.canvas.width = this.canvas.offsetWidth;
		this.ctx.scale(this.canvas.width / 2, -this.canvas.height / 2);
		this.ctx.translate(0.5, -1.5);
		this.draw();
		setTimeout(() => {
			this.button.classList.add('active');
		}, 10);
	}

	setSelected(bool) {
		if (bool) {
			this.button.classList.add('selected');
		} else {
			this.button.classList.remove('selected');
		}
	}

	setCurveData(values) {
		this.bezierValues = values;
	}

	getCurveData() {
		return this.bezierValues;
	}

	getCurveButton() {
		return this.button;
	}

	draw() {
		this.ctx.clearRect(-1, -1, 3, 3);
		this.ctx.lineWidth = 0.09;
		this.ctx.lineCap = 'round';
		this.ctx.strokeStyle = '#e6edf3';
		this.ctx.beginPath();
		this.ctx.moveTo(0, 0);
		this.ctx.bezierCurveTo(
			this.bezierValues.l.x,
			this.bezierValues.l.y,
			this.bezierValues.r.x,
			this.bezierValues.r.y,
			1,
			1,
		);
		this.ctx.stroke();
	}
}

class curveLibrary {
	constructor() {
		this.libraryElement = document.getElementById('library');
		this.library = [];
		this.bezierCurve = new curveGraph();
		this.bezierCurve.init();
		this.addButton = document.getElementById('addLibrary');
		this.popup = new PAS();
		this.activeCurve;
	}

	init() {
		this.bezierCurve.draw();
		this.loadStorage();
		this.addButton.addEventListener('click', () => {
			this.createItem(this.bezierCurve.getBezierData());
			this.setStorage();
		});
	}

	addPopup(data) {
		this.popup.add(data);
	}

	loadStorage() {
		let storage = localStorage.getItem('curveLibrary');
		if (storage && storage.split(',').length >= 4) {
			storage = storage.split(',');
			for (let i = 0; i < storage.length; i += 4) {
				this.createItem({
					l: {
						x: storage[i],
						y: storage[i + 1],
					},
					r: {
						x: storage[i + 2],
						y: storage[i + 3],
					},
				});
			}
		}
	}

	generateStorage() {
		let storage = [];
		this.library.forEach((curve) => {
			let data = curve.getCurveData();
			storage.push([data.l.x, data.l.y, data.r.x, data.r.y]);
		});
		return storage;
	}

	setStorage() {
		localStorage.setItem('curveLibrary', this.generateStorage());
	}

	selectCurve(curve) {
		this.bezierCurve.loadDualBezierData(curve.getCurveData());
		let button = curve.getCurveButton();
		for (let i = 0; i < this.library.length; i++) {
			if (button == this.library[i].getCurveButton()) {
				this.library[i].setSelected(true);
				this.activeCurve = curve;
				console.log(curve.getCurveData());
			} else {
				this.library[i].setSelected(false);
			}
		}
	}

	removeCurve(button) {
		for (let i = 0; i < this.library.length; i++) {
			if (button.parentNode == this.library[i].getCurveButton()) {
				button.parentNode.remove();
				this.library.splice(i, 1);
				break;
			}
		}
		this.setStorage();
	}

	checkActive() {
		if (this.activeCurve) {
			this.activeCurve.setCurveData(this.bezierCurve.getBezierData());
			this.activeCurve.draw();
		}
	}

	createItem(curveValues) {
		let curve = new miniCurve(curveValues);
		curve.init();

		this.libraryElement.appendChild(
			SEC.jsonElementify({
				tag: 'span',
				classes: ['library-button'],
				children: [
					{
						tag: 'canvas',
					},
					{
						tag: 'span',
						classes: ['click-panel'],
						events: {
							click: {
								callback: this.selectCurve.bind(this),
								param: curve,
							},
						},
					},
					{
						tag: 'div',
						classes: ['remove-button'],
						events: {
							callback: this.removeCurve.bind(this),
							param: 'self',
						},
						children: [
							{
								tag: 'IS',
								attributes: { name: 'cross' },
							},
						],
					},
				],
			}),
		);
		this.library.push(curve);
	}

	export() {
		navigator.clipboard.writeText(this.generateStorage());
	}

	import() {}
}

window.addEventListener('DOMContentLoaded', function () {
	let library = new curveLibrary();
	library.init();

	for (const box of document.getElementsByClassName('copy-box')) {
		box.addEventListener('click', function () {
			navigator.clipboard.writeText(this.innerText);
			library.addPopup({
				message: 'bezier copied to clipboard',
				icon: 'copy',
				duration: 2000,
				noRepeat: true,
			});
		});
	}
});
