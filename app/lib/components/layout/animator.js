export default function Animator({ children }, settings) {
	const inView = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				setTimeout(() => {
					if (entry.target) entry.target.classList.add('animate');
				}, 250);

				observer.unobserve(entry.target);
			}
		});
	};

	const observer = new IntersectionObserver(inView, {
		rootMargin: '0px',
		scrollMargin: '0px',
		threshold: 0.01,
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
