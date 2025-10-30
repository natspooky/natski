import { className } from '../../../apis/encore/element-creator.js';
import isMobile from '../../../apis/dependencies/mobile-utils.js';

function GlassBacking({ hover, active, blurred, classes, ...props }) {
	const hoverClass = hover && !isMobile ? 'glass-backing-hover' : null;
	const activeClass = active ? 'glass-backing-active' : null;
	const blurredClass = blurred ? 'blurred-bg' : null;

	return {
		classes: className('glass-backing', [
			hoverClass,
			activeClass,
			blurredClass,
			classes,
		]),
		...props,
	};
}
