import {
	className,
	useState,
	createPortal,
	merge,
} from '../../../apis/encore/element-creator.js';
import { Button } from './button.js';

function Modal({ classes, title, subtitle, content }) {
	return (click) => [
		{
			tag: 'div',
			classes: 'modal-bg',
			style: {
				position: 'fixed',
				height: '100vh',
				width: '100vw',
				top: '0',
				left: '0',
				background: '#000',
				zIndex: '999',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			},
			children: {
				tag: 'div',
				style: {
					position: 'relative',
					padding: '10px',
					borderRadius: '20px',
					width: 'min(90%, 600px)',
					background: 'red',
				},
				classes: className('modal', classes),
				children: {
					tag: 'button',
					events: { click: { callback: click } },
					children: 'close',
				},
			},
		},
	];
}

function ModalButton({ modal, classes, ...props }) {
	const modalEl = modal(() => setModalState(!getModalState()));

	const [modalState, getModalState, setModalState] = useState((getter) => {
		return getter ? modalEl : null;
	});

	return [
		Button(
			merge(props, {
				classes: className('modal-button', classes),
				events: {
					click: { callback: () => setModalState(!getModalState()) },
				},
			}),
		),
		createPortal(modalState),
	];
}

function ModalTitle() {}

function ModalSubTitle() {}

function ModalContent() {}

export { Modal, ModalButton };
