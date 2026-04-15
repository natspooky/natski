import Navigator from './navigator.js';
import { TestSection, TestSubSection } from './testSection.js';

function TextGen({ length }) {}

function TestPage({ tests }) {
	window.tests.lorem = TextGen;

	return navigator();
}

export default TestPage;
