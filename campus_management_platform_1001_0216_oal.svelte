// 代码生成时间: 2025-10-01 02:16:33
  import { onMount, writable } from 'svelte/store';

  // Stores
  const campusesStore = writable([]);
  const departmentsStore = writable([]);
  const buildingsStore = writable([]);
  const currentCampus = writable(null);
  const currentBuilding = writable(null);
  const errorMessage = writable('');

  // API endpoints
  const API_CAMPUSES = '/api/campuses';
  const API_DEPARTMENTS = '/api/departments';
  const API_BUILDINGS = '/api/buildings';

  // Fetch campuses on mount
  onMount(async () => {
    try {
      const response = await fetch(API_CAMPUSES);
      if (!response.ok) {
        throw new Error('Failed to fetch campuses');
      }
      const campuses = await response.json();
      campusesStore.set(campuses);
    } catch (error) {
      errorMessage.set(error.message);
    }
  });

  // Fetch departments for a campus
  function fetchDepartments(campusId) {
    return fetch(`${API_DEPARTMENTS}?campusId=${campusId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        return response.json();
      }).then(departments => departmentsStore.set(departments))
      .catch(error => errorMessage.set(error.message));
  }

  // Fetch buildings for a department
  function fetchBuildings(departmentId) {
    return fetch(`${API_BUILDINGS}?departmentId=${departmentId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch buildings');
        }
        return response.json();
      }).then(buildings => buildingsStore.set(buildings))
      .catch(error => errorMessage.set(error.message));
  }

  // Handlers
  function selectCampus(campus) {
    currentCampus.set(campus);
    fetchDepartments(campus.id);
  }

  function selectBuilding(building) {
    currentBuilding.set(building);
  }
</script>

<main>
  <h1>Campus Management Platform</h1>
  {#if errorMessage}
    <p class="error-message">{errorMessage}</p>
  {/if}

  <h2>Select Campus</h2>
  <ul>
    {#each $campusesStore as campus}
      <li on:click={() => selectCampus(campus)} class="campus-item">{campus.name}</li>
    {/each}
  </ul>

  {#if $currentCampus}
    <h2>Select Department</h2>
    <ul>
      {#each $departmentsStore as department}
        <li on:click={() => fetchBuildings(department.id)} class="department-item">{department.name}</li>
      {/each}
    </ul>

    <h2>Buildings</h2>
    <ul>
      {#each $buildingsStore as building}
        <li on:click={() => selectBuilding(building)} class="building-item">{building.name}</li>
      {/each}
    </ul>
  {/if}

  {#if $currentBuilding}
    <div class="selected-building">
      <h3>Selected Building: {$currentBuilding.name}</h3>
      <!-- Additional information about the selected building can be displayed here. -->
    </div>
  {/if}
</main>

<style>
  .error-message { color: red; }
  .campus-item, .department-item, .building-item { cursor: pointer; }
  .selected-building { margin-top: 20px; }
</style>

<!--
  ## Documentation
  - This Svelte application provides a user interface for managing campus information.
  - It includes fetching campuses, departments, and buildings from an API.
  - Users can select a campus to view its departments and buildings.
  - Error messages are displayed for any failed API requests.
  - The application is designed to be clear, maintainable, and extensible.
  - Proper error handling and comments are included to ensure understandability.
  ## Best Practices
  - Use of Svelte stores for state management.
  - Error handling with try-catch blocks.
  - Clear comments and documentation for maintainability.
  - UI components are separated for better modularity.
  ## Extensibility
  - Additional features such as adding, editing, or deleting campus information can be easily added.
  - The API endpoints can be extended to include more actions like POST, PUT, DELETE.
  - The UI can be expanded to include more detailed views or additional functionalities.
-->
