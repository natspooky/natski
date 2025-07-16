import Button from '../button_components/button.js';
import IS from '../image_components/IS.js';
import {
	fileName,
	MIME,
	checkMediaType,
} from '../../../apis/dependencies/file-utils/fu.min.js';
import { jsonElementify } from '../../../apis/encore/element-creator/ec.min.js';

export default function VideoPlayer({ srcSet, poster, controls }) {
	let container, video, controlPanel;

	const append = () => {};

	//populate data?
	const create = (self) => {
		container = self;
		video = self.children[0];
		controlPanel = self.children[1];
	};

	const error = (self) => {
		self.replaceWith(
			jsonElementify({
				tag: 'span',
				classes: 'error',
				children: [
					IS({
						icon: 'alert',
					}),
					{
						tag: 'p',
						children: {
							tag: 'text',
							text: 'There was a problem loading the video...',
						},
					},
				],
			}),
		);

		if (controls) {
			controlPanel.remove();
		}
	};

	const openSettings = (self) => {};

	return {
		tag: 'video-container',
		events: {
			mousemove: {},
			mouseleave: {},
			fullscreenchange: {},
		},
		children: [
			{
				tag: 'video',
				events: {
					error: {
						callback: error,
						param: 'self',
					},
					abort: {},
					canplay: {},
					canplaythrough: {},
					durationchange: {},
					emptied: {},
					encrypted: {},
					ended: {
						callback: ended,
						param: 'self',
					},
					interruptbegin: {},
					interruptend: {},
					loadeddata: {},
					loadedmetadata: {},
					loadstart: {},
					mozaudioavailable: {},
					pause: {},
					play: {},
					playing: {},
					progress: {},
					ratechange: {},
					seeked: {},
					seeking: {},
					stalled: {},
					suspend: {},
					timeupdate: {},
					volumechange: {},
					waiting: {},
				},
				attributes: {
					tabindex: '-1',
					poster,
				},
				children: [
					srcSet
						.filter((src) => checkMediaType(src, 'video'))
						.map((src) => {
							return {
								tag: 'source',
								attributes: {
									src: src,
									type: MIME(src),
								},
							};
						}),
					trackSet
						.filter((src) => checkMediaType(src, 'sub'))
						.map((src) => {
							return {
								tag: 'track',
								attributes: {
									src: src,
									srclang: 1,
									label: 2,
									kind: 2,
								},
							};
						}),
				],
			},
			{
				tag: 'section',
				classes: 'overlay',
				children: [],
			},
		],
		onAppend: append,
		onCreation: create,
	};
}
