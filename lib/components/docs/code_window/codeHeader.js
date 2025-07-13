import Button from '../../button_components/button.js';

export default function CodeHeader({ type, exportData }) {
	const animation = (self) => {};

	const copy = async (self) => {
		let textContent = '';

		const textContainer = self.parentNode.parentNode.children[1];

		textContainer.forEach((element) => {
			textContent += element.innerText + '\n';
		});

		try {
			await navigator.clipboard.writeText(textContent);
			animation(self);
		} catch (error) {
			console.error(error.message);
		}
	};

	return {
		tag: 'div',
		classes: 'code-header',
		children: [
			{
				tag: 'span',
				children: {
					tag: 'p',
					innerHTML: 'JS', //type,
				},
			},
			Button({
				classes: 'code-copy',
				icon: 'copy',
				name: 'Copy',
				action: {
					callback: copy,
					var: 'self',
				},
			}),
		],
	};
}
