function getUrlParams(url) {
    const context = url.split('?')[1];
    const keys = context.split('&');
    const params = [];
    keys.forEach(key => {
      const value = key.split('=');
      params[value[0]] = value[1]? value[1]:'';
    })
  return params;
}

// 以下例子输出为 { a: 'a', b: '', c: '3' }
console.log(getUrlParams('https://ltl.huolala.cn/#/?a=a&b=&c=3'));