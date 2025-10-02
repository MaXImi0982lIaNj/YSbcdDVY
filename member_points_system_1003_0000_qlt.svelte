// 代码生成时间: 2025-10-03 00:00:22
<!-- member_points_system.svelte -->
<script>
  // Svelte store to hold member points data
  import { writable } from 'svelte/store';
  
  // Create a writable store for the member points
  const pointsStore = writable({ points: 0 });
  
  // Function to add points to a member's account
  function addPoints(amount) {
    const points = pointsStore.subscribe();
    
    try {
      // Check if the amount is a positive integer
      if (amount <= 0) {
        throw new Error('Points amount must be a positive number.');
      }
      
      // Update the points store
      pointsStore.update((currentPoints) => ({ points: currentPoints.points + amount }));
    } catch (error) {
      console.error(error);
    }
  }
  
  // Function to deduct points from a member's account
  function deductPoints(amount) {
    const points = pointsStore.subscribe();
    
    try {
      // Check if the amount is a positive integer
      if (amount <= 0) {
        throw new Error('Points amount must be a positive number.');
      }
      
      // Check if there are enough points to deduct
      if (points.points < amount) {
        throw new Error('Insufficient points to deduct.');
      }
      
      // Update the points store
      pointsStore.update((currentPoints) => ({ points: currentPoints.points - amount }));
    } catch (error) {
      console.error(error);
    }
  }
</script>

<!-- Display the current points and buttons to add or deduct points -->
<div>
  <h1>Member Points System</h1>
  <p>Your current points: {$pointsStore.points}</p>
  <button on:click={() => addPoints(10)}>Add 10 Points</button>
  <button on:click={() => deductPoints(5)}>Deduct 5 Points</button>
</div>
