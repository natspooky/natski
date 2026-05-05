import { render } from '../../apis/encore/element-creator.js';

export default function Render(pageFn) {
	return () => {
		render('root', pageFn, {
			useIcons: true,
			awaitPageLoad: false,
		});
	};
}
