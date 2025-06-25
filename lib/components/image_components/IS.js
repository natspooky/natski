export default function IS({ icon, customIcon, classes, children }) {
	return {
		tag: 'IS',
		classes: classes,
		attributes: {
			name: icon,
			src: customIcon,
		},
		children: children,
	};
}
