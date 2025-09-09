// 代码生成时间: 2025-09-10 06:11:18
import { writable, get, set, derived } from 'svelte/store';

// Inventory store
const inventory = writable([]);

// Derived store for filtered inventory
const filteredInventory = derived(inventory, ($inventory) => {
  const filter = get(filterStore);
  return $inventory.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
});

// Filter store
const filterStore = writable('');

// Add item function
function addItem(item) {
  try {
    set(inventory, [...get(inventory), item]);
  } catch (error) {
    throw new Error('Failed to add item: ' + error.message);
  }
}

// Remove item function
function removeItem(itemId) {
  try {
    set(inventory, get(inventory).filter(item => item.id !== itemId));
  } catch (error) {
    throw new Error('Failed to remove item: ' + error.message);
  }
}

// Update item function
function updateItem(updatedItem) {
  try {
    const index = get(inventory).findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      set(inventory, get(inventory).map((item, i) => i === index ? updatedItem : item));
    } else {
      throw new Error('Item not found');
    }
  } catch (error) {
    throw new Error('Failed to update item: ' + error.message);
  }
}

// Inventory management component
<script>
  import { onMount } from 'svelte';
  import { inventory, filteredInventory, addItem, removeItem, updateItem, filterStore } from './stores';

  // Component logic and lifecycle hooks
  onMount(() => {
    console.log('Inventory Management component mounted');
  });

  // Handlers
  function handleAdd() {
    const newItem = {
      id: Date.now(), // Simple ID generation
      name: 'New Item',
      quantity: 1
    };
    addItem(newItem);
  }

  function handleRemove(item) {
    removeItem(item.id);
  }

  function handleUpdate(item) {
    const updatedItem = {
      ...item,
      quantity: item.quantity + 1 // Example update
    };
    updateItem(updatedItem);
  }
</script>

<!-- Template -->
<main>
  <h1>Inventory Management</h1>

  <!-- Filter input -->
  <input type='text' placeholder='Filter inventory' bind:value={filterStore} />

  <!-- Inventory table -->
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each $filteredInventory as item}
        <tr>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>
            <button on:click={() => handleUpdate(item)}>Update</button>
            <button on:click={() => handleRemove(item)}>Remove</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- Add item button -->
  <button on:click={handleAdd}>Add Item</button>
</main>