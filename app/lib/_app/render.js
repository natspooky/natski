import { render } from '../../apis/encore/element-creator.js';

export default function Render(pageFn) {
	return () => {
		render(document.body, pageFn, {
			useIcons: true,
			awaitPageLoad: false,
		});
	};
}
