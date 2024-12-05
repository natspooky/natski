/*!
 * ENCORE CODE DISPLAY SYSTEM
 * Author: NATSKI
 * MIT License
 */

let CDSobjs = undefined;
function CDScopyCode(self) {
    navigator.clipboard.writeText(self.parentNode.parentNode.children[1].children[0].innerText);
    generateAlert('copied to clipboard', 'copy', 2000)
}