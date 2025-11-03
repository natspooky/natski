import {
	render,
	useState,
	useSuspense,
	useId,
	className,
	checkEvent,
} from '../../../apis/encore/element-creator.js';
import RootLayout from '../../layouts/rootLayout.js';
import IS from '../../components/image_components/IS.js';

function page() {
	return [];
}

function header() {
	return;
}

render(
	'root',
	() => {
		window.components.layout = RootLayout;

		return page();
	},
	{
		useIcons: true,
		awaitPageLoad: true,
	},
);
