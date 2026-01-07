import { render, className } from '../../apis/encore/element-creator.js';
import standardLayout from '../layouts/standardLayout.js';
import Marquee from '../components/ui/marquee.js';
import { Link } from '../components/ui/link.js';
import { Img } from '../components/ui/img.js';
import Icon from '../components/ui/icon.js';

function Page() {
	return {};
}

render('root', Page, { useIcons: true });
