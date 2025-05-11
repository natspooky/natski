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
			}),
			Button({
				classes: ['window-info', 'icon-button'],
				action: infoPage,
				icon: 'information',
			}),
			LinkButton({
				classes: ['window-open', 'icon-button'],
				link: {
					subpage: subpage,
					route: route,
				},
				icon: 'circle_arrow_leave',
			}),
			{
				tag: 'p',
				classes: 'window-name',
				innerHTML: name,
			},
			{
				tag: 'p',
				classes: ['window-status', status],
				innerHTML: status,
			},
		],
	};
}
