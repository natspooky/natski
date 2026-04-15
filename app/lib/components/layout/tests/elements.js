import { useState } from '../../../../apis/encore/element-creator.js';

function Img({ style, loading, src }) {
	return {
		tag: 'img',
		style: {
			//styles
			...style,
		},
		attributes: {
			draggable: 'false',
			loading,
			src,
		},
	};
}

function Video({ style, src, loading }) {
	return {
		tag: 'video',
		style: {
			//styles
			...style,
		},
		attributes: {
			draggable: 'false',
			controls: '',
			src,
			loading,
		},
	};
}

function Audio({ style, src, loading }) {
	return {
		tag: 'audio',
		style: {
			//styles
			...style,
		},
		attributes: {
			draggable: 'false',
			controls: '',
			src,
			loading,
		},
	};
}

function Button() {}

function Div({ children, style }) {
	return {
		tag: 'div',
		style: {
			//styles
			...style,
		},
		children,
	};
}

function Span({ children, style }) {
	return {
		tag: 'span',
		style: {
			//styles
			...style,
		},
		children,
	};
}

function P({ children, style }) {
	return {
		tag: 'p',
		style: {
			//styles
			...style,
		},
		children,
	};
}

function H1({ children, style }) {
	return {
		tag: 'h1',
		style: {
			//styles
			...style,
		},
		children,
	};
}

function H2({ children, style }) {
	return {
		tag: 'h2',
		style: {
			//styles
			...style,
		},
		children,
	};
}

export { Img, Video, Audio, Button, Div, Span, P, H1, H2 };
