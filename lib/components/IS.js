export default function IS({ icon, customIcon }) {
	return {
		tag: 'IS',
		attributes: {
			name: icon,
			src: customIcon,
		},
	};
}
