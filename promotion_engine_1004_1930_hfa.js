// 代码生成时间: 2025-10-04 19:30:48
import { writable } from 'svelte/store';

// PromotionStore store to manage promotion data and state
const PromotionStore = writable({
  promotions: [],
  currentPromotion: null,
  error: null
});

// Function to load promotions from an API or data source
function loadPromotions() {
  try {
    // Simulating a fetch request to a promotions API
    // Replace with actual API call
    const apiResponse = {
      promotions: [
        { id: 1, name: 'Summer Sale', description: '20% off on all items', isActive: true },
        { id: 2, name: 'Winter Discount', description: '30% off on selected items', isActive: false }
      ]
    };

    // Set the loaded promotions in the store
    PromotionStore.update((store) => ({
      ...store,
      promotions: apiResponse.promotions,
      error: null
    }));
  } catch (error) {
    // Set error in the store if the API call fails
    PromotionStore.update((store) => ({
      ...store,
      error: 'Failed to load promotions'
    }));
  }
}

// Function to select a current promotion
function selectPromotion(promotionId) {
  const selectedPromotion = PromotionStore.subscribe((store) =>
    store.promotions.find((promo) => promo.id === promotionId)
  );

  PromotionStore.update((store) => ({
    ...store,
    currentPromotion: selectedPromotion
  }));
}

// Function to activate a promotion
function activatePromotion(promotionId) {
  PromotionStore.update((store) => {
    const updatedPromotions = store.promotions.map((promo) => {
      if (promo.id === promotionId) {
        return { ...promo, isActive: true };
      }
      return promo;
    });

    return {
      ...store,
      promotions: updatedPromotions,
      currentPromotion: updatedPromotions.find((promo) => promo.id === promotionId)
    };
  });
}

// Function to deactivate a promotion
function deactivatePromotion(promotionId) {
  PromotionStore.update((store) => {
    const updatedPromotions = store.promotions.map((promo) => {
      if (promo.id === promotionId) {
        return { ...promo, isActive: false };
      }
      return promo;
    });

    return {
      ...store,
      promotions: updatedPromotions,
      currentPromotion: null
    };
  });
}

// Exporting the store and functions for use in Svelte components
export {
  PromotionStore,
  loadPromotions,
  selectPromotion,
  activatePromotion,
  deactivatePromotion
};