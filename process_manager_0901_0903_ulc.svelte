// 代码生成时间: 2025-09-01 09:03:28
// ProcessManager.svelte
// A simple process manager using Svelte framework

<script>
  // Importing required Svelte and Node modules
  import { onMount, onDestroy } from 'svelte';
  import { spawn } from 'child_process';

  // State variables
  export let command;
  export let args = [];
  export let stdout = '';
  export let stderr = '';
  export let process = null;
  export let error = null;
  export let isRunning = false;
  export let exitCode = null;

  // Function to start the process
  function startProcess() {
    try {
      if (!command) {
        throw new Error('No command provided');
      }

      process = spawn(command, args);
      process.stdout.on('data', (data) => {
        stdout += data;
      });
      process.stderr.on('data', (data) => {
        stderr += data;
      });
      process.on('close', (code) => {
        exitCode = code;
        isRunning = false;
      });
      process.on('error', (err) => {
        error = err;
        isRunning = false;
      });
      isRunning = true;
    } catch (e) {
      error = e;
      isRunning = false;
    }
  }

  // Function to stop the process
  function stopProcess() {
    if (process) {
      process.kill();
      isRunning = false;
    }
  }

  // Clean up on component destruction
  onMount(() => {
    startProcess();
  });

  onDestroy(() => {
    stopProcess();
  });

</script>

<!-- UI for process manager -->
<div class="process-manager">
  <h1>Process Manager</h1>

  <div class="controls">
    <!-- Input for process command and arguments -->
    <input type="text" placeholder="Command" bind:value={command} />
    <input type="text" placeholder="Arguments" bind:value={args} />
    <button on:click={startProcess}>Start</button>
    <button on:click={stopProcess}>Stop</button>
  </div>

  <!-- Output area for stdout and stderr -->
  <div class="output">
    <h2>Standard Output</h2>
    <pre>{stdout}</pre>
  </div>
  <div class="error-output">
    <h2>Standard Error</h2>
    <pre>{stderr}</pre>
  </div>
  <div class="status">
    <h2>Status</h2>
    <p>Running: {isRunning ? 'Yes' : 'No'}</p>
    <p>Error: {error ? error.message : 'None'}</p>
    <p>Exit Code: {exitCode}</p>
  </div>
</div>
