import { render, useState } from '../../apis/encore/element-creator.js';
import Footer from '../components/footer.js';
import { GlassBacking } from '../components/ui/glass.js';
import DocLayout from '../layouts/docs/docLayout.js';
import Selector from '../components/ui/selector.js';
import Header from '../components/header.js';

render(
	'root',
	() => {
		window.components.layout = DocLayout;
		return [Header({ children: [] })];
	},
	{
		useIcons: true,
	},
);
