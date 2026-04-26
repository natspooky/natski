import {
	className,
	useState,
	createPortal,
} from '../../../apis/encore/element-creator.js';
import isMobile from '../../../apis/dependencies/mobile-utils.js';
import Icon from '../ui/icon.js';

function Popup({ children }) {
	createPortal({});

	return {
		tag: 'button',
		c,
	};
}

export default Popup;
