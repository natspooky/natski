import { className } from '../../apis/encore/element-creator.js';
import isMobile from '../../apis/dependencies/mobile-utils.js';
import LinkButton from './button_components/linkButton.js';
import Button from './button_components/button.js';
import IS from './image_components/IS.js';
import { GlassBacking } from './ui/glass.js';

export default function Nav() {
	const mobile = isMobile ? 'mobile-nav' : null;

	let transformPosY = 0;
	let lastScroll = 0;
	let scrollBuffer = 0;

	const animateOnScrollController = (self) => {
		const scroll = window.scrollY;
		const scrollDelta = lastScroll - scroll;
		const hiddenHeight = self.offsetHeight;

		lastScroll = scroll;

		scrollBuffer = Math.max(scrollBuffer - scrollDelta, 0);

		if (scrollBuffer <= 350) return;

		if (transformPosY < hiddenHeight || scrollDelta > 0) {
			transformPosY = Math.min(
				Math.max(transformPosY + scrollDelta, -hiddenHeight),
				0,
			);
		}

		const range = transformPosY / -hiddenHeight;

		if (range <= 0 && scrollDelta > 0) scrollBuffer = 0;

		self.style.translate = `0px ${transformPosY}px`;
		self.style.opacity = 1 - transformPosY / -hiddenHeight;
	};

	function MobileContent() {
		return [
			{
				tag: 'div',
				classes: 'nav-main-container',
				children: [
					Button({
						icon: 'NATSKI',
						classes: 'icon',
					}),
					{
						tag: 'div',
						attributes: {
							id: 'menuToggle',
						},
						children: [
							{
								tag: 'input',
								attributes: {
									type: 'checkbox',
									id: 'menuCheckbox',
								},
							},
							{
								tag: 'span',
							},
							{
								tag: 'span',
							},
							{
								tag: 'span',
							},
						],
					},
				],
			},
			{
				tag: 'div',
				classes: 'nav-mobile-container',
				children: [], //make it have the dropdown functionality from settings
			},
		];
	}

	function PcContent() {
		return {
			tag: 'div',
			classes: 'nav-main-container',
			children: [
				Button({
					icon: 'ENCORE',
					classes: 'icon',
				}),
			],
		};
	}

	return GlassBacking({
		blurred: true,
		active: isMobile,
		tag: 'nav',
		classes: className('navigator', mobile),
		events: {
			scroll: {
				callback: animateOnScrollController,
				param: 'self',
				target: document,
			},
		},

		children: isMobile ? MobileContent() : PcContent(),
	});
}
