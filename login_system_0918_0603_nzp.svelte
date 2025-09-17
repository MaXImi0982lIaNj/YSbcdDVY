// 代码生成时间: 2025-09-18 06:03:05
  // 导入Svelte组件库
  import { onMount, createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  
  // 创建事件分发器
  const dispatch = createEventDispatcher();
  
  // 定义可写的登录状态store
  const loginStatus = writable(false);
  
  // 用户名和密码状态store
  const username = writable('');
  const password = writable('');
  
  // 模拟的用户数据库
  const userDB = {
    'admin': 'password123'
  };
  
  // 登录函数
  function login() {
    const user = userDB[username.value];
    
    if (user && user === password.value) {
      loginStatus.set(true);
      dispatch('loginSuccess', { username: username.value });
    } else {
      dispatch('loginError', {
        error: 'Invalid username or password'
      });
    }
  }
  
  // 在组件挂载时，打印欢迎信息
  onMount(() => {
    console.log('Login system is ready!');
  });
</script>

<!-- 登录表单 -->
<form on:submit|preventDefault={login}>
  <!-- 用户名输入框 -->
  <input type="text" bind:value={username} placeholder="Username" />
  <!-- 密码输入框 -->
  <input type="password" bind:value={password} placeholder="Password" />
  <!-- 登录按钮 -->
  <button type="submit">Login</button>
  <!-- 登录状态提示 -->
  {#if $loginStatus}
    <p>Login successful! Welcome, {$username}</p>
  {#else}
    <p>Please enter your username and password.</p>
  {/if}
</form>

<!-- 事件处理和错误处理 -->
<script>
  export let onLoginSuccess;
  export let onLoginError;
  
  // 登录成功后的回调函数
  onMount(() => {
    dispatch.on('loginSuccess', (event) => {
      onLoginSuccess && onLoginSuccess(event.detail);
    });
  });
  
  // 登录失败后的回调函数
  onMount(() => {
    dispatch.on('loginError', (event) => {
      onLoginError && onLoginError(event.detail);
    });
  });
</script>