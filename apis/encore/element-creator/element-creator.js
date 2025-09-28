import IconSystem from '../icon-system/is.min.js';
import encoreConsole from '../dependencies/encoreConsole.js';
import { append, create } from './dependencies/eventTable.js';

function render(root, callback, settings) {
	if (window.components) {
		encoreConsole({
			message: 'Hydration error:',
			error: 'Only one render call can be made per page',
		});
		return;
	}

	encoreConsole({
		message: 'Hydrating page',
	});

	if (settings?.useIcons) new IconSystem();

	window.components = new ComponentManager();
	const rootType = typeof root;
	let rootElement;

	if (rootType !== 'string' && rootType !== 'object') {
		encoreConsole({
			message: 'Hydration error:',
			error: `The root element '${root}' is not an ID or a HTMLElement`,
		});
		return;
	}

	if (rootType === 'string') {
		rootElement = document.getElementById(root);
		if (!rootElement) {
			encoreConsole({
				message: 'Hydration error:',
				error: `The root element '${root}' does not exist in the document`,
			});
			return;
		}
	}

	if (rootType === 'object') {
		rootElement = root;
		if (
			!(
				rootElement.nodeType &&
				rootElement.nodeType === Node.ELEMENT_NODE
			)
		) {
			encoreConsole({
				message: 'Hydration error:',
				error: `The root element '${rootElement}' does not exist in the document`,
			});
			return;
		}
	}

	const hydrate = async () => {
		try {
			await settings?.hooks?.before?.();

			if (settings?.awaitFontLoad && !settings?.awaitPageLoad) {
				encoreConsole({
					message: 'Awaiting fonts',
				});

				await document.fonts.ready;
			}

			const time = performance.now();

			const renderComponent = await callback();
			const layout = window.components.layout;
			const componentName = 'content';

			const content = window.components
				.setComponent(componentName, renderComponent)
				.getComponent(componentName);

			if (layout) {
				window.components.setComponent(
					'layout',
					layout({
						children: content.fragment ?? content.element,
					}),
				);
			}

			window.components.appendComponent(
				rootElement,
				layout ? 'layout' : componentName,
			);

			const finalTime = Math.round(performance.now() - time);

			encoreConsole({
				message: `Hydration complete in ${
					finalTime > 0 ? finalTime : '< 1'
				}ms`,
			});
		} catch (error) {
			encoreConsole({
				message: 'Hydration failed:',
			});
			console.error(error);
		}

		settings?.hooks?.after?.();
	};

	if (settings?.awaitPageLoad && document.readyState !== 'complete') {
		if (settings.awaitFontLoad) {
			encoreConsole({
				message: 'Warning',
				warn: "'awaitFontLoad' skipped due to greater await: 'awaitPageLoad'",
			});
		}
		window.addEventListener('load', () => {
			hydrate();
		});
		encoreConsole({
			message: 'Awaiting document completion',
		});
		return;
	}

	if (document.readyState === 'loading') {
		window.addEventListener('DOMContentLoaded', () => {
			hydrate();
		});
		return;
	}

	hydrate();
}

function componentCompare() {}

export { render, useState, useEffect };
