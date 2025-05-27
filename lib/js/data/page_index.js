export const index = {
	'/api/simple-canvas': {
		name: 'Simple Canvas',
		icon: 'simple_canvas',
	},
	'/api/encore': {
		name: 'ENCORE',
		icon: 'ENCORE',
	},
	'/api/encore/element-creator': {
		name: 'Element Creator',
		icon: 'apps',
	},
	'/api/encore/icon-system': {
		name: 'Icon System',
		icon: 'GIS',
		package: {
			version: 'V3.0',
			status: 'Ongoing',
			docs: true,
		},
	},
	'/api/dependencies/file-utils': {
		name: 'File Utils',
		icon: 'folder',
	},
	'/api/dependencies/mobile-utils': {
		name: 'Mobile Utils',
		icon: 'phone',
	},
	'/the-cellar': {
		name: 'The Cellar',
		icon: 'cellar',
	},
	'/the-cellar/kuru-clicker': {
		name: 'Kuru Clicker',
		icon: 'point',
	},
	'/the-cellar/stratagem-hero': {
		name: 'Stratagem Hero',
		icon: 'arrow_right',
	},
	'/portfolio': {},

	'/tools': {},
	'/tools/cubic-bezier': {},
	'/tools/image-formatter': {
		name: 'Image Formatter',
		icon: 'crop',
	},

	'/licence': {
		name: 'Licence',
		icon: 'CMS',
	},

	404: {
		name: '404: Page Not Found',
		icon: 'alert',
	},
};

export const folder = {
	encore: {
		pages: ['element-creator', 'icon-system'],
	},
	dependencies: {
		pages: ['mobile-utils', 'file-utils'],
	},

	'simple-canvas': {
		pages: ['simple-canvas'],
	},
	'the-cellar': {
		pages: ['kuru-clicker', 'stratagem-hero'],
	},
	tools: {
		pages: ['cubic-bezier', 'image-formatter'],
	},
};
