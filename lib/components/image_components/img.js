import { fileName } from '../../../apis/dependencies/file-utils/fu.min.js';

export default function Img({ URL, draggable, loading }) {
	const load = (self) => {
		self.classList.add('loaded');
	};

	const error = (self) => {
		self.remove();
	};

	return {
		tag: 'img',

		events: {
			load: {
				func: load,
				var: 'self',
			},
			error: {
				func: error,
				var: 'self',
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
