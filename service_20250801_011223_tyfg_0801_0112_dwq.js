// 代码生成时间: 2025-08-01 01:12:23
// 导入必需的模块
const fs = require('fs');
const path = require('path');

// 函数：读取目录并返回其结构
function readDirectoryStructure(directoryPath) {
  try {
    const filesAndDirs = fs.readdirSync(directoryPath);
    let structure = {};
    filesAndDirs.forEach(item => {
      const fullPath = path.join(directoryPath, item);
      if (fs.statSync(fullPath).isDirectory()) {
        structure[item] = readDirectoryStructure(fullPath);
      }
    });
    return structure;
  } catch (error) {
    console.error('Error reading directory:', error);
    throw error;
  }
}

// 函数：打印文件夹结构
function printDirectoryStructure(directoryStructure) {
  console.log(JSON.stringify(directoryStructure, null, 2));
}

// 主程序
(function main() {
  // 获取用户输入的目录路径
  const directoryPath = process.argv[2];
  if (!directoryPath) {
    console.error('Please provide a directory path as an argument.');
    process.exit(1);
  }

  // 检查提供的路径是否是一个目录
  if (!fs.existsSync(directoryPath) || !fs.statSync(directoryPath).isDirectory()) {
    console.error('The provided path is not a valid directory.');
    process.exit(1);
  }

  // 读取并打印目录结构
  const directoryStructure = readDirectoryStructure(directoryPath);
  printDirectoryStructure(directoryStructure);
})();