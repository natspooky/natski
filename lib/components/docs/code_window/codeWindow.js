import CodeHeader from './codeHeader.js';
import CodeHighlighter from './codeHighlighter.js';

export default function CodeWindow({}) {
	return {
		tag: 'div',
		classes: 'code-window',
		children: [CodeHeader({}), CodeHighlighter({})],
	};
}
