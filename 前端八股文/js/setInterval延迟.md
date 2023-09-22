`setInterval`有延迟

原因：
- 浏览器中所有的js都在单线程上执行，异步时间仅在线程空闲时才会被调度
- js中有任务队列，异步事件任务会按照将他们添加到队列的顺序执行
- setTimeout()的第二个参数delay，只是告诉js再过多长时间把当前任务添加到队列中，如果队列是空的，那么添加的代码会立即执行；如果不是，那么要等前面的代码执行完

解决方法

1. 动态计算时差（仅针对循环定时，修正）
```javascript
var count = count2 = 0;
var runTime, runTime2;
var startTime, startTime2 = performance.now();

//normal task
setInterval(function() {
  runTime2 = performance.now();
  ++count2;
  console.log("normal task",count2,'---delay: '+(runTime2 - (startTime2 + count * 1000))+'ms');
}, 1000)

//optimized - dynamically calculate
startTime = performance.now();
setTimeout(function func(){
  runTime = performance.now();
  ++count;
  let time = (runTime - (startTime + count * 1000));
  console.log("optimized task",count + '---delay: '+ time + 'ms')
  t = setTimeout(func, 1000 - time);
},1000)

//耗时任务
setInterval(function(){
    let i = 0;
    while(i++ < 100000000);
}, 0);

```

2. 使用Web Worker
web worker的作用就是为js创造多线程环境，允许主线程创建worker线程，将一些任务分配给后者运行。在主线程运行时，worker线程在后台运行，两者互不干扰。等worker线程完成计算任务，再把结果返回给主线程。

好处是：一些计算密集型或高延迟的任务，被worker线程负担了，主线程会很流畅，不会被阻塞或拖慢
```html
 <!-- index.html -->
   <html>
   <meta charset="utf-8">
   <body>
   <script type="text/javascript">
   var count = 0;
   var runTime;
    
   //performance.now()相对Date.now()精度更高，并且不会受系统程序堵塞的影响。
   //API：https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/now
   var startTime = performance.now(); //获取当前时间 
   
   //普通任务-对比测试
   setInterval(function(){
       runTime = performance.now();
       ++count;    
       console.log("普通任务",count + ' --- 普通任务延时：' + (runTime - (startTime + 1000))+' 毫秒');
       startTime = performance.now();
   }, 1000);
   
   //耗时任务
   setInterval(function(){
       let i = 0;
       while(i++ < 100000000);
   }, 0);
   
   // worker 解决方案
   let worker = new Worker('worker.js');
   </script>
   </body>
   </html>
   ```
   ```javascript
   // worker.js
   var count = 0;
   var runTime;
   var startTime = performance.now();
   setInterval(function(){
       runTime = performance.now();
       ++count;    
       console.log("worker任务",count + ' --- 延时：' + (runTime - (startTime + 1000))+' 毫秒');
       startTime = performance.now();
   }, 1000);
```
web Worker注意点：

（1）同源限制：分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

（2）DOM 限制：Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。但是，Worker 线程可以navigator对象和location对象。

（3）通信联系：Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

（4）脚本限制：Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

（5）文件限制：Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。


HTML5标准规定
- setTimeout的最短时间间隔是4毫秒；
- setInterval的最短间隔时间是10毫秒