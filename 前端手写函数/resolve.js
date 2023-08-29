//promise的核心用法就是利用resolve函数做链式传递
new Promise(resolve => {
  resolve('ok');
}).then(res => {
  console.log(res)
});

//output:ok
// resolve 将promise对象的状态从pending变为fullfilled，在异步操作成功时调用，并将异步操作的结果作为函数传递出去

//如果把resolve回调函数放入一个队列里，promise就将一直处于pending状态，意味着then函数一直处于waiting状态，直到队列中的resolce函数执行后，then函数才能被执行
//制造阻塞的promise
const queue = [];
new Promise(resolve => {
  queue.push(resolve);
}).then(
  res => {
    console.log(res);
  }
)
//执行
queue[0]('ok')

//异步转同步
const queue1 = [];
const fn = async  () => {
  await new Promise(resolve => {
    queue.push(resolve);
  })
}
//执行
queue[0]('ok')