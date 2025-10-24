function pageData() {
	const url = new URL(window.location.href);

	return {
		icon,
		name,
		path,
	};
}

export { pageName };
