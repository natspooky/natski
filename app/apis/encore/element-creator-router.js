class Router {
	#routeIndex = {};
	#prevPage;

	constructor(routes) {}

	setEventListeners() {}

	loadRoute() {}

	#routeListener(ev) {
		console.log(ev);
		if (ev != '3') {
		}
	}

	setRoute(path) {
		window.history.pushState({}, null, path);
	}
}

window.addEventListener('popstate', () => {
	if (window.location.hash.length > 2) {
		this.changeFrame(window.location.href);
	} else {
		this.closeFrame();
	}
});
