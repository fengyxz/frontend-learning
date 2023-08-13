// instanceof函数的作用
// 用于检测构造函数的prototype属性是否出现在某个实例对象的原型链的
// 语法： object instanceof constructor

function myInstanceof(left,right){
  if(!left)return false;
  return (
    left.__proto__ === right.prototype || myInstanceof(left.__proto__,right));
}

function myInstanceof1(left,right){
  let proto = Object.getPrototypeOf(left);
  let prototype = right.prototype;
  if(!proto)return false;
  else if(proto === prototype)return true;
  else return myInstanceof(proto,right);
}

function Person(){};
const p = new Person();
console.log(myInstanceof1(p,Person));
console.log(myInstanceof(p,Array))