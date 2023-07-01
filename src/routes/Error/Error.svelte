<script>
    let errorMessage = "";

    window.addEventListener("ERR", event => {
        errorMessage = event.detail

        setTimeout(() => {
            errorMessage = ""
        }, 5000)
    })
</script>

{#if errorMessage}
    <div class="error">
        <div class="time"></div>
        <div class="lower-container">
            <p class="error-message">
                {errorMessage}
            </p>
        </div>
    </div>
{/if}

<style>
    .error {
        @apply flex flex-col fixed bottom-10 right-10 bg-gray-50 drop-shadow-2xl rounded-xl w-96;
    }
    .lower-container {
        @apply p-5;
    }
    .time {
        @apply bg-red-500 h-2 rounded-t-xl;

        -webkit-transition-property: -webkit-transform;
        -webkit-transition-duration: 1s;
        -moz-transition-property: -moz-transform;
        -moz-transition-duration: 1s;
        -webkit-animation-name: shrink;
        -webkit-animation-duration: 5s;
        -webkit-animation-iteration-count: 1;
        -webkit-animation-timing-function: linear;
        -moz-animation-name: shrink;
        -moz-animation-duration: 5s;
        -moz-animation-iteration-count: 1;
        -moz-animation-timing-function: linear;
    }

    @keyframes shrink {
        from {
            width: 100%;
        }
        to {
            width: 0;
        }
    }
</style>