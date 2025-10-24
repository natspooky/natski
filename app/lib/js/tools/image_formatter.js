import {
	buildComponent,
	appendChildren,
} from '../../../apis/encore/element-creator/ec.min.js';
import ImageMenu from '../../components/tools/image-formatter/imageMenu.js';

function load() {
	appendChildren(
		document.getElementsByTagName('main')[0],
		buildComponent([ImageMenu()]),
	);
}

window.addEventListener('DOMContentLoaded', load);
