import Footer from '../components/layout/footer.js';
import Section from '../components/layout/section.js';
import Banner from '../components/layout/banner.js';
import Animator from '../components/layout/animator.js';
import RootLayout from './rootLayout.js';
import { useState } from '../../../apis/encore/element-creator.js';

function GameLayout({ children }) {
	function codeLayout({ children }) {
		return {};
	}

	const [EmbedInfoState, , setEmbedInfoState] = useState((get) => {
		const url = window.location.href;

		return get
			? {
					tag: 'div',
					style: {
						position: 'fixed',
						top: '0',
						left: '0',
						width: '100%',
						height: '100vh',
						zIndex: '9999',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					},
					children: [
						Animator(
							{
								children: {
									tag: 'div',
									events: {
										click: {
											callback: () => {
												setEmbedInfoState(false);
											},
										},
									},
									style: {
										position: 'absolute',
										cursor: 'pointer',
										top: '0',
										left: '0',
										width: '100%',
										height: '100%',
										backgroundColor:
											'var(--text-supersub-color)',
										opacity: '0',

										transition: 'opacity 0.4s',
										'.animate .className': {
											opacity: '1',
										},
									},
								},
							},
							0,
						),
						Section({
							children: Animator(
								{
									children: {
										tag: 'div',
										style: {
											position: 'relative',
											borderRadius:
												'var(--border-radius-4)',
											cornerShape: 'var(--border-shape)',
											backgroundColor:
												'var(--background)',
											width: '100%',
											height: 'fit-content',
											overflow: 'hidden',
											opacity: '0',
											transform: 'translateY(15px)',
											transition:
												'transform 0.4s cubic-bezier(.47,1.53,.77,1.01), opacity 0.4s',
											'.animate .className': {
												opacity: '1',
												transform: 'translateY(0px)',
											},
										},
										children: Banner({
											buttons: [
												{
													name: 'Encore',
													data: codeLayout({
														children: `<iframe src="${url}" title="Natski Game"></iframe>`,
													}),
												},
												{ name: 'React' },
												{ name: 'HTML' },
												{ name: 'Share' },
											],

											style: {
												margin: '0',
												aspectRatio: null,
												height: '300px',
											},
										}),
									},
								},
								100,
							),
						}),
					],
				}
			: { tag: 'ec-anchor' };
	}, false);

	return RootLayout({
		children: [
			{
				tag: 'div',
				children: [
					{
						tag: 'main',
						children: [
							children,
							Section({
								children: {
									tag: 'button',
									events: {
										click: {
											callback: () => {
												setEmbedInfoState(true);
											},
										},
									},
									children: 'Embed',
								},
							}),
						],
					},
					Footer(),
				],
			},
			EmbedInfoState,
		],
	});
}

export default GameLayout;
