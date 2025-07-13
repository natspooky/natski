import { fileName } from '../../../apis/dependencies/file-utils/fu.min.js';

export default function Img({ URL, draggable, loading, classes }) {
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
			alt: fileName(URL),
			src: URL,
			loading: loading,
			draggable: draggable,
		},
	};
}
