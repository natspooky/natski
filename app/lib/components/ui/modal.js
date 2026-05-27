import {
	useState,
	createPortal,
	buildComponent,
	useRef,
} from '../../../apis/encore/element-creator.js';
import Button from './button.js';

function Modal({ modalChildren, buttonChildren }) {
	const modalRef = useRef(null);

	const openModel = () => {
		createPortal({
			tag: 'ec-fragment',
			ref: modalRef,
			children: modalChildren,
		});
	};

	const closeModel = () => {
		if (modalRef.current) modalRef.current.remove();
	};

	return Button({
		events: {
			click: {
				callback: openModel,
			},
		},
		children: buttonChildren,
	});
}
