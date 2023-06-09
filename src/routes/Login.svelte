<script>
	import { goto } from '$app/navigation';
	import { current_plugin } from '../stores';
	import { host, host_config, access_token, refresh_token } from '/src/stores';
	import { connectSocket } from '/src/socket.js';

	import { env } from '$env/dynamic/public';
	import Error from './Error/ErrorContainer.svelte';

	let hostVal = env.PUBLIC_HOSTVAL === undefined ? '' : env.PUBLIC_HOSTVAL;
	let ssl = true;
	let username = env.PUBLIC_USERNAME === undefined ? '' : env.PUBLIC_USERNAME;
	let password = env.PUBLIC_PASSWORD === undefined ? '' : env.PUBLIC_PASSWORD;

	async function submit() {
		if (ssl) host.set(`https://${hostVal}`);
		else host.set(`http://${hostVal}`);

		const authURL = new URL($host);
		authURL.pathname = 'auth';

		let auth = await fetch(authURL, {
			method: 'POST',
			body: JSON.stringify({
				method: 'PAM',
				credentials: {
					username: username,
					password: password
				}
			}),
			signal: AbortSignal.timeout(2000)
		}).catch(() => {
			const event = new CustomEvent('ERR', {
				detail: {
					title: 'Error on requesting authentication:',
					message: 'Host unreachable!'
				}
			});

			window.dispatchEvent(event);
		});

		if (auth?.ok) {
			const json = await auth.json();

			access_token.set(json.access_token);
			refresh_token.set(json.refresh_token);

			fetch(`${$host}/info`, {
				signal: AbortSignal.timeout(2000)
			})
				.then((res) => res.json())
				.then((h_config) => {
					h_config.modules = h_config.modules
						.filter((module) => module.components?.length > 0)
						.sort((a, b) => a.name > b.name);
					host_config.set(h_config);
				})
				.then(() => current_plugin.set($host_config.modules[0].components[0]))
				.then(() => {
					const url = new URL('ws://localhost');
					url.host = hostVal;
					url.pathname = 'ws';
					url.searchParams.set('token', json.access_token);
					ssl ? (url.protocol = 'wss') : (url.protocol = 'ws');

					connectSocket(url);
				})
				.then(() => goto(`/main`))
				.catch((err) => {
					const event = new CustomEvent('ERR', {
						detail: {
							title: 'Error on fetching info:',
							message: err
						}
					});

					window.dispatchEvent(event);
				});
		} else {
			if (auth) {
				const error = await auth.json();

				if (error?.message) {
					const event = new CustomEvent('ERR', {
						detail: {
							title: 'Error on authentication:',
							message: error.message
						}
					});

					window.dispatchEvent(event);
				}
			}
		}
	}
</script>

<form on:submit={submit}>
	<div class="login-container">
		<div class="login-box">
			<h1>Login to Excubitor</h1>
			<div class="w-full flex flex-row gap-5">
				<div class="flex flex-col basis-10/12">
					<label for="host">Host</label>
					<input type="text" placeholder="localhost" id="host" bind:value={hostVal} />
				</div>
				<div class="flex flex-col basis-2/12">
					<label for="ssl">HTTPS</label>
					<input id="ssl" type="checkbox" class="w-5 h-5 m-auto" bind:checked={ssl} />
				</div>
			</div>
			<div class="w-full">
				<label for="username">Username</label>
				<input type="text" placeholder="Username" id="username" bind:value={username} />
			</div>
			<div class="w-full">
				<label for="password">Password</label>
				<input type="password" placeholder="Password" id="password" bind:value={password} />
			</div>
			<button>Login</button>
		</div>
	</div>
</form>

<Error />

<style type="postcss">
	.login-container {
		@apply flex justify-center items-center;
		@apply min-h-screen;
		background-image: url(./background.jpg);
		background-size: cover;
	}

	.login-box {
		@apply flex justify-between items-center flex-col gap-6;
		@apply bg-white p-8 rounded-xl shadow-lg;
		@apply w-96;
	}

	h1 {
		@apply text-3xl;
	}

	input {
		@apply w-full bg-gray-100 px-4 py-2 rounded-lg;
	}

	button {
		@apply w-full bg-cyan-600 rounded-lg px-4 py-2 text-lg text-white;
	}

	button:hover {
		@apply bg-cyan-700;
	}
</style>
