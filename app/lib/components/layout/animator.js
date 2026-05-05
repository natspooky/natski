function Animator({ children, once = true }, timer) {
	const inView = (entries, observer) => {
		let timeout;

		entries.forEach((entry) => {
			if (entry.target) {
				if (entry.isIntersecting) {
					timeout = setTimeout(() => {
						entry.target.classList.add('animate');
					}, timer ?? 100);

					if (once) observer.unobserve(entry.target);
				} else {
					clearTimeout(timeout);
					entry.target.classList.remove('animate');
				}
			}
		});
	};

	const observer = new IntersectionObserver(inView, {
		rootMargin: '0px',
		scrollMargin: '0px',
		threshold: 0.06,
	});
	return {
		tag: 'div',
		classes: 'await-animate',
		onAppend: {
			callback: (self) => observer.observe(self),
			options: {
				awaitFontLoad: true,
			},
		},
		children,
	};
}

export default Animator;
