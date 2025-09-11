import { render } from '../../apis/encore/element-creator/ec.js';
import FrameManager from '../js/IFrameManager.js';
import Footer from '../components/footer.js';
import IS from '../components/image_components/IS.js';
import LinkButton from '../components/button_components/linkButton.js';
import Button from '../components/button_components/button.js';
import Selector from '../components/selector.js';

function Header() {
	return {
		tag: 'header',
		classes: 'header-full',
		children: [
			Selector({
				buttons: [
					{
						icon: 'simple',
						name: 'Simple Suite',
						action: () => {},
					},
				],
			}),
			{
				tag: 'div',
				classes: 'inset',
				children: {
					tag: 'div',
					classes: 'glass-backing',
					attributes: {
						style: 'width: 600px; height: 300px',
					},
				},
			},
		],
	};
}

function Nav() {
	return {
		tag: 'nav',
		classes: 'navigator',
		attributes: {
			id: 'navigator',
		},
		children: [
			{
				tag: 'div',
				classes: 'glass-backing blurred-bg',
				children: {
					tag: 'section',
					classes: 'title fadeout fadein',
					children: {
						tag: 'text',
						text: 'Home',
					},
				},
			},
		],
		onAppend: {
			callback: (self) => (window.frameManager = new FrameManager(self)),
			options: {
				awaitContentLoad: true,
			},
		},
	};
}

function Frame() {
	return {
		tag: 'div',
		classes: 'embedded-frame',
		attributes: {
			id: 'embedded-frame',
		},
		children: {
			tag: 'iframe',
			attributes: {
				id: 'iframe',
			},
		},
	};
}

render(
	'root',
	(components) => {
		const load = (self) => {
			setTimeout(() => {
				self.classList.add('loaded');
				setTimeout(() => {
					self.remove();
				}, 800);
			}, 30);
		};

		return [
			Nav(),
			Header(),

			Footer({
				parent: true,
			}),
			Frame(),
		];
	},
	{
		useIcons: true,
	},
);
