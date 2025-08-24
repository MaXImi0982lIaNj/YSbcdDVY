// 代码生成时间: 2025-08-24 19:13:42
  // Define the shopping cart store
  import { writable } from 'svelte/store';
  
  const cartStore = writable([]);

  // Add an item to the cart
  export function addItemToCart(item) {
    try {
      const cart = cartStore.read();
      const existingItemIndex = cart.findIndex(x => x.id === item.id);
      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({ ...item, quantity: 1 });
      }
      cartStore.set(cart);
    } catch (error) {
      console.error("Error adding item to cart: ", error);
    }
  }

  // Remove an item from the cart
  export function removeItemFromCart(itemId) {
    try {
      const cart = cartStore.read();
      const updatedCart = cart.filter(item => item.id !== itemId);
      cartStore.set(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  }

  // Clear the cart
  export function clearCart() {
    cartStore.set([]);
  }
</script>

<!--
  Shopping Cart Component Template
  Display cart items and provide actions to remove items
-->

<main>
  <h1>Shopping Cart</h1>
  <ul>
    {#each $cartStore as item}
      <li>
        <span>{item.name} - Quantity: {item.quantity}</span>
        <button on:click={() => removeItemFromCart(item.id)}>Remove</button>
      </li>
    {/each}
    <li>Total Items: {$cartStore.length}</li>
  </ul>
  <button on:click={clearCart}>Clear Cart</button>
</main>
