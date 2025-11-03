import IS from './image_components/IS.js';
import { GradientSparkle } from './ui/backgrounds.js';

export default function Header({ children }) {
	return {
		tag: 'header',
		classes: 'header',
		children: [
			GradientSparkle({ waves: true, particles: true }),
			{
				tag: 'div',
				classes: 'content-window',
				children: [
					IS({
						name: 'ENCORE',
					}),
					{
						tag: 'h1',
						children: {
							tag: 'text',
							text: 'ENCORE Element Creator',
						},
					},
					{
						tag: 'p',
						children: {
							tag: 'text',
							text: 'Start creating with the library of the future',
						},
					},
				],
				//children,
			},
		],
	};
}
