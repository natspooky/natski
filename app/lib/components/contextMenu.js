import { Glass } from './ui/glass.js';
import Button from './button_components/button.js';

export default function ContextMenu({ clickTarget, blurred, hover, active }) {
	const position = {
		x: 0,
		y: 0,
	};

	const boundrySize = 10;

	let openState = false;

	const contextMenuHander = (ev, self) => {
		if (openState) return;
		ev.preventDefault();

		position.x = Math.max(
			Math.min(
				ev.clientX,
				window.innerWidth - self.offsetWidth - boundrySize,
			),
			boundrySize,
		);
		position.y = Math.max(
			Math.min(
				ev.clientY,
				window.innerHeight - self.offsetHeight - boundrySize,
			),
			boundrySize,
		);

		openState = true;

		self.style.translate = `${position.x}px ${position.y}px`;
		self.classList.add('context-menu-open');
	};

	const clickHandler = (ev, self) => {
		if (!openState) return;
		ev.preventDefault();

		if (
			self.contains(ev.target) &&
			!ev.target.classList.contains('context-action-trigger')
		)
			return;

		openState = false;

		self.classList.remove('context-menu-open');
	};

	return Glass({
		tag: 'div',
		classes: 'context-menu',
		events: {
			contextmenu: {
				callback: contextMenuHander,
				param: ['event', 'self'],
				target: clickTarget ?? document,
			},
			click: {
				callback: clickHandler,
				param: ['event', 'self'],
				target: document,
			},
		},

		hover,
		active,
		blurred,

		children: Array(12)
			.fill(0)
			.map((_, index) => {
				return {
					tag: 'button',
					classes: index === 3 ? 'context-action-trigger' : null,
					attributes: {
						style: 'position:relative;display: block; width: 100px;background:transparent;border: none; padding: 5px 0;color: rgba(255,255,255,0.87)',
					},
					children: {
						tag: 'text',
						text: 'balls',
					},
				};
			}),
	});
}
