import IS from './image_components/IS.js';
import { GradientSparkle } from './ui/backgrounds.js';

export default function Header({ children }) {
	return {
		tag: 'header',
		children: [
			GradientSparkle(),
			{
				tag: 'div',
				classes: 'content-window',
				children,
			},
		],
	};
}
