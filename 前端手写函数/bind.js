Function.prototype.bind1 = function(context,...args1){
  // context = (context === undefined || context === null)? window:context;
  context = context || window;
  let _this = this;
  return function(...args2){
    context._fn = _this;
    let result = context._fn(...args1,...args2);
    delete context._fn;
    return result;
  }
}