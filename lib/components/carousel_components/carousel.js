import Button from '../button_components/button.js';

export default function Carousel({ height, width, controls, timer, children }) {
	let pageIndex = 0,
		previousPageIndex = -1,
		pages,
		thumbs,
		pageInterval;
	const MaxPageIndex = children.length - 1;

	const create = (self) => {
		pages = self.children[0].children;
		thumbs = self.children[1].children[0].children;
	};

	const load = (self) => {
		directPage(0);
		if (timer) setTimer();
	};

	const thumb = (self, index) => {
		if (timer) setTimer();
		directPage(index);
	};

	const direction = (self, directionIndex) => {
		if (timer) setTimer();
		directPage(pageIndex + directionIndex);
	};

	const directPage = (index) => {
		previousPageIndex = pageIndex;
		pageIndex = index;

		if (pageIndex < 0) {
			pageIndex = MaxPageIndex;
		} else if (pageIndex > MaxPageIndex) {
			pageIndex = 0;
		}

		if (previousPageIndex >= 0) {
			pages[previousPageIndex].classList.remove('active');
			if (thumbs) thumbs[previousPageIndex].classList.remove('active');
		}

		pages[pageIndex].classList.add('active');
		if (thumbs) thumbs[pageIndex].classList.add('active');
	};

	const setTimer = () => {
		clearInterval(pageInterval);
		pageInterval = setInterval(() => {
			directPage(pageIndex + 1);
		}, timer);
	};

	return {
		tag: 'div',
		classes: 'carousel-container',
		attributes: {
			style:
				width || height ? `height: ${height}; width: ${width}` : null,
		},
		children: [
			{
				tag: 'div',
				classes: 'page-container',
				children: children
					? children.map((elements) => {
							return {
								tag: 'section',
								classes: 'carousel-page',
								children: elements,
							};
					  })
					: {},
			},
			controls
				? {
						tag: 'div',
						classes: 'control-container',
						children: [
							{
								tag: 'section',
								classes: 'thumb-container',
								children: children.map((_, i) => {
									return Button({
										icon: 'circle',
										action: {
											callback: thumb,
											param: ['self', i],
										},
										classes: 'thumb',
									});
								}),
							},
							{
								tag: 'section',
								classes: 'selector-container',
								children: [
									Button({
										icon: 'arrow_left',
										action: {
											callback: direction,
											param: ['self', -1],
										},
										classes: 'arrow',
									}),
									Button({
										icon: 'arrow_right',
										action: {
											callback: direction,
											param: ['self', 1],
										},
										classes: 'arrow',
									}),
								],
							},
						],
				  }
				: {},
		],
		onAppend: load,
		onCreation: create,
	};
}
