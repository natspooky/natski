import {
	buildComponent,
	useState,
} from '../../../apis/encore/element-creator.js';

function FetchSuspense() {
	const [state] = useState(() => {});

	return state;
}

export default FetchSuspense;
