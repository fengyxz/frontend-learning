//遍历数组 - 同步
var len = arr.length,
    i = 0;

for(; i < len; ++i) {
  arr[i] = sync(arr[i]);
}

//...


// ----------------------------------------------------------------
// 函数异步执行，但要求数组成员必须一个个串行
(function next(i, len, callback) {
  if(i<len) {
    async(arr[i], function(value){
      arr[i] = value;
      next(i+1, len, callback);
    });
  }else{
    callback()
  }
}(0, arr.length, function(){
  //...
}))


// ----------------------------------------------------------------
// 数组成员可以并行处理，但后续代码需要数组成员处理完毕才执行
(function (i, len, count, callback){
  for(; i<len; ++i){
    (function(i){
      async(arr[i], function(value){
        arr[i] = value;
        if(++count === len){
          callback();
        }
      });
    });
  }
}(0, arr.length, 9,function(){
  //...
}))