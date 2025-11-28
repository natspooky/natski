import {
	render,
	useState,
	useSuspense,
	useId,
	className,
	buildComponent,
	merge,
	checkEvent,
} from '../../../apis/encore/element-creator.js';
import Selector from '../../components/ui/selector.js';

function textNode(text) {
	return {
		tag: 'text',
		text: text,
	};
}

function page() {
	return [
		stateComponent,
		objectMergeTest,
		idComponent,
		classNameComponent,
		stackerTest,
		stringTest,
		suspenceComponentAnchor,
		suspenseComponentElement,
		suspenceComponentImage,
		suspenceComponentVideo,
		checkEventComponent,
	].map((component) => {
		return {
			tag: 'div',
			attributes: {
				style: 'margin-top: 20px;',
			},
			children: [
				{
					tag: 'p',
					children: textNode(component.name + ' test'),
				},
				component(),
			],
		};
	});
}

function stringTest() {
	return [textNode('textNode'), 'string text'];
}

function objectMergeTest() {
	return JSON.stringify(
		merge(
			{
				tag: 'div',
				attributes: {
					name: 'bunga',
					src: 'red',
				},
			},
			{
				attributes: {
					name: 'blue',
				},
			},
		),
	);
}

function stackerTest() {
	return [
		{
			tag: 'div',
			children: textNode('above stacker'),
		},
		[
			{
				tag: 'div',
				children: textNode('inbetween stacker'),
			},
			[
				{
					tag: 'div',
					children: textNode('double inbetween stacker'),
				},
			],
		],
		{
			tag: 'div',
			children: textNode('below stacker'),
		},
	];
}

function stateComponent() {
	return useState((number, setNumber) => {
		return {
			tag: 'button',
			events: {
				click: {
					callback: () => {
						setNumber(number + 1);
					},
				},
			},
			onCreate: () => {
				if (number === 0) setNumber(3);
			},
			children: textNode(`clicked ${number} times`),
		};
	}, 0);
}

function idComponent() {
	const linkId = useId();

	return {
		tag: 'span',
		classes: linkId,
		children: new Array(3).fill(0).map(() => {
			return {
				tag: 'p',
				classes: linkId,
				children: textNode(useId()),
			};
		}),
	};
}

function suspenseComponentElement() {
	return useSuspense(
		() => {
			return {
				tag: 'div',
				children: {
					tag: 'p',
					children: textNode('loaded!'),
				},
			};
		},
		{
			tag: 'p',
			children: textNode('loading element'),
		},
	);
}

function suspenceComponentAnchor() {
	return useSuspense(() => {
		return {
			tag: 'div',
			children: 'Anchored!',
		};
	});
}

function suspenceComponentVideo() {
	return useSuspense(
		() => {
			return {
				tag: 'div',
				children: [
					{
						tag: 'video',
						attributes: {
							src: '../../../icon/artwork/alevel_art/5.mp4',
						},
					},
				],
			};
		},
		{
			tag: 'p',
			children: textNode('loading video'),
		},
	);
}

function suspenceComponentImage() {
	return useSuspense(
		() => {
			return {
				tag: 'div',
				children: [
					{
						tag: 'img',
						attributes: {
							width: 500,
							height: 300,
							src: 'https://www.zastavki.com/pictures/1920x1200/2012/Animals_Cats_Beautiful_kitten_033169_.jpg',
						},
					},
					{
						tag: 'img',
						attributes: {
							width: 200,
							height: 300,
							src: 'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
						},
					},
				],
			};
		},
		{
			tag: 'p',
			children: textNode('loading images'),
		},
	);
}

function classNameComponent() {
	const classes = ['1 2 3', ['4', '5 6', ['7'], '8 9'], '10 11'];

	return {
		tag: 'p',
		children: className(...classes).join(' '),
	};
}

function checkEventComponent() {
	return {
		tag: 'div',
		children: [
			{
				tag: 'p',
				children: textNode('touch events: ' + checkEvent('touchstart')),
			},
			{
				tag: 'p',
				children: textNode('click events: ' + checkEvent('mousedown')),
			},
		],
	};
}

function layout({ children }) {
	return {
		tag: 'div',
		attributes: {
			style: 'margin: 20px',
		},
		children: [
			{
				tag: 'h1',
				children: textNode('Layout Component rendered'),
			},
			{
				tag: 'section',
				children,
			},
		],
	};
}

function pageSwapComponent() {
	let pageSetter;
	return [
		Selector({
			buttons: [
				{
					name: 'page one',
					active: true,
					action: {
						callback: () => pageSetter(page()),
					},
				},
				{
					name: 'page two',
					action: {
						callback: () => pageSetter(idComponent()),
					},
				},
			],
		}),
		useState((page, setPage) => {
			pageSetter = setPage;
			return {
				tag: 'div',
				children: page,
			};
		}, page()),
	];
}

render(
	'root',
	() => {
		window.components.layout = layout;

		return [...page(), ...pageSwapComponent()];
	},
	{
		useIcons: true,
	},
);
