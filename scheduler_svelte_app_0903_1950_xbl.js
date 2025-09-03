// 代码生成时间: 2025-09-03 19:50:17
import App from './App.svelte';

// 创建一个简单的定时任务调度器组件

// 定时任务调度器组件
class Scheduler {
  constructor() {
    this.jobs = [];
  }

  // 添加定时任务
  addJob(job) {
    if (!job || typeof job.run !== 'function') {
      throw new Error('Invalid job provided');
    }
    this.jobs.push(job);
  }

  // 执行所有定时任务
  runJobs() {
    this.jobs.forEach(job => job.run());
  }
}

// 定时任务类
class Job {
  constructor(name, interval) {
    this.name = name;
    this.interval = interval;
    this.timer = null;
  }

  // 启动定时任务
  start() {
    if (this.timer) {
      clearInterval(this.timer);
   }
    this.timer = setInterval(() => {
      this.run();
    }, this.interval);
  }

  // 停止定时任务
  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  // 定时任务的执行函数
  run() {
    console.log(`Job ${this.name} executed`);
  }
}

// 初始化Svelte应用
const scheduler = new Scheduler();

// 创建定时任务实例
const job1 = new Job('Job1', 2000); // 每2秒执行一次
scheduler.addJob(job1);

// 启动定时任务
job1.start();

// 在组件销毁时停止定时任务
export const onDestroy = () => {
  job1.stop();
};

// 导出Svelte组件
export default new App({
  target: document.body,
  props: {
    scheduler
  }
});