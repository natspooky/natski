import {
	jsonElementify,
	appendChildren,
} from '../../../api/encore/element-creator/ec.min.js';
import IconGrid from '../../components/encore/icon-system/iconGrid.js';

function load() {
	appendChildren(
		document.getElementsByTagName('main')[0],
		jsonElementify(IconGrid()),
	);
}

window.addEventListener('DOMContentLoaded', load);
