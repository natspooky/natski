console.log('eeee');

import {
	jsonElementify,
	appendChildren,
} from '../../../api/encore/element-creator/ec.min.js';
import DocsSelector from '../../components/docs/docsSelector.js';

function createLayout() {
	appendChildren(
		document.getElementsByTagName('main')[0],
		jsonElementify(DocsSelector()),
	);
}

window.addEventListener('DOMContentLoaded', createLayout());
