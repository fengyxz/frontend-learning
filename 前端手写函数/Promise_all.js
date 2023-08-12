//输出结果仍然为一个promise，状态决定于proms的执行
//参数proms为一个迭代器，包含多个promise
//1. 全部proms的promise结果成功，返回成功，按照传入顺序排列成功的数据
//2. 有一个promise失败，则返回失败的promise结果

Promise._all = function(promises) {
  return new Promise((resolve, reject) => {
    if (promises === null || typeof promises[Symbol.iterator] !== "function") {
      throw new TypeError(`${promises} is not a interable`);
    }
    // promises = [...promises];

    //对象为空
    if(promises.length === 0) {
      resolve([]);
    }

    let count = 0;
    const values = [];
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          values[index] = res;
          if(++count === promises.length) resolve(values);
        })
        .catch(err => reject(err));
    })
  })
}

Promise._all([
  Promise.reject(1),
  Promise.resolve(2),
  Promise.resolve(3)
]).then(
  data => {
    console.log('success',data)
  },
  err => {
    console.log('fail',err)
  }
)

//拓展知识
// 将可迭代对象转换为数组
// 1. slice()
// const nodeList = document.querySelectorAll('li');
// const array = Array.prototype.slice.call(nodeList);
// 2. Array.from()
// const array = Array.from(nodeList);
// 3. 展开运算符
// const array = [...nodeList];