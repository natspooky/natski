/*!
 * ENCORE CODE DISPLAY SYSTEM
 * Author: NATSKI
 * MIT License
 */

import * as ENCORE_PAS from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_PAS.mjs';

let CDSobjs;
function CDScopyCode(self) {
	navigator.clipboard.writeText(
		self.parentNode.parentNode.children[1].children[0].innerText,
	);
	ENCORE_PAS.PAS().add({
		txt: 'copied to clipboard',
		icn: 'copy',
		dur: 2000,
	});
}
