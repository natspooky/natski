import {
	useState,
	useSuspense,
	useRef,
	useId,
} from '../../../apis/encore/element-creator.js';
import Img from '../ui/img.js';

function ClickImage({ src, height, width, alt, style, attributes, ...props }) {
	let image;

	const [imageState, , setImageState] = useState(
		(get) => {
			return get;
		},
		{
			tag: 'div',
			style,
			onAppend: {
				callback: (self) => {
					image = Img({
						src,
						height: height ?? self.offsetHeight,
						width: width ?? self.offsetWidth,
						alt,
						attributes,
						style,
						...props,
					});
					setImageState(
						useSuspense(
							() => {
								return image;
							},
							{
								tag: 'div',
								style,
							},
						),
					);
				},
				options: {
					awaitFontLoad: true,
				},
			},
		},
	);

	return [
		useSuspense(() => {
			return image;
		}, {}),
	];
}
