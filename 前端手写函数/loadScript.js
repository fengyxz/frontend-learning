//基于回调函数
function loadScript(src, callback){
  let script = document.createElement('sscript');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error('Could not load script'));

  document.head.append(script);
}

//基于promise
function loadScript1(src){
  return new Promise(function(resolve, reject){
    let script = document.createElement('sscript');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error('Could not load script'));

    document.head.append(script);
  })
}

let promise = loadScript1("http://www")
promise.then(
  script => alert(`${script.src} is loaded` ),
  error => alert(`Error: ${error.message}`)
)

promise.then(script => alert('another handler ...'))

//promise允许我们按照自然顺序进行编码，先运行loadscript再用then处理结果
//callback则需要在调用loadScript之前知道如何使用callback处理结果

