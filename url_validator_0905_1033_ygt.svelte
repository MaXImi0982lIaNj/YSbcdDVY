// 代码生成时间: 2025-09-05 10:33:32
    import { onMount, writable } from 'svelte/store';
    import { validateURL } from './validateURL.js';

    // URL validation state store
    const urlStore = writable('');
    const isValidUrlStore = writable(false);
    const errorMessageStore = writable('');

    // Function to validate URL on input change
    function validateInput(url) {
        const valid = validateURL(url);
        if (valid) {
            isValidUrlStore.set(true);
            errorMessageStore.set('');
        } else {
            isValidUrlStore.set(false);
            errorMessageStore.set('Invalid URL');
        }
    }

    // Mount the function to update URL on input
    onMount(() => {
        urlStore.subscribe((url) => {
            validateInput(url);
        });
    });
</script>

<!-- Input field for URL validation -->
<input type="text" bind:value={urlStore} placeholder="Enter URL" on:input={validateInput} />

<!-- Display validation result -->
{#if !isValidUrlStore}
    <p class="error-message">{errorMessageStore}</p>
{:else}
    <p class="success-message">URL is valid!</p>
{/if}

<style>
    .error-message { color: red; }
    .success-message { color: green; }
</style>

