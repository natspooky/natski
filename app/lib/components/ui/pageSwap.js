import {
	className,
	useState,
	merge,
} from '../../../apis/encore/element-creator.js';
import { Selector, SelectorButton } from './selector.js';

function PageSwap({ data }, pages) {
	const [pageState, getPage, setPage] = useState(() => {});

	return {
		tag: 'div',
		children: [
			pageState,
			Selector({
				style: {},
				buttons: pages.map(SelectorButton),
			}),
		],
	};
}

export default PageSwap;
