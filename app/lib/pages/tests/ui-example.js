import {
	render,
	useState,
	useSuspense,
	useId,
	className,
	checkEvent,
} from '../../../apis/encore/element-creator.js';

function search() {
	const dataArr = [
		{
			title: 'Search!',
			placeholder: 'you should search',
			bIndex: 0,
		},
		{
			title: 'No Search >:(',
			placeholder: 'evil search',
			bIndex: 1,
		},
	];
	const id = useId();
	return useState(({ title, bIndex, placeholder }, setData) => {
		return {
			tag: 'div',
			children: [
				{
					tag: 'h1',
					children: title,
				},
				{
					tag: 'div',
					children: new Array(dataArr.length)
						.fill(0)
						.map((_, index) => {
							return {
								tag: 'button',
								events: {
									click: {
										callback: () => setData(dataArr[index]),
									},
								},
								classes: index === bIndex ? 'active' : '',
								children: 'button: ' + index,
							};
						}),
				},
				{
					tag: 'input',
					attributes: {
						type: 'text',
						id,
						placeholder,
					},
				},
			],
		};
	}, dataArr[0]);
}

function page() {
	return search();
}

render(
	'root',
	() => {
		return page();
	},
	{
		useIcons: true,
	},
);
