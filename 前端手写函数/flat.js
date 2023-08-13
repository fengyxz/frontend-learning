const arr = [1, [2, 3, [[4, [5,88]]]], 1, 2, [6, 7]]

//1. 数组全部扁平化
Array.prototype.flat = function() {
  return this.reduce((pre, cur) => {
    cur instanceof Array ? pre.push(...cur.flat()):pre.push(cur);
    return pre;
  },[]);
}

//2. 设置扁平化的深度
Array.prototype.flatdeep = function(deep = 1){
  let res = [];
  deep--;
  for(const p of this){
    if(Array.isArray(p) && deep >= 0){
      res = res.concat(p.flatdeep(deep));
    }else{
      res.push(p);
    }
  }
  return res;
}

console.log(arr.flat());
console.log(arr.flatdeep(1));

