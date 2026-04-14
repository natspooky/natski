function EmbedSelector(children) {
	return {
		tag: 'div',
		onAppend: {
			callback: (self) => {
				Array.from(document.body).forEach((item, index, arr) => {
					if (index !== arr.length) {
						item.remove();
						return;
					}
					item.replaceWith(self);
				});
			},
			options: {},
		},
		children,
	};
}

export default EmbedSelector;
