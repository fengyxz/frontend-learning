function sum(a){
    let currentSum = a;
    function f(b){
        currentSum += b;
        return f;
    }
    f.toString = function() {
        return currentSum;
    }
    f.valueOf = function(){
        return currentSum;
    }

    return f;
}

let res1 = sum(1)(2);
let res2 = sum(1)(2)(3);
console.log(res1.toString());
console.log(res2.toString());