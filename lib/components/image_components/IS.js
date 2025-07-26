export default function IS({ icon, customIcon, classes, children }) {
	return {
		tag: 'icon-system',
		classes: classes,
		attributes: {
			name: icon,
			src: customIcon,
		},
		children: children,
	};
}
