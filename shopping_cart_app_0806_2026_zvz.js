// 代码生成时间: 2025-08-06 20:26:27
import { writable } from 'svelte/store';
import CartItem from './CartItem.svelte';

// Initialize the cart store with an empty array
const cart = writable([]);

// Function to add an item to the cart
export function addItem(item) {
    // Check if the item exists in the cart
    const existingItemIndex = cart.read().findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex > -1) {
        // If the item exists, update its quantity
        const updatedCart = cart.read().map((cartItem, index) => {
            if (index === existingItemIndex) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });
        cart.set(updatedCart);
    } else {
        // If the item does not exist, add it to the cart
        cart.update(currentCart => {
            return [...currentCart, { ...item, quantity: 1 }];
        });
    }
}

// Function to remove an item from the cart
export function removeItem(itemId) {
    cart.update(currentCart => {
        return currentCart.filter(item => item.id !== itemId);
    });
}

// Function to clear the cart
export function clearCart() {
    cart.set([]);
}

// Function to get the total items count in the cart
export function getTotalItemCount() {
    return cart.read().reduce((total, item) => total + item.quantity, 0);
}

// Function to get the total cost of the cart
export function getTotalCost() {
    return cart.read().reduce((total, item) => total + item.price * item.quantity, 0);
}

// Function to get the cart state
export function getCart() {
    return cart.read();
}

// Error handling for invalid operations
try {
    // Example usage:
    // addItem({ id: 1, name: 'Apple', price: 1.00 });
    // removeItem(1);
    // clearCart();
    // console.log(getTotalItemCount());
    // console.log(getTotalCost());
    // console.log(getCart());
} catch (error) {
    console.error('An error occurred in the shopping cart application:', error);
}
