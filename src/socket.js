let socket = null;
let sublist = [];

export function connectSocket(url) {
	if (socket != null) {
		socket.close();
		socket = null;
	}
	socket = new WebSocket(url);
	socket.addEventListener('message', (socketEvent) => {
		const data = JSON.parse(socketEvent.data);

		if (data.op === 'ERR') {
			const event = new CustomEvent('ERR', {
				detail: {
					title: data.target,
					message: data.value
				}
			});

			window.dispatchEvent(event);
		} else {
			const event = new CustomEvent(data.target, {
				detail: JSON.parse(data.value)
			});
			window.dispatchEvent(event);
		}
	});

	window.addEventListener('SUB2SOCKET', (event) => {
		socket.send(
			JSON.stringify({
				op: 'SUB',
				target: event.detail,
				value: ''
			})
		);

		sublist.push(event.detail);
	});

	window.addEventListener('UNSUB2SOCKET', (event) => {
		socket.send(
			JSON.stringify({
				op: 'UNSUB',
				target: event.detail,
				value: ''
			})
		);
	});

	window.addEventListener('HIST2SOCKET', (event) => {
		socket.send(
			JSON.stringify({
				op: 'HIST',
				target: event.detail.target,
				value: event.detail.value
			})
		);
	});

	window.addEventListener('GET2SOCKET', (event) => {
		socket.send(
			JSON.stringify({
				op: 'GET',
				target: event.detail,
				value: ''
			})
		);
	});
}

export function unsubAll() {
	sublist.forEach((element) => {
		socket.send(
			JSON.stringify({
				op: 'UNSUB',
				target: element,
				value: ''
			})
		);
	});
	sublist = [];
}
