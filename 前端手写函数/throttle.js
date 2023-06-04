//what is throttle
//节流指的是指定时间间隔内只会执行一次任务
//n秒内只运行一次，若n秒内重复触发，只有一次生效
//benefits
//优化项目性能，减少一些时间的频繁调用
//例如scroll（懒加载记录滚动条的位置），mousemove（鼠标移动）
function throttle1(func,delay){
  let currentTime = Date.now();
  return (...args) => {
    let nowTime = Date.now();
    if(nowTime - currentTime > delay){
      func(...args);
      currentTime = nowTime;
    }
  }
}

function throttle1(func,delay){
  const timer = null;
  return (...args) => {
    if(timer)return;
    timer = setTimeout(()=>{
      func(...args);
      timer = null;
    },delay);
  }
}