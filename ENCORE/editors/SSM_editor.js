import * as SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';
import * as DP from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_DP.mjs';
import SSM from 'https://natski.netlify.app/ENCORE/ENCORE_SSM.js';
import * as ENCORE from 'https://natski.netlify.app/ENCORE/editors/ENCORE_editor.js';

const components = {
	SSM: (data) => {
		return {
			tag: 'SSM',
			classes: data.classes,
			attributes: {
				style: ``,
			},
			children: [
				{
					tag: 'div',
					classes: ['SSM-category-container'],
					children: data.categoryChildren,
				},
				{
					tag: 'div',
					classes: ['SSM-item-container'],
					children: data.itemChildren,
				},
			],
		};
	},
	categoryButton: (data) => {
		return {
			tag: 'button',
			classes: ['SSM-category-button'],
			events: data.events,
			children: [
				{
					tag: 'GIS',
					attributes: {
						name: data.icon,
					},
				},
				{
					tag: 'p',
					innerHTML: data.title,
				},
			],
		};
	},
	section: (data) => {
		return {
			tag: 'div',
			classes: ['SSM-panel'],
			children: [
				{
					tag: 'div',
					classes: ['SSM-panel-header'],
					children: [
						{
							tag: 'GIS',
							attributes: {
								name: data.icon,
							},
						},
						{
							tag: 'h1',
							innerHTML: data.title,
						},
					],
				},
				data.children,
			],
		};
	},

	button: (data) => {
		return {
			tag: 'div',
			classes: ['SSM-sub-panel'],
			children: [
				{
					tag: 'p',
					innerHTML: data.title,
				},
				{
					tag: 'button',
					classes: ['SSM-input', 'SSM-button'],
					events: data.events,
					innerHTML: data.button,
				},
			],
		};
	},
	slider: (data) => {
		return {
			tag: 'div',
			classes: ['SSM-sub-panel', 'SSM-slider-panel'],
			children: [
				{
					tag: 'div',
					children: [
						{
							tag: 'p',
							innerHTML: data.title,
						},
						{
							tag: 'input',
							classes: ['SSM-input', 'SSM-number'],
							attributes: {
								type: 'number',
								placeholder: data.value,
							},
							events: data.events,
						},
					],
				},
				{
					tag: 'input',
					classes: ['SSM-input', 'SSM-slider'],
					attributes: {
						type: 'range',
						min: data.min,
						max: data.max,
						value: data.value,
						step: data.step,
					},
					events: {
						...data.events,
						input: this.sliderBars.bind(this),
					},
				},
			],
		};
	},
	checkbox: (data) => {
		return {
			tag: 'div',
			classes: ['SSM-sub-panel', 'SSM-checkbox-panel'],
			children: [
				{
					tag: 'p',
					innerHTML: data.title,
				},
				{
					tag: 'input',
					classes: ['SSM-input', 'SSM-checkbox'],
					attributes: {
						type: 'checkbox',
						checked: data.checked,
					},
					events: data.events,
				},
			],
		};
	},
	range: (data) => {
		return {
			tag: 'div',
			classes: ['SSM-sub-panel', 'SSM-slider-panel'],
			children: [
				{
					tag: 'div',
					children: [
						{
							tag: 'p',
							innerHTML: data.title,
						},
						{
							tag: 'div',
							classes: ['SSM-input', 'SSM-range'],
							children: [
								{
									tag: 'input',
									classes: ['SSM-input', 'SSM-number'],
									attributes: {
										type: 'number',
										placeholder: '',
									},
									events: data.events,
								},
								{
									tag: 'input',
									classes: ['SSM-input', 'SSM-number'],
									attributes: {
										type: 'number',
										placeholder: '',
									},
									events: data.events,
								},
							],
						},
						{
							tag: 'div',
							classes: ['SSM-input', 'SSM-range'],
							children: [
								{
									tag: 'input',
									classes: ['SSM-input', 'SSM-slider'],
									attributes: {
										type: 'range',
										min: '',
										max: '',
										value: '',
										step: '',
									},
									events: data.events,
								},
								{
									tag: 'input',
									classes: ['SSM-input', 'SSM-slider'],
									attributes: {
										type: 'range',
										min: '',
										max: '',
										value: '',
										step: '',
									},
									events: data.events,
								},
							],
						},
					],
				},
				{
					tag: 'input',
					classes: ['SSM-input', 'SSM-slider'],
					attributes: {
						type: 'range',
						min: '',
						max: '',
						value: '',
						step: '',
					},
					events: data.events,
				},
			],
		};
	},
	dropdown: (data) => {
		return {
			tag: 'div',
			classes: ['SSM-sub-panel'],
			children: [
				{
					tag: 'p',
					innerHTML: data.title,
				},
				{
					tag: 'div',
					classes: ['SSM-input', 'SSM-dropdown'],
					events: data.events,
					children: [
						{
							tag: 'span',
							children: [
								{
									tag: 'p',
									innerHTML: data.data,
								},
								{
									tag: 'GIS',
									attributes: {
										name: 'line_arrow_left',
									},
								},
							],
						},
						{
							tag: 'div',
							children: [
								{
									tag: 'section',
									children: data.listItems.map((data) => {
										return {
											tag: 'button',
											innerHTML: data.value,
											events: data.events,
										};
									}),
								},
							],
						},
					],
				},
			],
		};
	},
};
