// 代码生成时间: 2025-09-02 08:52:33
        // 导入Svelte内置的 writable 函数来创建可响应的变量
        import { writable } from 'svelte/store';
        
        // 创建一个可响应的变量来保存表单数据
        const formStore = writable({
            username: '',
            password: '',
            email: ''
        });
        
        // 创建一个可响应的变量来保存错误信息
        const errorsStore = writable({});
        
        // 验证函数，检查表单数据是否有效
        function validateForm() {
            let errors = {};
            const { username, password, email } = formStore();
            
            // 检查用户名是否为空
            if (!username) {
                errors.username = 'Username is required';
            }
            
            // 检查密码是否为空或太短（至少6位）
            if (!password || password.length < 6) {
                errors.password = 'Password must be at least 6 characters';
            }
            
            // 使用正则表达式检查邮箱格式是否正确
            if (!email.match(/^\S+@\S+\.\S+$/)) {
                errors.email = 'Invalid email format';
            }
            
            // 更新错误信息的可响应变量
            errorsStore.set(errors);
            
            // 如果没有错误，则返回true表示表单验证通过
            return Object.keys(errors).length === 0;
        }
    </script>
    
    <form on:submit|preventDefault={validateForm}>
        <input type="text" bind:value={formStore().username} placeholder="Username" />
        {#if $errorsStore.username}
            <p class="error">{$errorsStore.username}</p>
        {/if}
        
        <input type="password" bind:value={formStore().password} placeholder="Password" />
        {#if $errorsStore.password}
            <p class="error">{$errorsStore.password}</p>
        {/if}
        
        <input type="email" bind:value={formStore().email} placeholder="Email" />
        {#if $errorsStore.email}
            <p class="error">{$errorsStore.email}</p>
        {/if}
        
        <button type="submit">Submit</button>
    </form>
