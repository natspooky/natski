import { useSuspense } from '../../../apis/encore/element-creator.js';
import { Glass } from '../ui/glass.js';
import IS from '../image_components/IS.js';

export default function TitlePage({
	image,
	title,
	description,
	buttons,
	children,
}) {
	return [
		{
			tag: 'div',
			children: useSuspense(
				() => {
					return {
						tag: 'div',
						classes: 'image-container',
						children: [
							{
								tag: 'div',
								classes: 'colour-wheel',
							},
							{
								tag: 'img',
								attributes: {
									width: 200,
									height: 200,
									draggable: false,
									src: image,
								},
							},
						],
					};
				},
				{
					tag: 'div',
					classes: 'temp-logo',
				},
			),
		},
		{
			tag: 'h1',
			children: {
				tag: 'text',
				text: title,
			},
		},
		{
			tag: 'p',
			children: {
				tag: 'text',
				text: description,
			},
		},
		{
			tag: 'span',
			children: buttons?.map(({ name, icon, action }) => {
				return Glass({
					tag: 'button',
					hover: true,
					active: true,
					children: {
						tag: 'p',
						children: [
							{
								tag: 'text',
								text: name,
							},
							icon ? IS({ icon }) : {},
						],
					},
					events: {
						click: {
							callback: action,
						},
					},
				});
			}),
		},
		IS({
			icon: 'mini_arrow_down',
			classes: 'down-arrow',
		}),
		children,
	];
}
