import Button from './button_components/button.js';
import { Glass, GlassBacking } from './ui/glass.js';

export default function selector({ buttons }) {
	let overlay;

	const setOverlay = (self) => {
		overlay = self;
	};

	const sizeOverlay = (left, width, scroll) => {
		overlay.style.width = width + 10 + 'px';
		overlay.style.translate = `${left - 5 - scroll}px 0`;
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
		moveOverlay(self);
		overlay.classList.add('active');
	};

	return GlassBacking({
		//active: true,
		//hover: true,
		tag: 'div',
		classes: 'selector',
		children: [
			...buttons.map(({ action, icon, name, active }) => {
				return Button({
					action: [
						{
							callback: moveOverlay,
							param: 'self',
						},
						action,
					],
					icon,
					name,
					onAppend: active
						? {
								callback: create,
								options: {
									awaitFontLoad: true,
								},
						  }
						: {},
				});
			}),

			Glass({
				tag: 'span',
				attributes: {
					style: '--width: 0px',
				},
				classes: 'overlay',
				onCreate: setOverlay,
			}),
		],
	});
}
