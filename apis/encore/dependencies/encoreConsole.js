export default function encoreConsole(message, type) {
	if (!Array.isArray(message)) {
		message = [message];
	}

	const checkType = () => {
		switch (type) {
			case 'error':
				return [
					'background-color: black; padding: 3px 5px; border-radius: 7px; border: 1px solid red',
					'font-weight: normal;',
				];
			case 'warn':
				return [
					'background-color: black; padding: 3px 5px; border-radius: 7px; border: 1px solid yellow',
					'font-weight: normal;',
				];
			default:
				return [''];
		}
	};

	message.forEach((single) => {
		if (!single) return;
		console.log(
			`%cENCORE%c ${single}`,
			'font-weight: bold; color: #8564ff; background-color: black; padding: 0 5px; border-radius: 7px; border: 1px solid #8564ff',
			'font-weight: normal;',
			...checkType(),
		);
	});
}
