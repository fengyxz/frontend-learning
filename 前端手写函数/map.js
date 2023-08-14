Array.prototype._map = function(fn){
  const res = [];
  for( let i=0;i<this.length;i++){
    res.push(fn(this[i],i,this));
  }
  return res;
}
const arr = [1,2,3,4]
const res = arr.map((ele,index,arr) => {
  return ele*2;
})
console.log(res)

// isBinding代表回调函数（cb）中的this值的绑定对象。
// 它允许你在回调函数中使用指定的this值。
// 通过将thisBinding作为call()方法的第一个参数，
// 可以确保在执行回调函数时，该函数内部的this值与thisBinding相同。

Array.prototype.map1 = function(cb, thisBingding){
  //排除回调函数非函数情况
  if(typeof cb !== 'funciton'){
    throw new TypeError(`${cb} is not a function`);
  }
  //排除this为非可迭代对象的情况
  if(this == null || typeof this[Symbol.iterator] !== 'function'){
    throw new TypeError(`${this} is not a iterable`);
  }
  //将可迭代对象转换成数组
  const array = [...this];
  const result = [];
  for(let i = 0;i<array.length;i++){
    result.push(cb.call(thisBingding,array[i],i,this));
  }
  return result;
}

const myArray = [1, 2, 3];

function callback(item) {
  console.log(this.property + item);
}

const myObject = {
  property: 10
};

myArray.map1(callback, myObject);