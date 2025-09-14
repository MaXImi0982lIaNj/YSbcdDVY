// 代码生成时间: 2025-09-14 22:13:59
import { onMount, writable } from 'svelte/store';
import { get } from 'svelte/store';
import axios from 'axios';

// Svelte component for the web scraper tool
export default function WebScraperTool() {
    const { subscribe, set } = writable('');
    const { subscribe: subscribeErrors, set: setErrors } = writable([]);
    const url = writable('');
    const isLoading = writable(false);

    // Function to scrape content from the provided URL
    async function scrapeContent() {
        isLoading.set(true);
        setErrors([]);
        try {
            // Reset the content and errors
            set('');
            
            // Fetch the content from the URL
            const response = await axios.get(get(url));
            set(response.data);
        } catch (error) {
            // Handle any errors that occur during the fetch
            setErrors((prevErrors) => [...prevErrors, error.toString()]);
        } finally {
            isLoading.set(false);
        }
    }

    // Subscribe to URL changes and scrape content when URL is provided
    onMount(() => {
        subscribe((content) => {
            if (get(url) !== '') {
                scrapeContent();
            }
        });
    });

    return {
        url,
        isLoading,
        scrapeContent,
        subscribeErrors,
    };
}

// Svelte markup for the web scraper tool
<script>
  export let url = '', isLoading = false, scrapeContent = () => {}, subscribeErrors = () => {};
</script>

<main>
  <h1>Web Scraper Tool</h1>
  <input
    type="text"
    bind:value={url}
    placeholder="Enter URL..."
  />
  <button on:click={scrapeContent}>Scrape Content</button>
  {#if isLoading}
    <p>Loading...</p>
  {:else}
    {#if url === ''}
      <p>Please enter a URL to scrape.</p>
    {:else}
      <p>Scraped Content:</p>
      <pre>{url}</pre>
    {/if}
  {/if}
  {#each get(subscribeErrors) as error}
    <p class="error">{error}</p>
  {/each}
</main>

<style>
  .error {
    color: red;
  }
</style>