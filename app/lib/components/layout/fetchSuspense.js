import {
	buildComponent,
	useState,
} from '../../../apis/encore/element-creator.js';

function FetchSuspense(url, layoutFn, loading, fallback) {
	const isFn = (item) => {
		return typeof item === 'function' ? item() : item;
	};

	const reject = () => {};

	const resolve = () => {};

	const [state, , setState] = useState((content) => {
		return content;
	}, isFn(loading));

	const fetch = fetch(url, {}).then((data) => {
		if (!data.ok) {
			setState(isFn(fallback));
			return;
		}
		setState(layoutFn(data));
	});

	return state;
}

export default FetchSuspense;
