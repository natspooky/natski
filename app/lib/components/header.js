import { Waves } from './ui/backgrounds.js';
import { Glass } from './ui/glass.js';
import Link from './ui/buttons/link.js';
import { useSuspense } from '../../apis/encore/element-creator.js';

export default function Header({ src, title }) {
	return {
		tag: 'header',
		classes: 'header',
		children: [
			{
				tag: 'div',
				classes: 'content-window',
				children: [
					{
						tag: 'div',
						classes: 'image-container',
						children: useSuspense(() => {
							return {
								tag: 'img',
								attributes: {
									src,
									alt: src,
								},
								onAppend: {
									callback: (self) => {
										self.classList.add('loaded');
									},
									options: {
										awaitFontLoad: true,
									},
								},
							};
						}),
					},
					Link({ href: '/home' }),
					Waves(),
				],
				//children,
			},
		],
	};
}
