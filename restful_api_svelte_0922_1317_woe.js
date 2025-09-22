// 代码生成时间: 2025-09-22 13:17:25
const express = require('express');
// 引入Svelte编译器
const { compile } = require('svelte/compiler');

const app = express();
const port = 3000;

// 用于模拟数据库的内存数据结构
let users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' },
];

// 中间件：解析JSON请求体
app.use(express.json());

// 获取所有用户
app.get('/api/users', (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 获取单个用户
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === parseInt(id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// 创建新用户
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  newUser.id = users.length + 1; // 简单的ID生成
  users.push(newUser);
  res.status(201).json(newUser);
});

// 更新用户信息
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const updatedUser = { ...users[userIndex], ...req.body };
  users[userIndex] = updatedUser;
  res.status(200).json(updatedUser);
});

// 删除用户
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.status(200).json({ message: 'User deleted' });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// 请注意，实际生产环境中，应当使用数据库代替内存中的数组，并添加适当的安全措施，如验证、授权等。