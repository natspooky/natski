import { buildComponent } from '../../../apis/encore/element-creator.js';

function EmbedSelector({ children }) {
	return {
		tag: 'ec-fragment',
		onAppend: {
			callback: (self) => {
				if (
					window !== window.parent &&
					!window.location.hash.includes('noembed')
				) {
					document.body.replaceWith(
						buildComponent({
							tag: 'body',
							style: {
								'.className, html': {
									padding: '0',
									margin: '0',
									height: '100%',
									width: '100%',
									overflow: 'hidden',
								},
								'.className': {
									top: '0',
									left: '0',
								},
							},
							children: [
								self,
								{
									tag: 'a',
									attributes: {
										href: '',
										target: '_blank',
										tabIndex: '-1',
									},
									style: {
										position: 'absolute',
										bottom: '12px',
										right: '12px',
										zIndex: '999999',
										textDecoration: 'none',
										color: 'var(--text-color)',
									},
									children: 'Visit',
								},
							],
						}),
					);
				}
			},
		},
		children,
	};
}

export default EmbedSelector;
