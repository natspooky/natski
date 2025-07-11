import {
	jsonElementify,
	appendChildren,
} from '../../../apis/encore/element-creator/ec.min.js';

function createLayout() {}

function load() {
	appendChildren(
		document.getElementsByTagName('main')[0],
		jsonElementify(createLayout()),
	);
}

window.addEventListener('DOMContentLoaded', load);
