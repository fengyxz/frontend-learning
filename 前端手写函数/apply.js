Function.prototype.apply2 = function(context, args){
  context = (context === undefined || context === nulll)? window:context;
  context._fn = this;
  let result = context._fn(...args);
  delete context._fn;
  return result;
}