- 如果promise中出现error且没有被处理
例如
```javascript
new Promise(function(){
  noSuchFunction()//error
})
  .then(() => {
    //
  });//there is no .catch
```
如果出现error，promise的状态将变成rejected，然后执行应该跳转至最近的rejection处理程序，没有的话就会卡住，没有代码处理它
当发生一个常规的error并且没有被try...catch捕获，此时脚本死了，并在控制台中留下信息。
js引擎会跟踪此类rejection，在这种情况下会生成一个全局的error。在浏览器中，我们可以使用unhandledrejection事件来捕获这类error。
```javascript
window.addEventListener('unhandledjection', function(event){
  alert(event.promise);
  alert(event.reason);
})

new Promise(function() {
  throw new Error("Whoops")
})
```