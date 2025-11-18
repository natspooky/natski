import IS from './image_components/IS.js';
import { Waves } from './ui/backgrounds.js';
import { Glass } from './ui/glass.js';
import Button from './button_components/button.js';
import { useSuspense } from '../../apis/encore/element-creator.js';

export default function Header({ src, title }) {
	return {
		tag: 'header',
		classes: 'header',
		children: [
			//GradientSparkle({ waves: true, particles: true }),
			{
				tag: 'div',
				classes: 'content-window',
				children: [
					{
						tag: 'div',
						classes: 'image-container',
						children: {
							tag: 'img',
							attributes: {
								src,
							},
						},
					},
					Waves(),
				],
				//children,
			},
		],
	};
}
