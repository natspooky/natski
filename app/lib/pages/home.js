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
		name: 'lorem ipsum loren sample treblum',
		icon: 'simple',
		category: 'Simple',
		description: 'desc',
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

function AnimatedText(text) {
	return {
		tag: 'p',
		style: {
			'.className.animate span': {
				opacity: '1',
				transform: 'translateX(0px) scale(1)',
			},
		},
		children: text.split(' ').map((word, i) => {
			return [
				word.split('').map((letter, index) => {
					return {
						tag: 'span',
						style: {
							transition: '0.4s cubic-bezier(.47,1.53,.77,1.01)',
							position: 'relative',
							display: 'inline-block',
							opacity: '0',
							transform: 'translateX(15px) scale(0.6)',
							transitionDelay: `${(i + 1) * (index + 1) * 0.02}s`,
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
					border: '1px solid black',
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
					style: { backgroundColor: 'black', height: '100px' },
				},
			},
			{
				tag: 'h3',
				children: description,
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
