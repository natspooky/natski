import {
	className,
	useState,
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
				},
				events: {
					...events,
					load: [{}, events.load],
					error: [{}, events.error],
				},
			};
		},
		loading,
		fallback,
	);
}
