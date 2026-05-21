import {
	useState,
	useSuspense,
	useRef,
	useId,
	useHash,
} from '../../../apis/encore/element-creator.js';
import isMobile from '../../../apis/dependencies/mobile-utils.js';

function ContextMenu() {
	const contextMenuRef = useRef();

	const pageRefs = [];

	const [pageState, getPageState, setPageState] = useState((get, set) => {
		return;
	});

	return {};
}

function ContextMenuPage() {}
