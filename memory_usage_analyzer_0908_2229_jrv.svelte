// 代码生成时间: 2025-09-08 22:29:16
        // Import necessary modules
        import { onMount } from 'svelte';
        import { readable } from 'svelte/store';
        import { getMemoryUsage } from './memoryUtils';
    </script>
    
    <script lang="javascript">
        // Define a store to hold memory usage data
        const memoryUsage = readable(null, function start(set) {
            // Initial value is null, will be set later
            set(null);

            // Function to fetch memory usage and update the store
            function updateMemoryUsage() {
                try {
                    // Retrieve memory usage data using the utility function
                    const usage = getMemoryUsage();
                    // Update the store with the new memory usage data
                    set(usage);
                } catch (error) {
                    // Handle errors, such as API failure or invalid response
                    console.error('Failed to fetch memory usage:', error);
                    set({ error: 'Failed to fetch memory usage' });
                }
            }

            // Fetch memory usage on component mount
            onMount(() => {
                updateMemoryUsage();
                // Set an interval to update memory usage every 5 seconds
                const interval = setInterval(updateMemoryUsage, 5000);
                // Clear the interval when the component is destroyed
                return () => clearInterval(interval);
            });
        });
    </script>
    
    <main>
        <!-- Display memory usage data or error message -->
        {#if $memoryUsage.error}
            <p>Error: {$memoryUsage.error}</p>
        {:else if $memoryUsage}
            <p>Memory Usage: {$memoryUsage.used} MB out of {$memoryUsage.total} MB</p>
        {:else}
            <p>Loading memory usage...</p>
        {/if}
    </main>
    
    <style>
        /* Add some basic styling */
        main {
            text-align: center;
            padding: 20px;
        }
    </style>
    
    