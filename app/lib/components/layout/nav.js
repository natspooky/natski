import { useRef } from '../../../apis/encore/element-creator.js';
import isMobile from '../../../apis/dependencies/mobile-utils.js';
import IconChip from './iconChip.js';
import Icon from '../ui/icon.js';
import Link from '../ui/link.js';
import Button from '../ui/button.js';

function Nav() {
	const dropDownRef = useRef(null);
	const navRef = useRef(null);
	const dropDownContentRef = useRef(null);

	return {
		tag: 'nav',
		ref: navRef,
		style: {
			position: 'fixed',
			height: 'fit-content',
			backgroundColor: 'var(--darken)',
			borderRadius: 'var(--border-radius-4)',
			cornerShape: 'var(--border-shape)',
			...(isMobile
				? {
						width: 'calc(100% - 20px)',
						top: '10px',
						left: '10px',
					}
				: {
						position: 'fixed',
						width: 'fit-content',
						top: '0',
						left: '50%',
						margin: '30px auto 0px auto',
						transform: 'translateX(-50%)',
					}),
		},
		children: [
			NavMain({ dropDownRef, navRef, dropDownContentRef }),
			NavDropDown({ dropDownRef, dropDownContentRef }),
		],
	};
}

function NavMain({ dropDownRef, navRef, dropDownContentRef }) {
	return {
		tag: 'div',
		style: {
			position: 'relative',
			height: '50px',
			width: '100%',
			display: 'flex',
			padding: '0 15px',
			alignItems: 'center',
			justifyContent: 'center',
		},
		children: [
			Link({
				style: {
					display: 'block',
					position: 'relative',
					justifySelf: 'start',
					width: 'fit-content',
					height: 'fit-content',
					flexGrow: '0',
				},
				children: Icon({
					name: 'NATSKI',
					style: {
						display: 'block',
						backgroundColor: 'var(--darken-text-color)',
						height: '25px',
						width: '25px',
					},
				}),
				href: '/home',
			}),
			{
				tag: 'div',
				style: {
					display: 'flex',
					flexGrow: '1',
					gap: '10px',
					alignItems: 'center',
					justifyContent: 'center',
					paddingRight: '25px',
					margin: '0 20px',
				},
				children: [
					NavDropDownButton({
						dropDownRef,
						navRef,
						dropDownContentRef,
					}),
					[
						{
							title: 'Docs',
							href: '/docs',
						},
						{
							title: 'The Cellar',
							href: '/the-cellar',
						},
					].map(({ title, href }) => {
						return Link({
							style: {
								'.className.current span, .className:focus span':
									{
										color: 'var(--darken-text-color)',
									},
							},
							children: {
								tag: 'span',
								style: {
									fontSize: 'var(--font-size-2)',
									fontWeight: '500',
									whiteSpace: 'nowrap',
									padding: '5px',
									color: 'var(--darken-text-sub-color)',
									transition: '0.2s',
									':hover': {
										color: 'var(--darken-text-color)',
									},
								},
								children: title,
							},
							href,
						});
					}),
				],
			},
		],
	};
}

function NavDropDown({ dropDownRef, dropDownContentRef }) {
	return {
		tag: 'div',
		ref: dropDownRef,
		style: {
			position: 'relative',
			height: '0px',
			width: '100%',
			overflow: 'hidden',
			transition: '0.1s',
			'.className.open': {
				transition: '0.3s',
			},
			'.className.open .dropdown-nav-content': {
				filter: 'blur(0px)',
				opacity: '1',
			},
		},
		children: {
			tag: 'div',
			classes: 'dropdown-nav-content',
			ref: dropDownContentRef,
			style: {
				height: 'fit-content',
				padding: '10px',
				width: '100%',
				display: 'flex',
				gap: '10px',
				flexWrap: 'wrap',
				transition: 'inherit',
				filter: 'blur(5px)',
				opacity: '0',
			},
			children: [
				{
					icon: 'ENCORE',
					title: 'Encore',
					description: 'The web app library',
					href: '/home#encore',
					color: 'var(--SSC)',
				},
				{
					icon: 'simple',
					title: 'Simple',
					description: 'Simple Canvas library',
					href: '/home#simple',
					color: 'var(--PDS)',
				},
				{
					icon: 'ARC',
					title: 'Tools',
					description: 'Browser tools',
					href: '/home#tools',
					color: 'var(--CLS)',
				},
			].map((items) => {
				return DropDownItem(items);
			}),
		},
	};
}

