import { useId } from '../../../../apis/encore/element-creator.js';
import Navigator from './navigator.js';
import { TestSection, TestSubSection } from './testSection.js';

function TextGen({ length, random = 1 }) {
	function shuffle(array) {
		let currentIndex = array.length;
		while (currentIndex != 0) {
			let randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	}
	return shuffle(
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'.split(
			' ',
		),
	)
		.slice(0, Math.floor(Math.random() * random) + length)
		.join(' ')
		.toLowerCase()
		.replaceAll(/\.|,/g, '');
}

function TestPage({ tests }) {
	window.tests.lorem = TextGen;

	const createName = (name) => {
		return name
			.split(/(?=[A-Z])/)
			.map((word, index) => {
				//if (index !== 0) return word.toLowerCase();
				return (
					word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()
				);
			})
			.join(' ');
	};

	const Linker = tests.map((test) => {
		const children = Object.entries(test());

		return [test.name, useId(), children[0], children[1]];
	});

	return [Navigator()];
}

function page() {
	const createName = (name) => {
		return name
			.split(/(?=[A-Z])/)
			.map((word, index) => {
				if (index !== 0) return word.toLowerCase();
				return word.slice(0, 1).toUpperCase() + word.slice(1);
			})
			.join(' ');
	};

	return [
		StateTest,
		SuspenseTest,
		ComponentAppendTests,
		MergeTests,
		MiscTests,
	].map((component) => {
		const element = component();

		return DIV({
			children: BorderContainer({
				children: [
					H1({ children: createName(component.name) }),
					DIV({
						children:
							!element.tag && !Array.isArray(element)
								? Object.entries(element).map(
										([key, value]) => {
											return BorderContainer({
												children: [
													H2({
														children:
															createName(key),
													}),
													value(),
												],
											});
										},
									)
								: element,
					}),
				],
			}),
		});
	});
}

export default TestPage;
