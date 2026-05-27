import { render } from '../../apis/encore/element-creator.js';

export default function Render(pageFn, layoutFn) {
	return () => {
		render(
			document.body,
			(settings) => {
				settings.layout = layoutFn;

				return pageFn();
			},
			{
				useIcons: true,
				awaitPageLoad: false,
			},
		);
	};
}
