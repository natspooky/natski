import Button from './button_components/button.js';
import LinkButton from './button_components/linkButton.js';
import IS from './image_components/IS.js';
import { className } from '../../apis/encore/element-creator/ec.min.js';

export default function Window({
	status,
	icon,
	customIcon,
	name,
	route,
	subpage,
	parent,
}) {
	return {
		tag: 'div',
		classes: 'window',
		children: [
			IS({
				icon: icon,
				customIcon: customIcon,
				classes: 'window-icon',
			}),
			Button({
				classes: ['window-info', 'icon-button'],
				icon: 'information',
			}),
			LinkButton({
				classes: ['window-open', 'icon-button'],
				routing: {
					subpage: subpage,
					route: route,
				},
				icon: 'circle_arrow_leave',
				parent: parent,
			}),
			{
				tag: 'p',
				classes: 'window-name',
				innerHTML: name,
			},
			{
				tag: 'p',
				classes: className('window-status', status),
				innerHTML: status,
			},
		],
	};
}
