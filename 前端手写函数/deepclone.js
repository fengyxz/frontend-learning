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