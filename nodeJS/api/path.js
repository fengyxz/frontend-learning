var path = require('path');
var cache = {};

function store(key, value){
  console.log(path.normalize(key));
  cache[path.normalize(key)] = value;
}

store('foo/bar', 1);
store('foo//baz//../bar', 2);
console.log(cache);  // => { "foo/bar": 2 }

// path.join
// 将传入的多个路径拼接为标准路径。
path.join('foo/', 'baz/', '../bar'); // => "foo/bar"

// path.extname
// 
path.extname('foo/bar.js'); // => ".js"
