import {
	render,
	useState,
	useSuspense,
	useId,
	className,
	checkEvent,
} from '../../../apis/encore/element-creator.js';

function textNode(text) {
	return {
		tag: 'text',
		text: text,
	};
}

function page() {
	return [
		stateComponent,
		idComponent,
		classNameComponent,
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
			children: textNode(`clicked ${number} times`),
		};
	}, 0);
}

function idComponent() {
	const linkId = useId();

	return {
		tag: 'span',
		classes: linkId,
		children: new Array(10).fill(0).map(() => {
			return {
				tag: 'p',
				classes: linkId,
				children: textNode(useId()),
			};
		}),
	};
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
							muted: '',
							autoplay: '',
							playsinline: '',
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
					{
						tag: 'img',
						attributes: {
							src: 'https://i.pinimg.com/originals/6f/a2/e5/6fa2e5ab9ee2db9845f4f2a6e6f7ee28.png',
							width: 300,
							height: 300,
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
		children: textNode(className(...classes).join(' ')),
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

render(
	'root',
	() => {
		window.components.layout = layout;

		return page();
	},
	{
		useIcons: true,
	},
);
