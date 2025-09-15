import { className } from '../../../apis/encore/element-creator/ec.js';
import isMobile from '../../../apis/dependencies/mobile-utils/mu.min.js';

function Glass({
	hover,
	active,
	blurred,
	classes,
	children,
	tag,
	onAppend,
	onCreate,
	events,
}) {
	const hoverClass = hover && !isMobile ? 'glass-hover' : null;
	const activeClass = active ? 'glass-active' : null;
	const blurredClass = blurred ? 'blurred-bg' : null;

	return {
		tag,
		classes: className('glass', [
			hoverClass,
			activeClass,
			blurredClass,
			classes,
		]),
		children,
		onAppend,
		onCreate,
		events,
	};
}

function GlassBacking({
	hover,
	active,
	blurred,
	classes,
	children,
	tag,
	attributes,
	onAppend,
	onCreate,
	events,
}) {
	const hoverClass = hover && !isMobile ? 'glass-backing-hover' : null;
	const activeClass = active ? 'glass-backing-active' : null;
	const blurredClass = blurred ? 'blurred-bg' : null;

	return {
		tag,
		classes: className('glass-backing', [
			hoverClass,
			activeClass,
			blurredClass,
			classes,
		]),
		children,
		attributes,
		onAppend,
		onCreate,
		events,
	};
}

export { Glass, GlassBacking };
