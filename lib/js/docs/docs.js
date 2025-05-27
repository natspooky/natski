console.log('eeee');

import {
	jsonElementify,
	insertChildrenBefore,
} from '../../../api/encore/element-creator/ec.min.js';
import DocsSelector from '../../components/docs/docsSelector.js';

function createLayout() {
	insertChildrenBefore(
		document.getElementsByTagName('main')[0],
		jsonElementify(DocsSelector()),
		document.getElementsByTagName('main')[0].children[0],
	);
}

window.addEventListener('DOMContentLoaded', createLayout());