function DropDownItem({ icon, title, description, href, color }) {
	return Link({
		href,
		attributes: {
			tabindex: '-1',
		},
		style: {
			width: 'auto',
			minWidth: '30%',
			flexGrow: '1',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '15px 0',
			color: 'var(--darken-text-color)',
			'::before': {
				content: '""',
				position: 'absolute',
				top: '0',
				left: '0',
				height: '100%',
				width: '100%',
				backgroundColor: color,
				opacity: '0.2',
				transition: '0.2s',
				borderRadius: 'var(--border-radius-3)',
				cornerShape: 'var(--border-shape)',
			},
			':hover::before': {
				opacity: '0.3',
			},
			':hover .icon-chip': {
				transform: 'scale(1.1)',
			},
			'.className icon-system': {
				transition: '0.3s cubic-bezier(.47,1.53,.77,1.01)',
				transform: 'rotate(0deg)',
			},
			':hover icon-system': {
				transform: 'rotate(30deg)',
			},
		},
		children: [
			IconChip({
				name: icon,
				classes: 'icon-chip',
				color: 'var(--darken-text-color)',
				style: {
					backgroundColor: color,
					transform: 'scale(1)',
					transition: '0.3s cubic-bezier(.47,1.53,.77,1.01)',
				},
			}),
			{
				tag: 'h1',
				style: {
					position: 'relative',
					fontSize: 'var(--font-size-4)',
					margin: '9px 0 0px 0',
				},
				children: title,
			},
			{
				tag: 'span',
				style: {
					position: 'relative',
					fontSize: 'var(--font-size-2)',
					fontWeight: '500',
					color: 'var(--darken-text-sub-color)',
				},
				children: description,
			},
		],
	});
}

function NavDropDownButton({ dropDownRef, navRef, dropDownContentRef }) {
	const buttonRef = useRef(null);

	const mouseOverHandler = () => {
		dropDownRef.current.classList.add('open');
		buttonRef.current.classList.add('open');
		dropDownRef.current.style.height = `${dropDownContentRef.current.offsetHeight}px`;
	};

	const mouseOutHandler = () => {
		dropDownRef.current.classList.remove('open');
		buttonRef.current.classList.remove('open');
		dropDownRef.current.style.height = null;
	};

	return Button({
		ref: buttonRef,
		events: {
			mouseover: {
				callback: mouseOverHandler,
			},
			mouseleave: {
				callback: mouseOutHandler,
				target: navRef,
			},
			click: !isMobile
				? {
						callback: mouseOutHandler,
						target: navRef,
					}
				: null,
			focus: {
				callback: mouseOverHandler,
			},
			blur: {
				callback: mouseOutHandler,
			},
		},
		style: {
			display: 'flex',
			alignItems: 'center',
			gap: '5px',
			padding: '5px',
			'.className.open .dropdown-text': {
				color: 'var(--darken-text-color)',
			},
			'.className.open .dropdown-icon': {
				backgroundColor: 'var(--darken-text-color)',
				transform: 'rotate(180deg)',
			},
		},
		children: [
			{
				tag: 'span',
				classes: 'dropdown-text',
				style: {
					fontSize: 'var(--font-size-2)',
					fontWeight: '500',
					color: 'var(--darken-text-sub-color)',
					transition: '0.2s',
				},
				children: 'Showcase',
			},
			Icon({
				name: 'mini_arrow_down',
				classes: 'dropdown-icon',
				style: {
					height: '9px',
					width: '9px',
					backgroundColor: 'var(--darken-text-sub-color)',
					transform: 'rotate(0deg)',
					transition: '0.3s cubic-bezier(.47,1.53,.77,1.01)',
				},
			}),
		],
	});
}

export default Nav;
