// 代码生成时间: 2025-08-12 05:16:17
// Import necessary Svelte components and stores
import { writable } from 'svelte/store';
import Item from './components/Item.svelte';

// Create a store for inventory items
const inventoryItems = writable([]);

// Functions to manipulate inventory items
function createItem(itemData) {
    try {
        inventoryItems.update(items => {
            return [...items, itemData];
        });
    } catch (error) {
        console.error('Error creating item:', error);
    }
}

function updateItem(itemId, updatedData) {
    try {
        inventoryItems.update(items => {
            return items.map(item =>
                item.id === itemId ? { ...item, ...updatedData } : item
            );
        });
    } catch (error) {
        console.error('Error updating item:', error);
    }
}

function deleteItem(itemId) {
    try {
        inventoryItems.update(items => {
            return items.filter(item => item.id !== itemId);
        });
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}

// Export the store and functions for use in Svelte components
export {
    inventoryItems,
    createItem,
    updateItem,
    deleteItem
};
