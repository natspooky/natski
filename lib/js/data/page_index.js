export const index = {
	'/apis': {
		name: 'APIs',
		icon: 'SSM',
	},
	'/apis/simple-canvas': {
		name: 'Simple Canvas',
		icon: 'simple_canvas',
		package: {
			version: 'V0.4',
			status: 'Ongoing',
			docs: false,
		},
	},
	'/apis/encore': {
		name: 'ENCORE',
		icon: 'ENCORE',
		package: {
			version: 'V3',
			status: 'Ongoing',
			docs: false,
		},
	},
	'/apis/encore/element-creator': {
		name: 'Element Creator',
		icon: 'apps',
		package: {
			version: 'V0.6',
			status: 'Ongoing',
			docs: true,
		},
	},
	'/apis/encore/icon-system': {
		name: 'Icon System',
		icon: 'GIS',
		package: {
			version: 'V1.0',
			status: 'Ongoing',
			docs: true,
		},
	},
	'/apis/dependencies/file-utils': {
		name: 'File Utils',
		icon: 'folder',
	},
	'/apis/dependencies/mobile-utils': {
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
	'/portfolio': {
		name: 'Portfolio',
		icon: 'avatar',
	},

	'/tools': {
		name: 'Tools',
		icon: 'gear',
	},
	'/tools/cubic-bezier': {
		name: 'Cubic Bezier',
		icon: 'bezier',
	},
	'/tools/image-formatter': {
		name: 'Image Formatter',
		icon: 'crop',
	},

	'/docs': {
		name: 'Docs',
		icon: 'document',
	},
	'/docs/apis/encore/icon-system': {
		name: 'Icon System Docs',
		icon: 'GIS',
	},
	'/docs/apis/encore/element-creator': {
		name: 'Element Creator Docs',
		icon: 'apps',
	},

	'/404': {
		name: '404: Page Not Found',
		icon: 'alert',
	},
};

export const docs = {
	'/apis/encore/icon-system': {
		install: {
			icon: 'export',
			route: '/docs/apis/encore/icon-system#burger',
		},
	},
	'/apis/encore/element-creator': {
		JsonElementify: {
			icon: 'export',
			route: '/docs/apis/encore/element-creator',
		},
		ClassName: {
			icon: 'export',
			route: '/docs/apis/encore/element-creator',
		},
		AppendChildren: {
			icon: 'export',
			route: '/docs/apis/encore/element-creator',
		},
		InsertChildrenBefore: {
			icon: 'export',
			route: '/docs/apis/encore/element-creator',
		},
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
