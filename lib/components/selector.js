import Button from './button_components/button.js';

export default function selector() {
	let overlay;

	const setOverlay = (self) => {
		overlay = self;
	};

	const sizeOverlay = (left, width, scroll) => {
		overlay.style.width = width + 10 + 'px';
		overlay.style.left = `${left - 5 - scroll}px`;
	};

	const moveOverlay = (self) => {
		for (let i = 0; i < self.parentNode.children.length - 1; i++) {
			self.parentNode.children[i].classList.remove('active');
		}
		self.classList.add('active');
		sizeOverlay(
			self.offsetLeft,
			self.offsetWidth,
			self.parentNode.scrollLeft,
		);
	};

	const create = (self) => {
		setTimeout(() => {
			moveOverlay(self);
			overlay.classList.add('active');
		}, 50);
	};

	return {
		tag: 'div',
		classes: 'glass-backing selector',
		children: {
			tag: 'div',
			children: [
				Button({
					action: {
						callback: moveOverlay,
						param: 'self',
					},
					name: 'Simple Suite',
					icon: 'simple',
				}),
				Button({
					name: 'Encore Studio',
					icon: 'ENCORE',
					action: {
						callback: moveOverlay,
						param: 'self',
					},
					onAppend: {
						callback: create,
						options: {
							awaitContentLoad: true,
						},
					},
				}),
				Button({
					name: 'Arc Software',
					icon: 'ARC',
					action: {
						callback: moveOverlay,
						param: 'self',
					},
				}),

				{
					tag: 'span',
					attributes: {
						style: '--width: 0px',
					},

					classes: 'glass overlay',
					onCreate: setOverlay,
				},
			],
		},
	};
}
