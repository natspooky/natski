export default function IS({ icon, customIcon, classes }) {
	return {
		tag: 'IS',
		classes: classes,
		attributes: {
			name: icon,
			src: customIcon,
		},
	};
}
