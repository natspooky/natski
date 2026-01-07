import {
	render,
	useState,
	useSuspense,
	useId,
	className,
	merge,
	checkEvent,
	createPortal,
} from '../../../apis/encore/element-creator.js';

function H1(props) {
	return { tag: 'h1', ...props };
}

function H2(props) {
	return { tag: 'h2', ...props };
}

function H3(props) {
	return { tag: 'h3', ...props };
}

function P(props) {
	return { tag: 'p', ...props };
}

function IMG(props) {
	return merge(
		{
			tag: 'img',
			attributes: {
				draggable: false,
				alt: 'test-image',
				height: 100,
				width: 100,
			},
		},
		props,
	);
}

function DIV({ children, ...props }) {
	return merge(
		{
			tag: 'div',
			style: {
				marginTop: '15px',
			},
			children,
		},
		props,
	);
}

function VIDEO(props) {
	return merge(
		{
			tag: 'video',
			attributes: {
				draggable: false,
				height: 100,
				width: 100,
			},
		},
		props,
	);
}

function BUTTON(props) {
	return merge(
		{
			tag: 'button',
			style: {
				background: 'darkgray',
				border: '2px solid gray',
				borderRadius: '100vmax',
				padding: '5px 10px',
				margin: '5px',
				transition: '0.2s',
				':hover': {
					border: '2px solid darkgray',
					background: 'gray',
					transition: '0s',
				},
			},
		},
		props,
	);
}

function BorderContainer(props) {
	return merge(
		{
			tag: 'div',
			style: {
				border: '1px solid gray',
				padding: '10px',
				transition: '0.2s',
				':hover': {
					border: '1px solid white',
					transition: '0s',
				},
			},
		},
		props,
	);
}

function dummyText() {
	const dummy =
		'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum';
	const split = dummy.split(' ');
	return split[Math.floor(Math.random() * split.length)];
}

const testData = {
	image: [
		'https://www.zastavki.com/pictures/1920x1200/2012/Animals_Cats_Beautiful_kitten_033169_.jpg',
		'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
	],
	video: ['../../../icon/artwork/alevel_art/5.mp4'],
};

function page() {
	const createName = (name) => {
		return name
			.split(/(?=[A-Z])/)
			.map((word, index) => {
				if (index !== 0) return word.toLowerCase();
				return word.slice(0, 1).toUpperCase() + word.slice(1);
			})
			.join(' ');
	};

	return [StateTest, SuspenseTest, MiscTests].map((component) => {
		const element = component();

		return DIV({
			children: BorderContainer({
				children: [
					H1({ children: createName(component.name) }),
					DIV({
						children:
							!element.tag && !Array.isArray(element)
								? Object.entries(element).map(
										([key, value]) => {
											return BorderContainer({
												children: [
													H2({
														children:
															createName(key),
													}),
													value(),
												],
											});
										},
								  )
								: element,
					}),
				],
			}),
		});
	});
}

function StateTest() {
	function IncrementTest() {
		const [element] = useState((getter, setter) => {
			return BUTTON({
				children: `Click counter: ${getter}`,
				events: { click: { callback: () => setter(getter + 1) } },
			});
		}, 0);

		return element;
	}

	function PageObjectRepeatTest() {
		function page1() {
			return H3({ children: 'this is page 1' });
		}

		function page2() {
			return H3({ children: 'this is page 2' });
		}

		const [element, , setter] = useState((getter) => {
			return getter;
		}, page1());

		return [
			BUTTON({
				children: `page 1`,
				events: { click: { callback: () => setter(page1()) } },
			}),
			BUTTON({
				children: `page 2`,
				events: { click: { callback: () => setter(page2()) } },
			}),
			element,
		];
	}

	function PageValueRepeatTest() {
		function page1() {
			return 'this is page 1';
		}

		function page2() {
			return 'this is page 2';
		}

		const [element, , setter] = useState((getter) => {
			return H3({ children: getter });
		}, page1());

		return [
			BUTTON({
				children: `page 1`,
				events: { click: { callback: () => setter(page1()) } },
			}),
			BUTTON({
				children: `page 2`,
				events: { click: { callback: () => setter(page2()) } },
			}),
			element,
		];
	}

	function ChangeStateOnCreateTest() {
		const [element, getText, setText] = useState((getter) => {
			return getter;
		}, 'fail');

		return [
			P({
				children: element,
				onCreate: () => {
					const text = 'Text state changed';
					if (getText() !== text) setText(text);
				},
			}),
		];
	}

	function IntervalTest() {
		const [state, getFn, setFn] = useState((getter) => {
			return {
				tag: 'span',
				style: {
					color: getter % 2 === 0 ? 'red' : 'pink',
				},
				children: getter,
			};
		}, 1);

		const interval = setInterval(() => {
			setFn(getFn() + 1);
		}, 100);

		return [
			state,
			BUTTON({
				children: 'stop',
				events: {
					click: {
						callback: () => {
							clearInterval(interval);
							setFn('stopped');
						},
					},
				},
			}),
		];
	}

	function TextOnlyTest() {
		const [text, , setter] = useState((getter) => {
			return getter;
		}, 'fail');

		setter('Text state changed');

		return text;
	}

	function FragmentTest() {
		const [frag, , setter] = useState((getter) => {
			return getter;
		}, new Array(10).fill(0).map(dummyText));

		setter('Fragment state changed');

		return frag;
	}

	function AnchorTest() {
		const [anchor, , setter] = useState((getter) => {
			return getter;
		});

		setter('Text anchored via state change');

		return anchor;
	}

	return {
		IncrementTest,

		IntervalTest,
		PageObjectRepeatTest,
		PageValueRepeatTest,
		ChangeStateOnCreateTest,
		TextOnlyTest,
		FragmentTest,
		AnchorTest,
	};
}

