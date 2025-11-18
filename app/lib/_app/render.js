import { render } from '../../apis/encore/element-creator.js';

export default function Render(renderFn) {
	return () => {
		render('root', renderFn, {
			useIcons: true,
			awaitFontLoad: true,
		});
	};
}
