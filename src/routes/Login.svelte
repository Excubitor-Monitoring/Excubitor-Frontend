<div class="login-container">
    <div class="login-box">
        <h1>Login to Excubitor</h1>
        <div class="w-full">
            <label for="host">Host</label>
            <input type="text" placeholder="localhost" id="host">
        </div>
        <div class="w-full">
            <label for="username">Username</label>
            <input type="text" placeholder="Username" id="username">
        </div>
        <div class="w-full">
            <label for="password">Password</label>
            <input type="password" placeholder="Password" id="password">
        </div>        
        <button>Login</button>
    </div>
</div>

<style type="postcss">
    :global(body) {
        background-image: url(./background.jpg);
        background-size: cover;
    }

    .login-container {
        @apply flex justify-center items-center;
        @apply h-screen;
    }

    .login-box{
        @apply flex justify-between items-center flex-col gap-6;
        @apply bg-white p-8 rounded-xl shadow-lg;
        @apply w-1/5;
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