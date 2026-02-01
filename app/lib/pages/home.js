import {
	render,
	className,
	useState,
} from '../../apis/encore/element-creator.js';
import standardLayout from '../layouts/standardLayout.js';
import Marquee from '../components/ui/marquee.js';
import { Link } from '../components/ui/link.js';
import { Img } from '../components/ui/img.js';
import Icon from '../components/ui/icon.js';

const pageData = [
	{
		name: 'Element Creator',
		icon: 'ENCORE',
		category: 'Encore',
		description: 'desc',
		links: { href: '' },
	},
	{
		name: 'Icon System',
		icon: 'ENCORE',
		category: 'Encore',
		description: 'desc',
		links: { href: '' },
	},
	{
		name: 'Simple Canvas',
		icon: 'simple',
		category: 'Simple',
		description: 'desc',
		links: { href: '' },
	},
	{
		name: 'Lorem Thingy',
		icon: 'simple',
		category: 'Simple',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		links: { href: '' },
	},
];

function AnimateWrapper(obj) {
	return {
		tag: 'ec-fragment',
		children: obj,
		onAppend: {
			callback: (self) => {
				self.classList.add('animate');
			},
			options: {
				awaitFontLoad: true,
			},
		},
	};
}

function AnimatedText(text, extra = 0) {
	let counter = 0;
	return {
		tag: 'ec-fragment',
		style: {
			'.className.animate span': {
				opacity: '1',
				transform: 'translateX(0px) scale(1)',
			},
		},
		children: text.split(' ').map((word, _, arr) => {
			return [
				word.split('').map((letter, index) => {
					counter += 1;
					return {
						tag: 'span',
						style: {
							transition: '0.4s cubic-bezier(.47,1.53,.77,1.01)',
							position: 'relative',
							display: 'inline-block',
							opacity: '0',
							transform: 'translateX(15px) scale(0.2)',
							transitionDelay: `${(index + counter) * ((arr.length > 20 ? 0.004 : 0.01) + extra)}s`,
						},
						children: letter,
					};
				}),
				' ',
			];
		}),
		onAppend: {
			callback: (self) => {
				self.classList.add('animate');
			},
			options: {
				awaitFontLoad: true,
			},
		},
	};
}

function CenterStage() {
	const [buttonArr] = useState((get, set) => {
		function Button({ name, icon }, index, active) {
			const textCol = 'white';
			return {
				tag: 'button',
				children: [
					Icon({
						name: icon,
						style: {
							display: 'block',
							width: '15px',
							height: '15px',
							backgroundColor: textCol,
							marginRight: '5px',
						},
					}),
					{
						tag: 'span',
						style: {
							color: textCol,
						},
						children: name,
					},
				],
				style: {
					backgroundColor: active ? 'black' : 'red',
					display: 'flex',
					alignItems: 'center',
					padding: '10px 20px',
					borderRadius: '20px',
					fontWeight: 'bold',
					border: '1px solid transparent',
					transition: '0.2s',
					':hover': {
						transition: '0s',
						border: '1px solid white',
					},
				},
				events: {
					click: {
						callback: () => {
							setCenterStage(pageData[index]);
							set(index);
						},
					},
				},
			};
		}

		return {
			tag: 'div',
			style: {
				gap: '10px',
				display: 'flex',
			},
			children: pageData.map((obj, index) => {
				if (get === index) return Button(obj, index, true);
				return Button(obj, index, false);
			}),
		};
	}, 0);
	const [currentPage, , setCenterStage] = useState((get) => {
		return CenterStageLayout(get);
	}, pageData[0]);

	return {
		tag: 'div',
		children: [
			{
				tag: 'div',
				children: [buttonArr, currentPage],
			},
		],
	};
}

function CenterStageLayout({ name, description }) {
	return {
		tag: 'div',
		children: [
			{
				tag: 'h1',
				children: AnimatedText(name),
			},
			{
				tag: 'div',
				children: {
					tag: 'span',
					children: 'IMG PALCEHOLDER',
					style: {
						backgroundColor: 'black',
						height: '50vh',
						display: 'block',
						position: 'relative',
					},
				},
			},
			{
				tag: 'h3',
				children: AnimatedText(description),
			},
		],
	};
}

render(
	'root',
	() => {
		window.components.layout = standardLayout;

		return CenterStage();
	},
	{
		useIcons: true,
	},
);
/*
function AnimateWrapper(obj) {
	return {
		tag: 'ec-fragment',
		children: obj,
		onAppend: {
			callback: () => {},
			options: {
				awaitFontLoad: true,
			},
		},
	};
}

function ScrollAnimateWrapper(obj) {
	const observer = new IntersectionObserver();

	return {
		tag: 'ec-fragment',
		children: obj,
	};
}*/
