import {
	render,
	useState,
	useRef,
} from '../../../apis/encore/element-creator.js';
import GameLayout from '../../layouts/gameLayout.js';

function StateInput() {
	const [state] = useState((setter) => {
		let inputCont = useRef();
		return {
			tag: 'input',
			ref: inputCont,
			style: {},
			attributes: {
				type: 'text',
				value: setter,
			},
			events: {
				keydown: {
					callback: () => {
						setter(inputCont.current.value);
					},
				},
			},
		};
	});
	return state;
}

function inputPunnet() {
	return {
		tag: 'div',
		children: new Array(5).fill(0).map(StateInput),
	};
}

function WordleContainer() {
	return new Array(6).fill(0).map(inputPunnet);
}

function Page() {
	return {};
}

export { Page as default, GameLayout as Layout };
