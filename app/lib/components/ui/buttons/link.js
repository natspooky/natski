import Button from './button.js';

export default function Link({ href, target, children, ...props }) {
	const linkHandler = (event) => {
		event.preventDefault();
		window.open(href, target ?? '_self');
	};

	return Button({
		...props,
		events: {
			click: {
				callback: linkHandler,
				params: 'event',
			},
		},
		children: {
			tag: 'a',
			attributes: {
				tabindex: -1,
				draggable: false,
				href,
			},
			children,
		},
	});
}
