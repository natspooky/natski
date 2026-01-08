import {
	className,
	useId,
	merge,
} from '../../../apis/encore/element-creator.js';
import Canvas from './canvas.js';
import isMobile from '../../../apis/dependencies/mobile-utils.js';

function Glass({ ...props }) {
	return merge({ tag: 'div' }, props);
}
