import IS from './image_components/IS.js';
import { GradientSparkle } from './ui/backgrounds.js';
import { Glass } from './ui/glass.js';
import Button from './button_components/button.js';
import { useSuspense } from '../../apis/encore/element-creator.js';

export default function Header({ children }) {
	return {
		tag: 'header',
		classes: 'header',
		children: [
			GradientSparkle({ waves: true, particles: true }),
			{
				tag: 'div',
				classes: 'content-window',
				children,
				//children,
			},
		],
	};
}
