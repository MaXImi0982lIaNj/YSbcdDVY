// 代码生成时间: 2025-10-01 16:22:24
  import { onMount, onDestroy } from 'svelte';

  // Define a type for the probability distribution function
  type DistributionFunction = (probability: number) => number;

  // Define a type for the component's state
  type DistributionState = {
    probability: number,
    distribution: number,
    error: string | null,
    distributions: Record<string, DistributionFunction>,
  };

  const initialState: DistributionState = {
    probability: 0.5,
    distribution: 0,
    error: null,
    distributions: {
      uniform: (p) => 1,
      exponential: (p) => p,
      normal: (p) => 1 / Math.sqrt(2 * Math.PI) * Math.exp(-p * p / 2),
    },
  };

  let state: DistributionState = initialState;

  // Function to calculate the probability distribution
  function calculateDistribution(probability: number): number {
    try {
      // Default to uniform distribution if not found
      const distribution = state.distributions[state.probability] || state.distributions.uniform;
      state.distribution = distribution(probability);
      state.error = null;
    } catch (e) {
      state.error = 'Error calculating distribution';
    }
  }

  // Update the distribution whenever the probability changes
  function updateDistribution(): void {
    calculateDistribution(state.probability);
  }

  // Listen for input changes
  onMount(() => {
    updateDistribution();
  });
</script>

<!-- Template for the component -->
<div>
  <!-- Input for probability value -->
  <input
    type="number"
    step="0.01"
    value="{state.probability}"
    on:input="(e) => { state.probability = parseFloat(e.target.value); updateDistribution(); }"
  />

  <!-- Display the calculated distribution value -->
  <p>Distribution: {state.distribution.toFixed(4)}</p>

  <!-- Display any error messages -->
  {#if state.error}
    <p class="error">{state.error}</p>
  {/if}
</div>

<style>
  .error {
    color: red;
  }
</style>

<script lang="ts">
  // This script section is for type definition and not required for functionality
  // It's used to provide proper type hints for TypeScript users
  export let probability: number = initialState.probability;
</script>