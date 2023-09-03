// 假设我们有一个 CPU 重负载的函数 slow(x)，但它的结果是稳定的。换句话说，对于相同的 x，它总是返回相同的结果。
// 如果经常调用该函数，我们可能希望将结果缓存（记住）下来，以避免在重新计算上花费额外的时间。
// 但是我们不是将这个功能添加到 slow() 中，而是创建一个包装器（wrapper）函数，该函数增加了缓存功能。


function slow(x){
    // there is some heavy overload work
    console.log(`Called with ${x}`);
    return x;
}

function cachingDecorator(func) {
    let cache = new Map();
    
    return function(x){
        if(cache.has(x)){
            return cache.get(x)
        }
        let result = func(x);
        cache.set(x,result);
        return result;
    }
}

const slow = cachingDecorator(slow);

console.log(slow(1));
console.log("again:"+slow(1));
//上述代码中，cachingDecorator是一个装饰器，一个特殊的函数，它接受一个函数并改变他的行为
// cachingDecorator 是可重用的。我们可以将它应用于另一个函数。
// 缓存逻辑是独立的，它没有增加 slow 本身的复杂性（如果有的话）。
// 如果需要，我们可以组合多个装饰器（其他装饰器将遵循同样的逻辑）。


// 装饰器 是一个围绕改变函数行为的包装器。主要工作仍由该函数来完成。
// 装饰器可以被看作是可以添加到函数的 “features” 或 “aspects”。我们可以添加一个或添加多个。而这一切都无需更改其代码！
