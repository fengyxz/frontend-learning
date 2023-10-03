var fs = require('fs');
//fs提供对文件的操作
//1. 文件属性读写:fs.stat, fs.chmod, fs.chown
//2. 文件内容读写:fs.readFile, fs.readdir, fs.writeFile, fs.mkdir
//3. 底层文件操作:fs.open, fs.read, fs.write, fs.close

//异步IO
fs.readFile(pathname, function(err, data){
  if(err) {
    //deal with error
  } else {
    //deal with data
  }
})

//同步
try{
  var data = fs.readFileSync(pathname);
}catch(err){
  //deal with error
}