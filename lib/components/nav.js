import { className } from '../../../apis/encore/element-creator/ec.js';
import isMobile from '../../../apis/dependencies/mobile-utils/mu.min.js';
import LinkButton from './button_components/linkButton.js';
import Button from './button_components/button.js';
import IS from './image_components/IS.js';
import { GlassBacking } from './ui/glass.js';

export default function Nav() {
	const mobile = isMobile ? 'mobile-nav' : null;

	let transformPosY = 0;
	let lastScroll = 0;

	const animateOnScrollController = (self) => {
		const scroll = window.scrollY;
		const scrollDelta = lastScroll - scroll;
		const hiddenHeight = self.offsetHeight;

		lastScroll = scroll;

		if (transformPosY < hiddenHeight || scrollDelta > 0) {
			transformPosY = Math.min(
				Math.max(transformPosY + scrollDelta, -hiddenHeight),
				0,
			);
		}

		self.style.translate = `0px ${transformPosY}px`;
		self.style.opacity = 1 - transformPosY / -hiddenHeight;
	};

	function MobileContent() {
		return [
			{
				tag: 'div',
				classes: 'nav-main-container',
				children: [],
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
