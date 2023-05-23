<script>
	import { goto } from "$app/navigation";
	import { current_plugin } from "../stores";
    import { host, host_config, access_token, refresh_token } from "/src/stores";
    import {connectSocket} from '/src/socket.js'

    import { PUBLIC_HOSTVAL, PUBLIC_USERNAME, PUBLIC_PASSWORD } from '$env/static/public';

    let hostVal = PUBLIC_HOSTVAL;
    let username = PUBLIC_USERNAME;
    let password = PUBLIC_PASSWORD;

    async function submit(){

        host.set(hostVal);

        let auth = await fetch(`http://${hostVal}:8080/auth`, {
            method: "POST",
            body: JSON.stringify({
                method: "PAM",
                credentials: {
                    username: username,
                    password: password
                }
            })
        })

        auth = await auth.json();
        access_token.set(auth.access_token);
        refresh_token.set(auth.refresh_token);

        fetch(`http://${hostVal}:8000/info`)
            .then(res => res.json()
            .then(json => host_config.set(json)))
            .then(() => console.log($host_config))
            .then(() => current_plugin.set($host_config.modules[0]))
            .then(() => connectSocket(`ws://${hostVal}:8080/ws?token=${auth.access_token}`))
            .then(() => goto(`/main`));
    }
</script>

<div class="login-container">
    <div class="login-box">
        <h1>Login to Excubitor</h1>
        <div class="w-full">
            <label for="host">Host</label>
            <input type="text" placeholder="localhost" id="host" bind:value={hostVal}>
        </div>
        <div class="w-full">
            <label for="username">Username</label>
            <input type="text" placeholder="Username" id="username" bind:value={username}>
        </div>
        <div class="w-full">
            <label for="password">Password</label>
            <input type="password" placeholder="Password" id="password" bind:value={password}>
        </div>        
        <button on:click={submit}>Login</button>
    </div>
</div>

<style type="postcss">
    .login-container {
        @apply flex justify-center items-center;
        @apply min-h-screen;
        background-image: url(./background.jpg);
        background-size: cover;
    }

    .login-box{
        @apply flex justify-between items-center flex-col gap-6;
        @apply bg-white p-8 rounded-xl shadow-lg;
        @apply w-96;
    }

    h1{
        @apply text-3xl;
    }

    input{
        @apply w-full bg-gray-100 px-4 py-2 rounded-lg;
    }

    button{
        @apply w-full bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white;
    }


</style>