// 代码生成时间: 2025-08-01 20:00:31
import { onMount } from 'svelte';
import { get, post, error } from 'svelte-requests';

// Constants for API endpoints
const API_LOGIN = '/api/login';
const API_GET_USER = '/api/get_user';
const API_LOGOUT = '/api/logout';

// Shared state store
import { writable } from 'svelte/store';
const user = writable(null);

// Function to check if user has the required permissions
function hasPermission(user, requiredRoles) {
  return user && requiredRoles.every(role => user.roles.includes(role));
}

// Svelte component for Access Control
export default function AccessControl({ requiredRoles }) {
  let errorMessage = '';
  let isLoading = true;
  
  // Handles login
  async function handleLogin(username, password) {
    try {
      const response = await post(API_LOGIN, { username, password });
      if (response.ok) {
        user.set(response.data);
        errorMessage = '';
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      errorMessage = error.message || 'Login failed';
    }
  }
  
  // Handles logout
  function handleLogout() {
    user.set(null);
  }
  
  // Check access on component load
  onMount(async () => {
    if (user) {
      try {
        const response = await get(API_GET_USER);
        if (response.ok) {
          user.set(response.data);
          isLoading = false;
        } else {
          throw new Error(response.error);
        }
      } catch (error) {
        errorMessage = error.message || 'Failed to load user';
        isLoading = false;
      }
    }
  });
  
  // Render the component
  return {
    errorMessage,
    isLoading,
    handleLogin,
    handleLogout,
    hasPermission
  };
}

// Example usage of AccessControl component
// <script context="module">
//   import AccessControl from './access_control_svelte.js';
// </script>

// <script>
//   const { handleLogin, handleLogout, hasPermission, errorMessage, isLoading } = 
//     AccessControl({ requiredRoles: ['admin', 'user'] });
// </script>

// <div>
//   {#if isLoading}
//     Loading...
//   {:else if errorMessage}
//     Error: {errorMessage}
//   {:else}
//     {#if hasPermission(user, ['admin'])}
//       You have admin access.
//     {:else if hasPermission(user, ['user'])}
//       You have user access.
//     {:else}
//       You do not have the required access.
//     {/if}
//     <button on:click={handleLogin}>Login</button>
//     <button on:click={handleLogout} disabled={!user}>Logout</button>
//   {/if}
// </div>
