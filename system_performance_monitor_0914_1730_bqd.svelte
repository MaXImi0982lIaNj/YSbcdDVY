// 代码生成时间: 2025-09-14 17:30:26
import { onMount, onDestroy } from 'svelte';
import { getSystemMetrics } from './systemMetrics.js'; // Assuming an external module to fetch system metrics

export let updateInterval = 1000; // Default update interval in milliseconds

// Component state
let intervalId;

// Get system metrics and update the component state
const fetchSystemMetrics = async () => {
    try {
        const metrics = await getSystemMetrics();
        // Handle the fetched metrics, e.g., set them to component's state
    } catch (error) {
        console.error('Failed to fetch system metrics:', error);
    }
};

// Component lifecycle
onMount(() => {
    intervalId = setInterval(fetchSystemMetrics, updateInterval);
});

onDestroy(() => {
    clearInterval(intervalId);
});

// Svelte component template
<script>
  export let metrics;
  export let lastUpdated;
</script>

<!-- Display system metrics in a user-friendly way -->
<div>
  <h1>System Performance</h1>
  <p>Updated at: {lastUpdated}</p>
  <ul>
    <li>CPU Usage: {metrics.cpuUsage}%</li>
    <li>Memory Usage: {metrics.memoryUsage}%</li>
    <li>Disk Usage: {metrics.diskUsage}%</li>
    <!-- Add more metrics as needed -->
  </ul>
</div>
