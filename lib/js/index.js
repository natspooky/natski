import {
	jsonElementify,
	appendChildren,
} from '../../apis/encore/element-creator/ec.min.js';
import { isMobile } from '../../apis/dependencies/mobile-utils/mu.min.js';
import Footer from '../components/footer.js';
import IS from '../components/image_components/IS.js';
import LinkButton from '../components/button_components/linkButton.js';
import Button from '../components/button_components/button.js';
import Carousel from '../components/carousel_components/carousel.js';

import { index } from '../js/data/page_index.js';

function CarouselPage({ blah, bleh }) {
	const mouseMove = (event) => {};
	const mouseLeave = (self) => {};
	const mouseEnter = (self) => {};

	return {
		tag: 'div',
		events: {
			mousemove: {
				func: mouseMove,
				var: 'event',
			},
		},
		children: [
			{
				tag: 'div',
				classes: 'hover-panel',
				children: {
					tag: 'div',
					classes: 'grid-mask',
					children: {
						tag: 'div',
						//glow behind
					},
				},
			},
		],
	};
}

function Header() {
	return {
		tag: 'header',
		classes: 'header-full',
		children: [
			{
				tag: 'div',
				classes: 'header-half dotted-bg fade-down-bg',
			},

			Carousel({
				height: '50vh',
				width: '90%',
				children: [CarouselPage({})],
			}),
			{
				tag: 'div',
				classes: 'article-container',
				children: [
					Article({
						description: 'dsfgfdsdg',
						title: 'Simple',
						icon: 'simple',
						link: {
							routing: {
								route: '/apis/simple',
							},
							icon: 'export',
							name: 'Visit',
						},
					}),
					Article({
						description: '',
						title: 'ENCORE',
						icon: 'ENCORE',
						link: {
							routing: {
								route: '/apis/encore',
							},
							icon: 'export',
							name: 'Visit',
						},
					}),
				],
			},
		],
	};
}

function Article({ description, title, icon, link }) {
	return {
		tag: 'div',
		classes: 'article',
		children: [
			{
				tag: 'div',
				classes: 'icon-container',
				children: IS({
					icon: icon,
				}),
			},
			{
				tag: 'span',
				classes: 'text-container',
				children: [
					{
						tag: 'h1',
						innerHTML: title,
					},
					{
						tag: 'p',
						innerHTML: description,
					},
				],
			},
			{
				tag: 'div',
				classes: 'button-container',
				children: [
					Button({}), // make an action that will expand the description if needed
					LinkButton({
						...link,
						parent: true,
					}),
				],
			},
		],
	};
}

function createLayout() {
	appendChildren(
		document.getElementsByTagName('main')[0],
		jsonElementify([
			Header(),

			Footer({
				parent: true,
			}),
		]),
	);
}

/**
 
 
 Object.entries(index).map(([key, data], index) => {
				return Window({
					status: 'ongoing',
					icon: data.icon,
					name: key
						.slice(key.lastIndexOf('/') + 1)
						.replaceAll('-', ' '),
					route: key,
					subpage: false,
					parent: true,
				});
			}),
 
 
 */

function load() {
	createLayout();
	let screen = document.getElementById('load');
	setTimeout(() => {
		screen.classList.add('loaded');
	}, 10);
	setTimeout(() => {
		screen.remove();
	}, 800);
}

window.addEventListener('DOMContentLoaded', load);