function SuspenseTest() {
	function container(children) {
		return {
			tag: 'div',
			attributes: {
				style: 'height: 100px; width: fit-content; overflow: hidden',
			},
			children,
		};
	}

	function ImageTest() {
		return container(
			useSuspense(() => {
				return IMG({ attributes: { src: testData.image[0] } });
			}),
		);
	}

	function MultiImageTest() {
		return container(
			useSuspense(() => {
				return [
					IMG({ attributes: { src: testData.image[0] } }),
					IMG({ attributes: { src: testData.image[1] } }),
				];
			}),
		);
	}

	function VideoTest() {
		return container(
			useSuspense(() => {
				return VIDEO({ attributes: { src: testData.video[0] } });
			}),
		);
	}

	function MultiVideoTest() {
		return container(
			useSuspense(() => {
				return [
					VIDEO({ attributes: { src: testData.video[0] } }),
					VIDEO({ attributes: { src: testData.video[0] } }),
				];
			}),
		);
	}

	function NonLoadableSuspence() {
		return useSuspense(() => {
			return dummyText();
		}, 'load failed');
	}

	function NonLoadableMultipleSuspence() {
		return useSuspense(() => {
			return [dummyText(), dummyText()];
		}, ['load ', 'failed']);
	}

	return {
		ImageTest,
		MultiImageTest,
		VideoTest,
		MultiVideoTest,
		NonLoadableSuspence,
		NonLoadableMultipleSuspence,
	};
}

/*
function ContextTests() {


	function 

	return {}
}*/

function MiscTests() {
	function StyleTest() {
		return {
			tag: 'div',
			style: {
				background: 'red',
				':hover': { background: 'blue' },
				':active': { background: 'purple' },
				'::before': { content: `'beforeEl'` },
				':not(.className)': { background: 'green' },
			},
			children: [
				'text in div',
				{
					tag: 'span',
					children: 'text in span',
				},
			],
		};
	}

	function EmbedArrayTest() {
		return ['one ', ['two '], 'three ', [[['four ']]]];
	}

	function ClassnameTest() {
		return [
			className('classes:', [
				'one',
				['two three'],
				'four',
				[[['five']], 'six', 'seven'],
			]).join(' '),
		];
	}

	function checkEventTest() {
		return P({
			children:
				!checkEvent('fake') && checkEvent('mousedown')
					? 'event checker working'
					: 'events broken',
		});
	}

	function IdTest() {
		return new Array(10).fill(0).map(() => {
			return [
				{ tag: 'br' },
				{
					tag: 'span',
					children: useId(),
				},
			];
		});
	}

	function PortalTest() {
		return DIV({
			onCreate: (self) => {
				createPortal('portal contents', self);
			},
		});
	}

	return {
		StyleTest,
		EmbedArrayTest,
		ClassnameTest,
		checkEventTest,
		IdTest,
		PortalTest,
	};
}

function objectMergeTest() {
	const obj1 = {
		tag: 'div',
		attributes: {
			name: 'bunga',
			src: 'red',
		},
	};

	const obj2 = {
		attributes: {
			name: 'blue',
		},
	};

	return [
		JSON.stringify(obj1),
		{ tag: 'br' },
		JSON.stringify(obj2),
		{ tag: 'br' },
		JSON.stringify(merge(obj1, obj2)),
	];
}

render(
	'root',
	() => {
		window.components.layout = ({ children }) => {
			return DIV({
				children: BorderContainer({
					children: [H1({ children: 'Layout' }), children],
				}),
				style: {
					padding: '10px',
					margin: '0px',
				},
			});
		};

		return page();
	},
	{
		useIcons: true,
	},
);
