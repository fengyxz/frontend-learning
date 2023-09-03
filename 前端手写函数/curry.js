//sum(1)(2)(3)

function curry(fn){
    return curried = (...args1) => {
        if(args1.length >= fn.length){
            return fn(...args1);
        }else return (...args2) => curried(...args1,...args2);
    }

}

const sum = curry((a,b,c) => a+b+c);

console.log(sum(1)(2)(3));