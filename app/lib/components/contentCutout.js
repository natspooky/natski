import { className } from '../../apis/encore/element-creator/ec.js';

export default function ContentCutout({ children, type }) {
	const cutoutType = (type) => {
		switch (type) {
			default:
				return 0;
		}
	};

	return {
		tag: 'section',
		classes: className('cutout', cutoutType(type)),
		children,
	};
}
