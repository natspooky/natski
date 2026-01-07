import { className } from '../../../apis/encore/element-creator.js';
import { Button, IconButton } from './button.js';
import Icon from './icon.js';

function SelectorButton({}) {}

function Selector({ buttons }) {
	return {
		tag: 'div',
	};
}

export { Selector, SelectorButton };
