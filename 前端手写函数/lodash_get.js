var object = { 'a': [{ 'b': { 'c': 3 } }] };

function _get(object,path,defaultValue = undefined){
  let newPath = [];
  if(Array.isArray(path)){
    newPath = path;
    console.log(newPath);
  }else{
    newPath = path.replace(/\[/g,'.').replace(/\]/g,'').split('.');
    console.log(newPath);
  }
  return newPath.reduce((obj,key) => {
    return (obj || {})[key];
  },object)||defaultValue;
}

console.log(_get(object, 'a[0].b.c'));
// => 3
console.log(_get(object, ['a', '0', 'b', 'c']));
// => 3
console.log(_get(object, 'a.b.c', 'default')); // 第三个参数如果值是undefined，则返回第三个参数
// => 'default'

// 逻辑或运算符 || 用于判断两个表达式的结果，
// 并返回第一个为真的表达式的值。
// 如果所有表达式都为假，则返回最后一个表达式的值。

// && 是逻辑与（AND）运算符。它用于判断两个表达式是否同时为真。
// 逻辑与运算符返回第一个为假的表达式的值，
// 或者如果所有表达式都为真，则返回最后一个表达式的值。


