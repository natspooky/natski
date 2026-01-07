import { merge } from '../../../apis/encore/element-creator.js';
import { Button } from './button.js';
import Icon from './icon.js';

function Link({ href, target, children, ...props }) {
	const linkHandler = (event) => {
		event.preventDefault();
		window.open(href, target ?? '_self');
	};

	return Button(
		merge(props, {
			events: {
				click: {
					callback: linkHandler,
					param: 'event',
				},
				mouseover: {
					callback: () => {},
					param: 'event',
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
		}),
	);
}

function IconLink({ name, src, children, ...props }) {
	return Link({
		...props,
		chilren: [
			Icon({
				name,
				src,
			}),
			{
				tag: 'p',
				children,
			},
		],
	});
}

export { Link, IconLink };
