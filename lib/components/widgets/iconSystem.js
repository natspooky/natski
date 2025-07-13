import IS from '../image_components/IS.js';
import Button from '../button_components/button.js';

export default function IconSystem({ icon }) {
	const close = () => {
		window.parent.frameManager.removeIconSystem();
	};

	return {
		tag: 'section',
		events: {
			click: {
				callback: close,
			},
		},
		classes: 'widget widget-icon-system fadeout',
		children: [
			{
				tag: 'section',
				children: IS({
					icon: icon,
				}),
			},
			Button({
				icon: 'copy',
				name: `&lt;IS name="${icon}"&gt; &lt;/IS&gt;`,
				action: {
					callback: (self) => {
						navigator.clipboard.writeText(self.innerText);
					},
					param: 'self',
				},
			}),
		],
	};
}
