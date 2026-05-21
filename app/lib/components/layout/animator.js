import isMobile from '../../../apis/dependencies/mobile-utils.js';

function Animator({ children, once = true, animClass }, timer) {
	if (isMobile) return children;

	const inView = (entries, observer) => {
		let timeout;

		entries.forEach((entry) => {
			if (entry.target) {
				if (entry.isIntersecting) {
					timeout = setTimeout(() => {
						entry.target.classList.add(animClass ?? 'animate');
					}, timer ?? 100);

					if (once) observer.disconnect();
				} else {
					if (!once) {
						clearTimeout(timeout);
						entry.target.classList.remove(animClass ?? 'animate');
					}
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
