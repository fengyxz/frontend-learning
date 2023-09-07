console.log('script start'); 
setTimeout(() => {
  console.log('setTimeout1');
}, 2000);
setTimeout(() => {
  console.log('setTimeout2');
}, 0);

Promise.resolve()
    .then(function() { 
      console.log('promise1');
    })
    .then(function() {
      console.log('promise2'); 
    });
    
async function foo() {
  await bar() 
  console.log('foo end')
}

foo()

function bar() {
  console.log('bar end') 
}

async function errorFunc () {
  try {
    await Promise.reject('error!!!')
  } catch(e) {
    console.log(e)
  }
  console.log('errorFunc');
  return Promise.resolve('errorFunc success')
}
errorFunc().then(res => console.log(res))
console.log('script end');