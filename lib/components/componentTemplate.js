export default function ComponentTemplate({
	tag,
	classes,
	events,
	attributes,
	onCreate,
	onAppend,
	children,
}) {
	return {
		tag,
		classes,
		events,
		attributes,
		onCreate,
		onAppend,
		children,
	};
}
