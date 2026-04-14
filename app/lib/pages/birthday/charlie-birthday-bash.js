import { render, useSuspense } from '../../../apis/encore/element-creator.js';
//import SimpleCanvas from '../../../apis/simple/simple-canvas.js';

import standardLayout from '../../layouts/standardLayout.js';
import Animator from '../../components/layout/animator.js';
import Header from '../../components/layout/header.js';
import Section from '../../components/layout/section.js';
import Banner from '../../components/layout/banner.js';
import Title from '../../components/layout/title.js';
import Card from '../../components/layout/card.js';
import CardContainer from '../../components/layout/cardContainer.js';
import Grid from '../../components/layout/grid.js';
import Icon from '../../components/ui/icon.js';

function Audio() {
	return {
		tag: 'audio',
		children: {
			tag: 'source',
		},
		attributes: {
			controls: '',
		},
	};
}

function Loader({ children }) {
	return useSuspense(
		() => {
			return children;
		},
		{
			tag: 'section',
			style: {
				position: 'fixed',
				height: '100vh',
				width: '100%',
				backgroundColor: 'black',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			},
			children: [
				'loading content...',
				{
					tag: 'span',
				},
			],
		},
	);
}

function BannerCardPage() {
	return {
		tag: 'div',
		children: [
			{
				tag: 'div',
				children: [{ tag: 'img' }, { tag: 'img' }],
			},
			{
				tag: 'img',
			},
		],
	};
}

function BannerOtherPage() {}

function PageOverlay() {
	const [state, getterFn, setterFn] = useState();

	return state;
}

function page() {
	return Loader({
		children: [
			Audio(),
			Banner({
				buttons: [
					{
						name: 'Birthday Card',
						data: {
							tag: 'span',
							children: 'poop',
						},
					},
					{
						name: 'Charlie Reel',
						data: {
							tag: 'span',
							children: 'poop',
						},
					},
				],
				background: {
					tag: 'div',
					style: {
						position: 'absolute',
						top: '0',
						left: '0',
						width: '100%',
						height: '100%',
						backgroundColor: 'black',
					},
				},
			}),
			//put the page state anchor in here
		],
	});
}

render('root', page, { useIcons: true });
