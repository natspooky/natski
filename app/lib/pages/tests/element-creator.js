import {
	render,
	useState,
	useSuspense,
	useId,
	className,
	merge,
	appendChildren,
	insertChildrenBefore,
	insertChildrenAfter,
	buildComponent,
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
			style: {
				borderRadius: '10px',
				display: 'inline-block',
			},
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
				borderRadius: '10px',
				padding: '15px',
				margin: '5px',
				backgroundColor: '#00000020',
				transition: '0.2s',
				':hover': {
					border: '1px solid black',
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
		'https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0fGVufDB8fDB8fHww',
		'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
	],
	video: ['../../../icon/artwork/alevel_art/5.mp4'],
	audio: ['https://samplelib.com/mp3/sample-3s.mp3'],
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

	return [
		StateTest,
		SuspenseTest,
		ComponentAppendTests,
		MergeTests,
		MiscTests,
	].map((component) => {
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

	function embededStateTest() {
		const [embed] = useState((getter, setter) => {
			return BUTTON({
				children: `Click counter 2: ${getter}`,
				events: { click: { callback: () => setter(getter + 1) } },
			});
		}, 0);

		const [element] = useState((getter, setter) => {
			return {
				tag: 'div',
				children: [
					BUTTON({
						children: `Click counter 1: ${getter}`,
						events: {
							click: { callback: () => setter(getter + 1) },
						},
					}),
					embed,
				],
			};
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
				children: getter,
			};
		}, 1);

		const interval = setInterval(() => {
			setFn(getFn() + 1);
			if (getFn() === 500) {
				clearInterval(interval);
				setFn('500 cycles completed');
			}
		}, 10);

		return [state];
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
		embededStateTest,
		IntervalTest,
		PageObjectRepeatTest,
		PageValueRepeatTest,
		ChangeStateOnCreateTest,
		TextOnlyTest,
		FragmentTest,
		AnchorTest,
	};
}

function ComponentAppendTests() {
	function AppendChildrenSingleTest() {
		const element = buildComponent(
			DIV({ children: P({ children: 'First Child' }) }),
		);

		const children = buildComponent(P({ children: 'Second child' }));

		appendChildren(element, children);

		return element;
	}

	function AppendChildrenMultiTest() {
		const element = buildComponent(
			DIV({ children: P({ children: 'First Child' }) }),
		);

		const children = buildComponent([
			P({ children: 'Second child' }),
			P({ children: 'Third child' }),
			P({ children: 'Fourth child' }),
		]);

		appendChildren(element, children);

		return element;
	}

	function AppendChildrenBeforeSingleTest() {
		const element = buildComponent(
			DIV({ children: P({ children: 'First Child' }) }),
		);

		const beforeEl = buildComponent(P({ children: 'Before El Anchor' }));

		const children = buildComponent(P({ children: 'Second child' }));

		appendChildren(element, [
			beforeEl,
			buildComponent(P({ children: 'Last Child' })),
		]);

		insertChildrenBefore(element, children, beforeEl);

		return element;
	}

	function AppendChildrenBeforeMultiTest() {
		const element = buildComponent(
			DIV({ children: P({ children: 'First Child' }) }),
		);

		const beforeEl = buildComponent(P({ children: 'Before El Anchor' }));

		const children = buildComponent([
			P({ children: 'Second child' }),
			P({ children: 'Third child' }),
			P({ children: 'Fourth child' }),
		]);

		appendChildren(element, [
			beforeEl,
			buildComponent(P({ children: 'Last Child' })),
		]);

		insertChildrenBefore(element, children, beforeEl);

		return element;
	}

	function AppendChildrenAfterSingleTest() {
		const element = buildComponent(
			DIV({ children: P({ children: 'First Child' }) }),
		);

		const afterEl = buildComponent(P({ children: 'After El Anchor' }));

		const children = buildComponent(P({ children: 'Second child' }));

		appendChildren(element, [
			afterEl,
			buildComponent(P({ children: 'Last Child' })),
		]);

		insertChildrenAfter(element, children, afterEl);

		return element;
	}

	function AppendChildrenAfterLastChildTest() {
		const element = buildComponent(
			DIV({ children: P({ children: 'First Child' }) }),
		);

		const afterEl = buildComponent(P({ children: 'After El Anchor' }));

		const children = buildComponent([
			P({ children: 'Second child' }),
			P({ children: 'Third child' }),
			P({ children: 'Fourth child' }),
		]);

		appendChildren(element, afterEl);

		insertChildrenAfter(element, children, afterEl);

		return element;
	}

	function AppendChildrenAfterMultiTest() {
		const element = buildComponent(
			DIV({ children: P({ children: 'First Child' }) }),
		);

		const afterEl = buildComponent(P({ children: 'After El Anchor' }));

		const children = buildComponent([
			P({ children: 'Second child' }),
			P({ children: 'Third child' }),
			P({ children: 'Fourth child' }),
		]);

		appendChildren(element, [
			afterEl,
			buildComponent(P({ children: 'Last Child' })),
		]);

		insertChildrenAfter(element, children, afterEl);

		return element;
	}

	return {
		AppendChildrenSingleTest,
		AppendChildrenMultiTest,
		AppendChildrenBeforeSingleTest,
		AppendChildrenBeforeMultiTest,
		AppendChildrenAfterSingleTest,
		AppendChildrenAfterLastChildTest,
		AppendChildrenAfterMultiTest,
	};
}

function SuspenseTest() {
	function container(children) {
		return {
			tag: 'div',
			style: {
				height: '100px',
				width: 'fit-content',
				overflow: 'hidden',
			},
			children,
		};
	}

	function ImageTest() {
		return [
			container(
				useSuspense(() => {
					return IMG({ attributes: { src: testData.image[0] } });
				}, 'loading image'),
			),
			container(
				useSuspense(() => {
					return IMG({
						attributes: { src: testData.image[0] },
						style: {
							background: 'red',
						},
					});
				}, 'loading image'),
			),
		];
	}

	function LazyImageTest() {
		return container(
			useSuspense(() => {
				return IMG({
					attributes: { src: testData.image[0], loading: 'lazy' },
				});
			}, 'loading image'),
		);
	}

	function MultiImageTest() {
		return container(
			useSuspense(() => {
				return [
					IMG({ attributes: { src: testData.image[0] } }),
					IMG({ attributes: { src: testData.image[1] } }),
				];
			}, 'loading images'),
		);
	}

	function VideoTest() {
		return container(
			useSuspense(() => {
				return VIDEO({ attributes: { src: testData.video[0] } });
			}, 'loading video'),
		);
	}

	function LazyVideoTest() {
		return container(
			useSuspense(() => {
				return VIDEO({
					attributes: { src: testData.video[0], loading: 'lazy' },
				});
			}, 'loading video'),
		);
	}

	function MultiVideoTest() {
		return container(
			useSuspense(() => {
				return [
					VIDEO({ attributes: { src: testData.video[0] } }),
					VIDEO({ attributes: { src: testData.video[0] } }),
				];
			}, 'loading videos'),
		);
	}

	function AudioTest() {
		return container(
			useSuspense(() => {
				return {
					tag: 'audio',
					attributes: { src: testData.audio[0], controls: '' },
				};
			}, 'loading audio'),
		);
	}

	function LazyAudioTest() {
		return container(
			useSuspense(() => {
				return {
					tag: 'audio',
					attributes: {
						src: testData.audio[0],
						controls: '',
						loading: 'lazy',
					},
				};
			}, 'loading audio'),
		);
	}

	function MultiAudioTest() {
		return container(
			useSuspense(() => {
				return [
					{
						tag: 'audio',
						attributes: { src: testData.audio[0], controls: '' },
					},
					{
						tag: 'audio',
						attributes: { src: testData.audio[0], controls: '' },
					},
				];
			}, 'loading audio'),
		);
	}

	function NonLoadableSuspence() {
		return useSuspense(() => {
			return dummyText();
		}, 'loading text');
	}

	function NonLoadableMultipleSuspence() {
		return useSuspense(() => {
			return [dummyText(), dummyText()];
		}, 'loading texts');
	}

	return {
		ImageTest,
		LazyImageTest,
		MultiImageTest,
		VideoTest,
		LazyVideoTest,
		MultiVideoTest,
		AudioTest,
		LazyAudioTest,
		MultiAudioTest,
		NonLoadableSuspence,
		NonLoadableMultipleSuspence,
	};
}

/*
function ContextTests() {


	function 

	return {}
}*/

function MergeTests() {
	function ReplaceTest() {
		const obj1 = { data: 'red' };
		const obj2 = { data: 'blue' };

		return [obj1, obj2, merge({}, obj1, obj2)].map((item) => {
			return [JSON.stringify(item), { tag: 'br' }];
		});
	}

	function ArrayTest() {
		const obj1 = {
			data: [],
			otherData: 3,
			nullerData: [400],
		};
		const obj2 = { data: 7, otherData: [30], nullData: [100] };

		return [obj1, obj2, merge({}, obj1, obj2)].map((item) => {
			return [JSON.stringify(item), { tag: 'br' }];
		});
	}

	function EmbeddedObjectTest() {
		const obj1 = {
			data: {
				otherData: 'green',
				extraOtherData: {
					data: 'blue',
				},
			},
		};
		const obj2 = {
			data: {
				otherData: 'red',
				extraOtherData: {
					data: 'black',
				},
			},
		};

		return [obj1, obj2, merge({}, obj1, obj2)].map((item) => {
			return [JSON.stringify(item), { tag: 'br' }];
		});
	}

	return {
		ReplaceTest,
		ArrayTest,
		EmbeddedObjectTest,
	};
}

function MiscTests() {
	function StyleTest() {
		return {
			tag: 'div',
			style: {
				background: 'red',
				padding: '10px',
				width: 'fit-content',
				':hover': { background: 'blue' },
				':active': { background: 'purple' },
				'::before': { content: `'beforeEl. '` },
				'::after': { content: `' afterEl.'` },
				':not(.className)': { background: 'green' },
			},
			children: [
				'text in div. ',
				{
					tag: 'span',
					children: 'text in span.',
				},
			],
		};
	}

	function ErrorTests() {
		return {};
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
				{
					tag: 'span',
					children: useId(),
				},
				{ tag: 'br' },
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
		ErrorTests,
		EmbedArrayTest,
		ClassnameTest,
		checkEventTest,
		IdTest,
		PortalTest,
	};
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
		awaitPageLoad: true,
	},
);
