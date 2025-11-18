import {
	className,
	useState,
	useSuspense,
} from '../../../apis/encore/element-creator.js';

function codeHighlighter(code) {}

export default function CodeBox({ copy, classes, code, ...props }) {
	return {
		tag: 'div',
		classes: className('code-box', classes),
	};
}
