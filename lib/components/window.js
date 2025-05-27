import Button from './button.js';
import LinkButton from './linkButton.js';
import IS from './IS.js';
import PageDetails from './pageDetails.js';

export default function Window({
	status,
	icon,
	customIcon,
	name,
	route,
	subpage,
	parent,
}) {
	let page = null;
	const infoPage = () => {
		if (page) return;
		page = PageDetails({});

		document.body.appendChild(page);

		setTimeout(() => {
			page.classList.add('visible');
		}, 10);
	};

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
				action: infoPage,
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
				classes: ['window-status', status ? status : ''],
				innerHTML: status,
			},
		],
	};
}
