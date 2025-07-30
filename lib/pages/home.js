import {
	jsonElementify,
	render,
} from '../../apis/encore/element-creator/ec.min.js';
import FrameManager from '../js/IFrameManager.js';
import Footer from '../components/footer.js';
import IS from '../components/image_components/IS.js';
import LinkButton from '../components/button_components/linkButton.js';
import Button from '../components/button_components/button.js';
import Carousel from '../components/carousel_components/carousel.js';

function CarouselPage() {
	return {
		tag: 'div',
		children: [
			{
				tag: 'div',
				classes: 'hover-panel',
				children: {
					tag: 'div',
					classes: 'grid-mask',
					children: {
						tag: 'div',
						//glow behind
					},
				},
			},
		],
	};
}

function Header() {
	return {
		tag: 'header',
		classes: 'header-full',
		children: [
			{
				tag: 'div',
				classes: 'header-half dotted-bg fade-down-bg',
			},

			Carousel({
				height: '50vh',
				width: '90%',
				controls: true,
				timer: 10000,
				children: [
					CarouselPage(),
					CarouselPage(),
					CarouselPage(),
					CarouselPage(),
					CarouselPage(),
				],
			}),
			{
				tag: 'div',
				classes: 'article-container',
				children: [
					Article({
						description:
							'Simple is a frontend script collection that provies users with simple and user friendly APIs for different uses',
						title: 'Simple',
						icon: 'simple',
						link: {
							routing: {
								route: '/apis/simple',
							},
							icon: 'circle_arrow_leave',
							name: 'View',
						},
					}),
					Article({
						description:
							'ENCORE is frontend library that is used to create and distribute different components through web pages.',
						title: 'ENCORE',
						icon: 'ENCORE',
						link: {
							routing: {
								route: '/apis/encore',
							},
							icon: 'circle_arrow_leave',
							name: 'View',
						},
					}),
					Article({
						description:
							'Arc is a collection of tools used for webDev',
						title: 'ARC',
						icon: 'ARC',
						link: {
							routing: {
								route: '/apis/arc',
							},
							icon: 'circle_arrow_leave',
							name: 'View',
						},
					}),
				],
			},
		],
	};
}

function Article({ description, title, icon, link }) {
	let modal, modalTimeout;

	const openModal = (ev) => {
		if (ev && ev.stopPropagation) ev.stopPropagation();
		ev.preventDefault();
		clearTimeout(modalTimeout);

		const closeModal = (self) => {
			self.classList.remove('active');
			modalTimeout = setTimeout(() => {
				self.remove();
				modal = null;
			}, 310);
		};

		const append = (self) => {
			setTimeout(() => {
				self.classList.add('active');
			}, 10);
		};

		function Modal() {
			return {
				tag: 'section',
				classes: 'article-modal',
				events: {
					click: {
						callback: closeModal,
						param: 'self',
					},
				},
				children: {
					tag: 'div',
					children: [
						{
							tag: 'h1',
							children: {
								tag: 'text',
								text: title,
							},
						},
						{
							tag: 'span',
							children: {
								tag: 'p',
								children: {
									tag: 'text',
									text: description,
								},
							},
						},
					],
				},

				onAppend: append,
			};
		}

		if (modal) {
			modal.remove();
		}

		modal = jsonElementify(Modal());

		document.body.appendChild(modal);
	};

	const icons =
		icon && Array.isArray(icon)
			? icon.map((singleIcon) => {
					return IS({
						icon: singleIcon,
					});
			  })
			: [
					IS({
						icon: icon,
					}),
			  ];

	return LinkButton({
		...link,
		parent: true,
		classes: 'article',
		children: {
			tag: 'div',
			children: [
				{
					tag: 'div',
					classes: 'icon-container',
					children: [
						{
							tag: 'div',
							classes: 'grid-bg fade-bg',
						},
						...icons,
					],
				},
				{
					tag: 'span',
					classes: 'text-container',
					children: [
						{
							tag: 'h1',
							children: {
								tag: 'text',
								text: title,
							},
						},
						{
							tag: 'p',
							children: {
								tag: 'text',
								text: description,
							},
						},
					],
				},
				{
					tag: 'div',
					classes: 'button-container',
					children: [
						Button({
							icon: 'information',
							name: 'Info',
							action: {
								callback: openModal,
								param: 'event',
							},
						}),
					],
				},
			],
		},
	});
}

function Nav() {
	const append = (self) => {
		window.frameManager = new FrameManager(self);
	};

	return {
		tag: 'nav',
		attributes: {
			id: 'navigator',
			style: '--left: 30px; --right: 30px; --width: 47px;',
		},
		children: [
			{
				tag: 'div',
				children: {
					tag: 'section',
					classes: 'title fadeout fadein',
					children: {
						tag: 'text',
						text: 'Home',
					},
				},
			},
			{
				tag: 'span',
				classes: 'center',
			},
			{
				tag: 'span',
				classes: 'left',
			},
			{
				tag: 'span',
				classes: 'right',
			},
		],
		onAppend: append,
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
	() => {
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
			{
				tag: 'main',
			},
			Footer({
				parent: true,
			}),
			Frame(),
			{
				tag: 'section',
				attributes: {
					id: 'load',
				},
				onAppend: load,
			},
		];
	},
	{
		useIcons: true,
	},
);
