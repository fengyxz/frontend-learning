// what is debounce？
// 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时

// benefits
// 1.优化项目性能，让项目运行得更快更好
// 2.可以减少频繁更新、函数的重复调用、多次网络请求等情况
function debounce(func,delay){
  let timer = null;
  return(...args) => {
    if(timer){
      //如果原先的timer还没结束，则前一个被打断，清除timer
      clearTimeout(timer);
      timer = null;
    }
    //设定新的timer
    timer = setTimeout(() => {
      func(...args);
    },delay);
  }
}