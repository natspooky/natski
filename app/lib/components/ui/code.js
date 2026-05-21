import { useState, useRef } from '../../../apis/encore/element-creator.js';
import Button from './button.js';
import Icon from './icon.js';

function Code({ children, style, copy = true }) {
	const codeRef = useRef(null);
	const timerRef = useRef(null);

	const copyHandler = (codeRef) => {
		clearTimeout(timerRef.current);

		navigator.clipboard.writeText(codeRef.current.innerText);

		setButtonIcon('checkmark');

		timerRef.current = setTimeout(() => {
			setButtonIcon('copy');
		}, 2000);
	};

	const [buttonIcon, , setButtonIcon] = useState((name) => {
		return Icon({
			name,
			style: {
				backgroundColor: 'var(--darken-text-color)',
				height: '50%',
				width: '50%',
				display: 'block',
			},
		});
	}, 'copy');

	function formatJavaScript(codeString, maxLineLength = 80) {
		let clean = codeString
			.replace(/\s*\{\s*/g, ' { \n')
			.replace(/\s*\}\s*/g, '\n}\n')
			.replace(/,\s*/g, ',\n')
			.replace(/\s*;\s*/g, ';\n')
			.replace(/\n\s*\n/g, '\n');

		let lines = clean.split('\n');
		let indentLevel = 0;
		const indentSpaces = 4;
		let formattedLines = [];

		for (let line of lines) {
			line = line.trim();
			if (!line) continue;

			if (line.startsWith('}') || line.startsWith(']')) {
				indentLevel = Math.max(0, indentLevel - 1);
			}

			const padding = ' '.repeat(indentLevel * indentSpaces);
			let currentFullLine = padding + line;

			if (currentFullLine.length > maxLineLength) {
				const splitLines = splitLongLine(
					line,
					indentLevel,
					indentSpaces,
					maxLineLength,
				);
				formattedLines.push(...splitLines);
			} else {
				formattedLines.push(currentFullLine);
			}

			const openBraces = (line.match(/\{|\[/g) || []).length;
			const closeBraces = (line.match(/\}|\]/g) || []).length;
			indentLevel += openBraces - closeBraces;
		}

		return formattedLines.join('\n');
	}

	function splitLongLine(line, indentLevel, indentSpaces, maxLineLength) {
		const basePadding = ' '.repeat(indentLevel * indentSpaces);
		const extraPadding = ' '.repeat((indentLevel + 1) * indentSpaces);

		if (line.startsWith('//') || line.startsWith('/*')) {
			return chunkTextByWords(line, basePadding, maxLineLength);
		}

		const breakPoints = /(===|==|!==|!=|=>|=|\s\&\&\s|\s\|\|\s|,\s*)/g;

		let parts = line.split(breakPoints).filter(Boolean);
		let result = [];
		let currentLineBuffer = basePadding;

		for (let i = 0; i < parts.length; i++) {
			let part = parts[i];

			if (
				(currentLineBuffer + part).length > maxLineLength &&
				currentLineBuffer !== basePadding &&
				currentLineBuffer !== extraPadding
			) {
				result.push(currentLineBuffer.trimEnd());
				currentLineBuffer = extraPadding + part.trimStart();
			} else {
				if (
					currentLineBuffer === basePadding ||
					currentLineBuffer === extraPadding
				) {
					currentLineBuffer += part.trimStart();
				} else {
					currentLineBuffer += part;
				}
			}
		}

		if (currentLineBuffer.trim()) {
			result.push(currentLineBuffer.trimEnd());
		}

		return result;
	}

	function chunkTextByWords(text, padding, maxLength) {
		let words = text.split(' ');
		let lines = [];
		let currentLine = padding;

		for (let word of words) {
			if ((currentLine + ' ' + word).length > maxLength) {
				lines.push(currentLine.trimEnd());
				currentLine = padding + '// ' + word;
			} else {
				currentLine += (currentLine === padding ? '' : ' ') + word;
			}
		}
		if (currentLine.trim()) lines.push(currentLine);
		return lines;
	}

	function tokenizeCodeToObjects(rawCode) {
		let text = typeof rawCode === 'string' ? rawCode : rawCode.innerText;

		const rules = [
			{
				type: 'comment',
				style: {
					color: 'var(--token-comment)',
				},
				regex: /^\/\/.*$/,
			},
			{
				type: 'string',
				style: {
					color: 'var(--token-symbol)',
				},
				regex: /^(?:"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)/,
			},
			{
				type: 'number',
				style: {
					color: 'var(--token-symbol)',
				},
				regex: /^\b\d+\b/,
			},
			{
				type: 'keyword',
				style: {
					color: 'var(--token-keyword)',
				},
				regex: /^\b(const|let|var|function|return|if|else|for|while|do|class|export|import|new|this|typeof)\b/,
			},
			{
				type: 'object-property',
				style: {
					color: 'var(--token-selector)',
				},
				regex: /^\b\w+(?=\s*:)/,
			},
			{
				type: 'object-property',
				style: {
					color: 'var(--token-selector)',
				},
				regex: /^(?<=\.)\b\w+\b/,
			},
			{
				type: 'function',
				style: {
					color: 'var(--token-function)',
				},
				regex: /^\b\w+(?=\()/,
			},
			{
				type: 'text',
				style: {
					color: 'var(--token-punctuation)',
				},
				regex: /^[\s\S]/,
			},
		];

		const tokens = [];

		while (text.length > 0) {
			let matched = false;

			for (const rule of rules) {
				const match = text.match(rule.regex);

				if (match && match.index === 0) {
					const value = match[0];

					if (rule.type !== 'text') {
						tokens.push({
							tag: 'span',
							style: rule.style,
							children: value,
						});
					} else {
						tokens.push(value);
					}

					text = text.slice(value.length);
					matched = true;
					break;
				}
			}

			if (!matched) {
				tokens.push(text[0]);
				text = text.slice(1);
			}
		}

		return optimizeTokens(tokens);
	}

	function optimizeTokens(tokens) {
		const optimized = [];
		let currentString = '';

		for (const token of tokens) {
			if (typeof token === 'string') {
				currentString += token;
			} else {
				if (currentString) {
					optimized.push(currentString);
					currentString = '';
				}
				optimized.push(token);
			}
		}
		if (currentString) optimized.push(currentString);

		return optimized;
	}

	return {
		tag: 'div',
		style: {
			maxWidth: '100%',
			width: 'fit-content',
			padding: '10px',
			borderRadius: 'var(--border-radius-2)',
			cornerShape: 'var(--border-shape)',
			backgroundColor: 'var(--darken)',
			color: 'var(--darken-text-color)',
			display: 'flex',
			justifyContent: 'space-between',
			...style,
		},
		children: [
			{
				tag: 'pre',
				style: {
					userSelect: 'none',
					maxWidth: 'inherit',
					flexGrow: '0',
					flexShrink: '1',
					width: 'fit-content',
					height: 'fit-content',
					overflowX: 'auto',
					fontSize: 'var(--font-size-2)',
				},
				children: {
					tag: 'code',
					ref: codeRef,
					children: tokenizeCodeToObjects(formatJavaScript(children)),
				},
			},
			copy
				? {
						tag: 'div',
						style: {
							height: '100%',
							flexGrow: '0',
							paddingLeft: '10px',
						},
						children: Button({
							events: {
								click: {
									callback: copyHandler,
									param: codeRef,
								},
							},
							style: {
								height: '30px',
								width: '30px',
								display: 'block',
							},
							children: buttonIcon,
						}),
					}
				: null,
		],
	};
}

export default Code;
