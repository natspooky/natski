import Fullscreen from '../fullscreen.js';
import Window from '../window.js';
import Title from '../title.js';
import { useState } from '../../../../apis/encore/element-creator.js';

const text = ` ██████   █████            █████            █████       ███               █████                     
▒▒██████ ▒▒███            ▒▒███            ▒▒███       ▒▒▒               ▒▒███                      
 ▒███▒███ ▒███   ██████   ███████    █████  ▒███ █████ ████            ███████   ██████  █████ █████
 ▒███▒▒███▒███  ▒▒▒▒▒███ ▒▒▒███▒    ███▒▒   ▒███▒▒███ ▒▒███           ███▒▒███  ███▒▒███▒▒███ ▒▒███ 
 ▒███ ▒▒██████   ███████   ▒███    ▒▒█████  ▒██████▒   ▒███          ▒███ ▒███ ▒███████  ▒███  ▒███ 
 ▒███  ▒▒█████  ███▒▒███   ▒███ ███ ▒▒▒▒███ ▒███▒▒███  ▒███          ▒███ ▒███ ▒███▒▒▒   ▒▒███ ███  
 █████  ▒▒█████▒▒████████  ▒▒█████  ██████  ████ █████ █████    ██   ▒▒████████▒▒██████   ▒▒█████   
▒▒▒▒▒    ▒▒▒▒▒  ▒▒▒▒▒▒▒▒    ▒▒▒▒▒  ▒▒▒▒▒▒  ▒▒▒▒ ▒▒▒▒▒ ▒▒▒▒▒    ▒▒     ▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒     ▒▒▒▒▒    `;

function Landing() {
	return Fullscreen({
		children: [
			{
				tag: 'div',
				style: {
					position: 'relative',
					height: '100vh',
					width: '100%',
					backgroundImage:
						'linear-gradient(to top right, red, white)',
				},
			},
			Window({
				title: 'Welcome',
				height: '100px',
				type: 'windows',
				draggable: true,
				closable: true,
				collapsable: true,
				children: {
					tag: 'div',
					style: {
						fontSize: '10px',
						padding: '20px',
					},
					children: {
						tag: 'div',
						style: {
							padding: '0 15px',
							width: '100%',
						},
						children: [
							//Ascii(AnimateText(text)),
							Title({
								title: 'Natski.dev',
								description:
									'where poo bum willy pee comes to life through code',
								buttons: [
									{
										title: 'Find out more',
									},
									{
										title: 'Docs',
									},
								],
							}),
						],
					},
				},
			}),
		],
	});
}

export default Landing;
