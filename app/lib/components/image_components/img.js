import { fileName } from '../../../apis/dependencies/file-utils/fu.js';

export default function Img({ src, draggable, loading, classes }) {
	const load = (self) => {
		self.classList.add('loaded');
	};

	const error = (self) => {
		self.remove();
	};

	return {
		tag: 'img',
		classes: classes,
		events: {
			load: {
				callback: load,
				param: 'self',
			},
			error: {
				callback: error,
				param: 'self',
			},
		},
		attributes: {
			alt: fileName(src),
			src: src,
			loading: loading,
			draggable: draggable,
		},
	};
}
