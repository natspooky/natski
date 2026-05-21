import Section from '../components/layout/section.js';
import Banner from '../components/layout/banner.js';
import Animator from '../components/layout/animator.js';
import Code from '../components/ui/code.js';
import Button from '../components/ui/button.js';
import StandardLayout from './standardLayout.js';
import { useState } from '../../../apis/encore/element-creator.js';

function GameLayout({ children }) {
	const url = window.location.href;
	const pageName = document.title;

	const embedModalHandler = (bool) => {
		document.body.style.overflow = bool ? 'hidden' : null;
		setEmbedInfoState(bool);
	};

	const [EmbedInfoState, , setEmbedInfoState] = useState((get) => {
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
											callback: embedModalHandler,
											param: false,
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
										'.await-animate .className': {
											transition: 'opacity 0.4s',
											opacity: '0',
										},
										'.await-animate.animate .className': {
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
											width: 'min(100%, 83vw)',
											height: 'fit-content',
											overflow: 'hidden',
											display: 'block',
											margin: 'auto',
											transition:
												'transform 0.4s cubic-bezier(.47,1.53,.77,1.01), opacity 0.4s',
											'.await-animate .className': {
												opacity: '0',
												transform: 'translateY(15px)',
											},
											'.await-animate.animate .className':
												{
													opacity: '1',
													transform:
														'translateY(0px)',
												},
										},
										children: Banner({
											buttons: [
												{
													name: 'Encore',
													data: Code({
														children: `function GameIframe() { return {tag: "iframe", attributes: {src: "${url}", title: "${pageName}", loading: "lazy", height: "400", width: "600"} } }`,
													}),
												},
												{
													name: 'React',
													data: Code({
														children: `function GameIframe() { return ( <iframe src="${url}" title="${pageName}" loading="lazy" height="400" width="600" /> ); };`,
													}),
												},
												{
													name: 'Raw HTML',
													data: Code({
														children: `<iframe src="${url}" title="${pageName}" loading="lazy" height="400" width="600"></iframe>`,
													}),
												},
											],
											style: {
												margin: '0',
												aspectRatio: null,
												minHeight: '350px',
												height: 'fit-content',
												width: '100%',
											},
											layout: ({ children }) => {
												return {
													tag: 'div',
													style: {
														display: 'block',
														margin: 'auto',
														padding:
															'80px 20px 60px 20px',
														maxWidth: '100%',
													},
													children,
												};
											},
										}),
									},
								},
								100,
							),
						}),
					],
				}
			: null;
	}, false);

	return StandardLayout({
		children: [
			{
				tag: 'main',
				children: [
					children,
					Section({
						children: Button({
							style: {
								backgroundColor: 'red',
							},
							events: {
								click: {
									callback: embedModalHandler,
									param: true,
								},
							},
							children: 'Embed',
						}),
					}),
				],
			},
			EmbedInfoState,
		],
	});
}

export default GameLayout;
