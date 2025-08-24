// 代码生成时间: 2025-08-25 07:12:20
  // 表单数据验证器组件

  export let formData = {

    username: '',

    email: '',

    password: '',

  };



  // 验证规则对象

  const validationRules = {

    username: {

      required: true,

      minLength: 3,

      maxLength: 20,

      regex: /^[a-zA-Z0-9]+$/,

    },

    email: {

      required: true,

      emailRegex: /^[^@]+@[^@]+\.[^@]+$/,

    },

    password: {

      required: true,

      minLength: 8,

    },

  };



  // 错误消息对象

  const errorMessages = {

    username: {

      required: 'Username is required',

      minLength: 'Username must be at least 3 characters',

      maxLength: 'Username cannot exceed 20 characters',

      regex: 'Username must contain only alphanumeric characters',

    },

    email: {

      required: 'Email is required',

      emailRegex: 'Invalid email format',

    },

    password: {

      required: 'Password is required',

      minLength: 'Password must be at least 8 characters',

    },

  };



  // 验证表单数据

  function validateForm() {

    let isValid = true;

    const errors = {};


    for (const field in formData) {

      const fieldData = formData[field];
      const rules = validationRules[field];
      const messages = errorMessages[field];

      for (const rule in rules) {
        if (rules[rule] !== undefined) {

          switch (rule) {
            case 'required':
              if (!fieldData) {
                errors[field] = messages[rule];
                isValid = false;
                break;
              }
              break;
            case 'minLength':
              if (fieldData.length < rules[rule]) {
                errors[field] = messages[rule];
                isValid = false;
                break;
              }
              break;
            case 'maxLength':
              if (fieldData.length > rules[rule]) {
                errors[field] = messages[rule];
                isValid = false;
                break;
              }
              break;
            case 'regex':
              if (!rules[rule].test(fieldData)) {
                errors[field] = messages[rule];
                isValid = false;
                break;
              }
              break;
            case 'emailRegex':
              if (!rules[rule].test(fieldData)) {
                errors[field] = messages[rule];
                isValid = false;
                break;
              }
              break;
          }
        }
      }
    }

    // 清除先前的错误消息
    if (isValid) {
      // 表单验证通过，执行进一步操作，例如提交表单
      console.log('Form is valid');
    } else {
      // 表单验证失败，显示错误消息
      console.error('Form validation errors:', errors);
    }

    return isValid;
  }


</script>


<!-- 表单模板 -->

<form on:submit|preventDefault>{validateForm()}>

  <label for="username">Username:</label>
  <input
    type="text"
    id="username"
    name="username"
    value="{formData.username}"
    on:input="formData.username = event.target.value"
  >
  {#if errors.username}
    <p class="error">{errors.username}</p>
  {/if}

  <label for="email">Email:</label>
  <input
    type="email"
    id="email"
    name="email"
    value="{formData.email}"
    on:input="formData.email = event.target.value"
  >
  {#if errors.email}
    <p class="error">{errors.email}</p>
  {/if}

  <label for="password">Password:</label>
  <input
    type="password"
    id="password"
    name="password"
    value="{formData.password}"
    on:input="formData.password = event.target.value"
  >
  {#if errors.password}
    <p class="error">{errors.password}</p>
  {/if}

  <button type="submit">Submit</button>

</form>

