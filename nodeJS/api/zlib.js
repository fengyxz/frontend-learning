//zlib 模块提供了数据压缩和解压的功能
//使用zlib模块压缩HTTP响应体数据的例子如下
//判断客户端是否支持gzip，并在支持的情况下使用zlib模块返回gzip之后的响应体数据
http.createServer(function (request, response){
  var i = 1024;
      data = '';
  
  while (i--) {
    data += '.';
  }

  if((request.headers['accept-encoding'] ?? '').indexOf('gzip') !== -1){
    zlib.gzip(data, function (err, data) {
      response.writeHead(200, {
        
      })
    })
  }
}
)