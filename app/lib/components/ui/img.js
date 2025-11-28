import {
	className,
	useSuspense,
} from '../../../apis/encore/element-creator.js';

export default function Img({
	src,
	width,
	height,
	loading,
	fallback,
	events,
	attributes,
	classes,
	...props
}) {
	return useSuspense(
		() => {
			return {
				...props,
				tag: 'img',
				attributes: {
					...attributes,
					width,
					height,
					src,
					alt: src,
					draggable: false,
				},
				events: {
					...events,
					load: [{}, events.load],
					error: [{}, events.error],
				},
				classes: className('', classes),
			};
		},
		loading,
		fallback,
	);
}
