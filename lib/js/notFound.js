import { render } from '../../apis/encore/element-creator/ec.min.js';
import RootLayout from '../layouts/rootLayout.js';
import LinkButton from '../components/button_components/linkButton.js';
import { index } from './data/page_index.js';

function levenshtein(s, t) {
	if (!s.length) return t.length;
	if (!t.length) return s.length;
	const arr = [];
	for (let i = 0; i <= t.length; i++) {
		arr[i] = [i];
		for (let j = 1; j <= s.length; j++) {
			arr[i][j] =
				i === 0
					? j
					: Math.min(
							arr[i - 1][j] + 1,
							arr[i][j - 1] + 1,
							arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1),
					  );
		}
	}
	return arr[t.length][s.length];
}

render(
	'root',
	(components) => {
		components.setLayout(RootLayout);

		const url = new URL(window.location.href).pathname;

		const suggestedPages = Object.entries(index)
			.filter(
				([key]) =>
					levenshtein(
						url
							.slice(url.lastIndexOf('/') + 1)
							.replace('.html', ''),
						key.slice(key.lastIndexOf('/') + 1),
					) <= 2,
			)
			.map(([key, data]) => {
				return LinkButton({
					classes: 'icon-button redirect',
					routing: {
						route: key,
					},
					icon: data.icon,
					name: data.name,
				});
			});

		return {
			tag: 'section',
			classes: 'suggested-container',
			children:
				suggestedPages.length > 0
					? [
							{
								tag: 'h1',
								innerHTML: 'Did you mean:',
							},
							{
								tag: 'section',
								children: suggestedPages,
							},
					  ]
					: [
							{
								tag: 'h1',
								innerHTML: 'Click here to return home',
							},
							{
								tag: 'section',
								children: LinkButton({
									classes: 'icon-button redirect',
									icon: 'home',
									routing: {
										route: '/',
									},
									name: 'Home',
								}),
							},
					  ],
		};
	},
	{
		useIcons: true,
	},
);
