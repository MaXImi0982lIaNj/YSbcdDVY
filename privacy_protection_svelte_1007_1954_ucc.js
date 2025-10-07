// 代码生成时间: 2025-10-07 19:54:43
import { writable } from 'svelte/store';

// Define the privacy settings store
const privacySettings = writable({
  dataCollectionEnabled: true,
  shareDataWithThirdParties: false
});

// Function to update privacy settings
function updatePrivacySettings(settings) {
  try {
    // Validate the settings
    if (settings.dataCollectionEnabled !== undefined) {
      settings.dataCollectionEnabled = Boolean(settings.dataCollectionEnabled);
    }
    if (settings.shareDataWithThirdParties !== undefined) {
      settings.shareDataWithThirdParties = Boolean(settings.shareDataWithThirdParties);
    }
    
    // Update the store
    privacySettings.update(currentSettings => ({
      ...currentSettings,
      ...settings
    }));
  } catch (error) {
    console.error('Error updating privacy settings:', error);
  }
}

// Privacy Protection Svelte component
export default function PrivacyProtection() {
  // Subscribe to the privacy settings store
  const settings = privacySettings.subscribe();
  
  return {
    // Getter for the privacy settings
    getPrivacySettings: () => settings.data,
    // Method to toggle data collection
    toggleDataCollection: () => {
      updatePrivacySettings({ dataCollectionEnabled: !settings.data.dataCollectionEnabled });
    },
    // Method to toggle sharing data with third parties
    toggleShareDataWithThirdParties: () => {
      updatePrivacySettings({ shareDataWithThirdParties: !settings.data.shareDataWithThirdParties });
    }
  };
}
