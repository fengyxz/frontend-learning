// 深拷贝
// 现有的轮子：`lodash`库中的`_.cloneDeep(obj)_`
// 自己写见手写算法题部分，主要思路
// - 首先看是否是简单数据类型，是-直接返回
// - 利用`constructor`看是不是Date、Function、RegExp、Map、Set，是的话调用构造函数
// - 为了防止循环引用，闭包一个map，如果已经出现过则直接返回，否则新生成
// - 利用拷贝循环进行拷贝

const deepClone = (target, map = new WeakMap()) => {
  if(typeof target !== 'object' || target === null)return target;
  
  const constructor = target.constructor;
  if(/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name))return new constructor(target);
  if(map.get(target))return map.get(target);
  
  let newObj = Array.isArray(target)? []:{};
  map.set(target, newObj);
  
  Object.keys(target).forEach(key => {
    newObj[key] = deepClone(target[key],map);
  })

  return newObj;
}

// for(let key of Object.keys(obj)){
//   newObj[key] = deepClone(obj[key]);
// }

// for(prop in target){
//   if(target.hasOwnProperty(prop)){
//     newObj[prop] = deepClone(obj[key])
//   }
// }

// const deepClone = (target, map = new WeakMap()) => {
//   // 基本数据类型，直接返回
//   if (typeof target !== 'object' || target === null) return target
//   // 函数 正则 日期 ES6新对象,执行构造题，返回新的对象
//   const constructor = target.constructor
//   if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name)) return new constructor(target)
//   // map标记每一个出现过的属性，避免循环引用
//   if (map.get(target)) return map.get(target)
//   map.set(target, true)
//   const cloneTarget = Array.isArray(target) ? [] : {}
//   for (prop in target) {
//     if (target.hasOwnProperty(prop)) {
//       cloneTarget[prop] = deepClone(target[prop], map)
//     }
//   }
//   return cloneTarget}

const a = {
  name:"a",
  age:18
}

const b = {
  name: "b",
  age:19,
  relative:a
}

a.relative = b;

const c = deepClone(a);
console.log(c)