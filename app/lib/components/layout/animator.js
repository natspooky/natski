export default function Animator({ children }, settings) {
	const inView = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('animate');
				observer.unobserve(entry.target);
			}
		});
	};

	const observer = new IntersectionObserver(inView, {
		rootMargin: '0px',
		scrollMargin: '0px',
		threshold: 1.0,
		...settings,
	});
	return {
		tag: 'div',
		onAppend: {
			callback: (self) => observer.observe(self),
			options: {
				awaitFontLoad: true,
			},
		},
		children,
	};
}
