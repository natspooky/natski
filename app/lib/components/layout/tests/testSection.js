function TestSection({ title, id, children }) {
	return {
		tag: 'section',
		attributes: {
			id,
		},
		style: {},
		children: [
			{
				tag: 'h1',
				style: {},
				children: title,
			},
			{
				tag: 'div',
				style: {},
				children,
			},
		],
	};
}

function TestSubSection({ title, id, children }) {
	return {
		tag: 'section',
		attributes: {
			id,
		},
		style: {},
		children: [
			{
				tag: 'h3',
				style: {},
				children: title,
			},
			{
				tag: 'div',
				style: {},
				children,
			},
		],
	};
}

export { TestSection, TestSubSection };
