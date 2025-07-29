export default function encoreConsole(message) {
	if (!Array.isArray(message)) {
		message = [message];
	}

	const checkType = (single) => {
		if (single.error)
			return [
				'background-color: #ff000049; padding: 3px 5px; border-radius: 7px;',
				'font-weight: normal;',
			];
		return [];
	};

	message.forEach((single) => {
		if (!single) return;

		console.log(
			`%cENCORE%c ${single.message}${
				single.error ? '\n%c' + single.error + '%c' : ''
			}`,
			'font-weight: bold; color: #8564ff; background-color: black; padding: 0 5px; border-radius: 7px; border: 1px solid #8564ff',
			'font-weight: normal;',
			...checkType(single),
		);
	});
}
