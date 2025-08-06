// 代码生成时间: 2025-08-07 03:47:43
 * Features:
 * - Fetches system processes.
 * - Displays processes with their details.
 * - Handles errors gracefully.
 */

<script>
  // Define a reactive variable to hold the processes
  import { onMount, writable } from 'svelte/store';
  import axios from 'axios';

  const processes = writable([]);

  // Function to fetch system processes
  async function fetchProcesses() {
    try {
      const response = await axios.get('/api/processes');
      processes.set(response.data);
    } catch (error) {
      console.error('Failed to fetch processes:', error);
    }
  }

  // Call fetchProcesses on component mount
  onMount(fetchProcesses);
</script>

<!-- Display processes in a table -->
<main>
  <h1>Process Manager</h1>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>CPU Usage</th>
        <th>Memory Usage</th>
      </tr>
    </thead>
    <tbody>
      {#each $processes as process}
        <tr>
          <td>{process.id}</td>
          <td>{process.name}</td>
          <td>{process.cpuUsage}%</td>
          <td>{process.memoryUsage}MB</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>