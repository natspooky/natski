import { render } from '../../apis/encore/element-creator.js';
//import isMobile from '../../apis/dependencies/mobile-utils.js';
//import SimpleCanvas from '../../apis/simple/simple-canvas.js';
import standardLayout from '../layouts/standardLayout.js';
import Animator from '../components/layout/animator.js';
import Header from '../components/layout/header.js';
import Section from '../components/layout/section.js';
import Banner from '../components/layout/banner.js';
import Title from '../components/layout/title.js';
import Card from '../components/layout/card.js';
import Icon from '../components/ui/icon.js';

function homePageContent() {
	return [
		Section({
			children: Title({
				title: 'Natski.dev',
				description: 'home of Natski products',
				buttons: [{ name: 'Products' }, { name: 'Docs' }],
			}),
		}),

		Section({
			children: IconArray(['VPS', 'CMS', 'ENCORE', 'SSM', 'SSC']),
		}),

		Banner(
			{
				buttons: [
					{ name: 'Encore' },
					{ name: 'Simple' },
					{ name: 'Misc' },
				],
				background: {
					tag: 'div',
					style: {
						position: 'absolute',
						top: '0',
						left: '0',
						width: '100%',
						height: '100%',
						opacity: '0.5',
						backgroundImage:
							'linear-gradient(to bottom right, var(--PDS), var(--SSC), var(--VPS))',
					},
				},
			},
			{
				tag: 'span',
				style: { top: '50px' },
				children: 'loading',
			},
		),
	];
}

function IconArray(icons) {
	return {
		tag: 'section',
		style: {
			position: 'relative',
			width: '100%',
			height: 'fit-content',
			display: 'flex',
			justifyContent: 'center',
			gap: '25px',
			padding: '10px 0 0 0',
		},
		children: icons.map((icon) => {
			return Icon({
				name: icon,
				style: {
					position: 'relative',
					display: 'block',
					height: '30px',
					width: '30px',
					backgroundColor: 'var(--text-color)',
					opacity: '0.5',
					transition: '0.2s',
					':hover': {
						opacity: '1',
					},
				},
			});
		}),
	};
}

function page() {
	window.components.layout = standardLayout;

	return homePageContent();
}

render('root', page, { useIcons: true });
