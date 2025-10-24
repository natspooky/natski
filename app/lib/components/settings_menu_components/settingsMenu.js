import Button from '';

import IS from '';

import { className } from '';

function ItemIDSwitcher(ID, data) {
	switch (ID) {
		case '':
			break;

		default:
			throw new Error('ID does not match any valid ID tags');
	}
}

function WidgetGroup({ title, children }) {
	return {
		tag: 'section',
		children: [
			{
				tag: 'h1',
				innerHTML: title,
			},
			...children.map(([key, data]) => {
				return MenuWidget({
					children: ItemIDSwitcher(key, data),
				});
			}),
		],
	};
}

function MenuWidget({ children }) {
	return {
		tag: 'div',
		classes: 'menu-widget',
		children: children,
	};
}

function MultiButton({}) {
	return {
		tag: 'div',
		children: data.map(() => {
			return Button();
		}),
	};
}

function Range({ max, min, value, actions }) {
	const changeNumber = (self) => {
		self.parentNode.children[0].value = self.value;
	};

	return {
		tag: 'input',
		events: {
			...actions, // wont work, we need to allow for default functions too
		},
		attributes: {
			max: max,
			min: min,
			value: value,
		},
	};
}

function Slider() {}

function Button() {}

function CheckBox() {}

function DropDown() {}

function Radio() {}

export default function SettingsMenu({ data }) {
	return {
		tag: 'div',
		classes: 'settings',
		children: [
			{
				tag: '',
				children: data.map(() => {}),
			},
		],
	};
}
