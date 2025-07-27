import { render } from '../../../apis/encore/element-creator/ec.min.js';

render('root', () => {
	const About = () => {
		return {
			tag: 'div',
		};
	};

	return About();
});
