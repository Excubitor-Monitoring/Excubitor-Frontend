<script>
	import { goto } from '$app/navigation';
	import { current_plugin } from '../stores';
	import { host, host_config, access_token, refresh_token } from '/src/stores';
	import { connectSocket } from '/src/socket.js';

	import { dev } from '$app/environment';

	import { env } from '$env/dynamic/public';

	let hostVal = env.PUBLIC_HOSTVAL == undefined ? '' : env.PUBLIC_HOSTVAL;
	let username = env.PUBLIC_USERNAME == undefined ? '' : env.PUBLIC_USERNAME;
	let password = env.PUBLIC_PASSWORD == undefined ? '' : env.PUBLIC_PASSWORD;

	async function submit() {
		host.set(hostVal);

		let auth = await fetch(`http://${hostVal}/auth`, {
			method: 'POST',
			body: JSON.stringify({
				method: 'PAM',
				credentials: {
					username: username,
					password: password
				}
			})
		});

		if (auth.status == 200) {
			const json = await auth.json();

			access_token.set(json.access_token);
			refresh_token.set(json.refresh_token);

			fetch(`http://${hostVal}/info`)
				.then((res) => res.json())
				.then((h_config) => {
					h_config.modules = h_config.modules.filter((module) => module.components?.length > 0);
					host_config.set(h_config);
				})
				.then(() => current_plugin.set($host_config.modules[0].components[0]))
				.then(() => connectSocket(`ws://${hostVal}/ws?token=${json.access_token}`))
				.then(() => goto(`/main`));
		}
	}
</script>

<form on:submit={submit}>
	<div class="login-container">
		<div class="login-box">
			<h1>Login to Excubitor</h1>
			<div class="w-full">
				<label for="host">Host</label>
				<input type="text" placeholder="localhost" id="host" bind:value={hostVal} />
			</div>
			<div class="w-full">
				<label for="username">Username</label>
				<input type="text" placeholder="Username" id="username" bind:value={username} />
			</div>
			<div class="w-full">
				<label for="password">Password</label>
				<input type="password" placeholder="Password" id="password" bind:value={password} />
			</div>
			<button on:click={submit}>Login</button>
		</div>
	</div>
</form>

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
		@apply w-full bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white;
	}

	button:hover {
		@apply bg-indigo-900;
	}
</style>
