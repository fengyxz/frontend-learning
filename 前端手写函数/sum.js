//sum(1)(2) = 3

function sum1(a){
    return function(b){
        return a+b;
    }
}

let sum = new Function('a', 'b', 'return a+b');

console.log(sum(1,2));
console.log(sum1(1)(2));