import { className } from '../../../apis/encore/element-creator/ec.js';
import isMobile from '../../../apis/dependencies/mobile-utils/mu.js';

function Glass({ hover, active, blurred, classes, ...props }) {
	const hoverClass = hover && !isMobile ? 'glass-hover' : null;
	const activeClass = active ? 'glass-active' : null;
	const blurredClass = blurred ? 'blurred-bg' : null;

	return {
		classes: className('glass', [
			hoverClass,
			activeClass,
			blurredClass,
			classes,
		]),
		...props,
	};
}

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

export { Glass, GlassBacking };
