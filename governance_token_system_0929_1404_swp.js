// 代码生成时间: 2025-09-29 14:04:36
import { writable } from 'svelte/store';

// 创建一个writable store来管理代币余额
const tokenBalance = writable(0);

// 治理代币系统的主类
class GovernanceTokenSystem {
  // 构造函数初始化代币信息
  constructor(initialSupply, tokenName) {
    this.initialSupply = initialSupply;
    this.tokenName = tokenName;
  }

  // 发行代币
  issueTokens(amount) {
    if (amount <= 0) {
      throw new Error('发行的代币数量必须大于0');
    }
    tokenBalance.update((currentBalance) => currentBalance + amount);
  }

  // 兑换代币
  redeemTokens(amount) {
    if (amount <= 0) {
      throw new Error('兑换的代币数量必须大于0');
    }
    if (amount > tokenBalance.value) {
      throw new Error('兑换的代币数量超过了当前余额');
    }
    tokenBalance.update((currentBalance) => currentBalance - amount);
  }

  // 获取当前代币余额
  getCurrentBalance() {
    return tokenBalance.value;
  }
}

// 创建治理代币系统实例
const governanceToken = new GovernanceTokenSystem(1000, '治理代币');

// 导出store和治理代币系统实例
export { tokenBalance, governanceToken };
