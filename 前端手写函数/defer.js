//arrow function
function defer1(f,ms){
  fruit = "pineapple"
  return function() {
    setTimeout(() => f.apply(this,arguments),ms);
  }
}
function sayHi(who){
  console.log('Hello'+who);
}
let sayHiDeferred = defer1(sayHi,10);
sayHiDeferred("John");

function defer2(f,ms){
  return function(...args){
    let ctx = this;
    settimeout(function() {
      return f.apply(ctx,args);
    },ms)
  }
}
