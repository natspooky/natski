import { render } from '../../../apis/encore/element-creator.js';
import { IS_DATA } from '../../../apis/encore/dependencies/icon-system/IS_DATA.js';
import Icon from '../../components/ui/icon.js';

function Page() {
	return IS_DATA.map((icon) => {
		return Icon({
			name: icon,
			style: {
				position: 'relative',
				display: 'inline-block',
				margin: '5px',
				height: '40px',
				width: '40px',
				backgroundColor: 'var(--text-color)',
			},
		});
	});
}

export default Page;

render(
	document.body,
	() => {
		return Page();
	},
	{ useIcons: true },
);
