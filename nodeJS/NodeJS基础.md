## 模块
代码模块化。在NodeJS中，一般将代码合理拆分到不同的JS文件中，每一个文件就是一个模块，文件路径就是模块名。
在编写每个模块时，都有require、exports、module三个预先定义好的变量可供使用
### 模块路径解析
#### require
require函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。模块名可使用相对路径（以./开头），或者是绝对路径（以/或C:之类的盘符开头）。另外，模块名中的.js扩展名可以省略。
```javascript
var foo1 = require('./foo');
var foo2 = require('./foo.js');
var foo3 = require('home/user/foo');
var data = require('./data.json');
```

#### exports
exports对象是当前模块的导出对象，用于导出模块公有方法和属性。别的模块通过require函数使用当前模块时得到的就是当前模块的exports对象

```javascript
exports.hello = function(){
  console.log('hello,world');
}
```

#### module
通过module对象可以访问到当前模块的一些相关信息，但最多的用途是替换当前模块的导出对象。例如模块导出对象默认是一个普通对象，如果想改成一个函数的话，如下。
```javascript
module.exports = function(){
  console.log('hello,world');
}
```

模块初始化：一个模块中的js代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。NodeJS使用CMD模块系统，主模块作为程序入口点，所有模块在执行过程中只初始化一次。

主模块：main.js

## 代码的组织与部署
### 模块路径解析规则
除了绝对路径和相对路径，require函数支持第三种形式的路径，写法类似`foo/bar`
1. 内置模块
如果传递给require函数的是NodeJS内置模块名称，不做路径解析，直接返回内部模块的导出对象，例如`require('fs')`
2. node_modules目录
NodeJS定义了一个特殊的node_modules目录用于存放模块。例如某个模块的绝对路径是/home/user/hello.js，在该模块中使用require('foo/bar')方式加载模块时，则NodeJS依次尝试使用以下路径。
```node
/home/user/node_modules/foo/bar
/home/node_modules/foo/bar
/node_modules/foo/bar
```
3. NODE_PATH环境变量
nodejs允许通过`NODE_PATH`环境变量来指定额外的模块搜索路径。NODE_PATH环境变量中包含一到多个目录路径，路径之间在Linux下使用:分隔，在Windows下使用;分隔。
```shell
NODE_PATH=/home/user/lib:/home/lib
```
当使用require('foo/bar')的方式加载模块时，则NodeJS依次尝试以下路径。
```shell
/home/user/lib/foo/bar
/home/lib/foo/ba
```

### 包
为了便于管理和使用，可以把由多个子模块组成的大模块称做包，并把所有子模块放在同一个目录里。
在组成一个包的所有子模块中，需要有一个入口模块，入口模块的导出对象被作为包的导出对象
目录结构：
```javascript
- /home/user/lib/
    - cat/
        head.js
        body.js
        main.js
```
其中cat目录自定义了一个包，包含三个子模块。main.js作为入口模块
```javascript
var head = require('./head');
var body = require('./body');

exports.create = function (name) {
  return {
    name: name,
    head: head.create(),
    body: body.create()
  }
}
```
在其它模块里使用包的时候，需要加载包的入口模块,使用require('/home/user/lib/cat/main')能达到目的

#### index.js
当模块的文件名是index.js，加载模块时可以使用模块所在目录的路径代替模块文件路径，一下两条语句等价
```javascript
var cat = require('/home/user/lib/cat');
var cat = require('/home/user/lib/cat/index');
```
就只需要把包目录路径传递给require函数，感觉上整个目录被当作单个模块使用，更有整体感。

#### package.json
在包目录下包含一个package.json文件，并在其中指定入口模块的路径，可以自定义模块的文件名和存放位置
```
- /home/user/lib/
    - cat/
        + doc/
        - lib/
            head.js
            body.js
            main.js
        + tests/
        package.json
```

package.json
```javascript
{
  "name": "cat",
  "main": "./lib/main.js"
}
```
同样可以使用require('/home/user/lib/cat')的方式加载模块。NodeJS会根据包目录下的package.json找到入口模块所在位置。

### 命令行程序
在linux系统中，我们可以把js文件当作shell脚本运行。

在shell脚本中，可以通过`#!`注释当前脚本所用的解析器，nodejs解析`#! /opt/homebrew/bin/node`(因为本电脑node由homebrew安装).
然后通过命令赋予node-echo.js文件执行权限
```shell
chmod 755 '/Users/lvdanyu/Desktop/study/nodeJS/node-echo.js'
```

最后，我们在PATH环境变量中指定的某个目录下边创建一个软链文件，文件名与我们希望使用的终端命令同名
```shell
sudo ln -s /home/user/bin/node-echo.js /usr/local/bin/node-echo
```

如何查看PATH:`open .zshrc`

### NPM
npm是随同NodeJS一起安装的包管理工具
- 允许用户从NPM服务器下载别人编写的三方包到本地使用
- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用
- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用

举例下载`argv`
```shell
$ npm install argv
...
argv@0.0.2 node_modules\argv
```
下载好之后，argv包就放在了工程目录下的`node_modules`目录中，因此在代码中只需要通过`require('argv')`就好，无需指定三方包路径.如果想要下载指定版本的话，可以在包名后边加上@<version>，例如通过以下命令可下载0.0.1版的argv。
```shell
npm install argv@0.0.1
```

npm对packages.json字段做了拓展，允许在其中声明三方包依赖。
这样处理之后，在工程目录下就可以使用`npm install`命令批量安装三方包了。
更重要的是，当以后node-echo也上传到了NPM服务器，别人下载这个包时，NPM会根据包中申明的三方包依赖自动下载进一步依赖的三方包。
```json
{
  "name": "node-echo",
  "main": "./lib/echo.js",
  "description": {
    "argv": "0.0.2"
  }
}
```

#### 安装命令行程序
只要命令行程序配置好了package.json字段，对于用户而言只需要使用
`npm install node-echo -g`安装程序。参数中的`-g`表示全局安装到以下位置，并且NPM会自动创建好Linux系统下需要的软链文件或Windows系统下需要的.cmd文件。
```shell
- /usr/local/               # Linux系统下
    - lib/node_modules/
        + node-echo/
        ...
    - bin/
        node-echo
        ...
    ...
```

#### 发布代码
第一次使用NPM发布代码前需要注册一个账号。终端下运行`npm adduser`，之后按照提示做即可。账号搞定后，接着我们需要编辑package.json文件，加入NPM必需的字段。接着上边node-echo的例子，package.json里必要的字段如下。
```javascript
{
    "name": "node-echo",           # 包名，在NPM服务器上须要保持唯一
    "version": "1.0.0",            # 当前版本号
    "dependencies": {              # 三方包依赖，需要指定包名和版本号
        "argv": "0.0.2"
      },
    "main": "./lib/echo.js",       # 入口模块位置
    "bin" : {
        "node-echo": "./bin/node-echo"      # 命令行程序名和主模块位置
    }
}
```
之后，我们就可以在package.json所在目录下运行`npm publish`发布代码了。

#### 版本号
语义版本号`X.Y.Z`
- 如果只是修复bug，需要更新Z位。
- 如果是新增了功能，但是向下兼容，需要更新Y位。
- 如果有大变动，向下不兼容，需要更新X位。

版本号有了这个保证后，在申明三方包依赖时，除了可依赖于一个固定版本号外，还可依赖于某个范围的版本号。例如"argv": "0.0.x"表示依赖于0.0.x系列的最新版argv。
## 网络
### HTTP
http模块提供两种使用方式
- 作为服务端使用时，创建一个HTTP服务器，监听HTTP客户端请求并返回响应
- 作为客户端使用，发起一个HTTP客户端请求，获取服务端响应
```javascript
var http = require('http');

http.createServer(function(request, response){
  response.writeHead(200,{ 'Content-Type':'text-plain'});
  response.end('Hello, world!nihao\n');
}).listen(8124);
```
`.createServer`方法创建一个服务器，然后调用`.listen`方法监听端口。
之后每当来了一个客户端请求，创建服务器时传入的回调函数就被调用一次。（事件机制）

HTTP请求本质上是一个数据流，由请求头headers和请求体body组成
完整的HTTP请求数据内容
```
POST / HTTP/1.1
User-Agent: curl/7.26.0
Host: localhost
Accept: */*
Content-Length: 11
Content-Type: application/x-www-form-urlencoded

Hello World
```
空行之上是请求头，空行之下是请求体。
HTTP请求在发送给服务器时，可以认为是按照从头到尾的顺序一个字节一个字节地以数据流方式发送的。而http模块创建的HTTP服务器在接收到完整的请求头后，就会调用回调函数。
```javascript
var options = {
        hostname: 'www.example.com',
        port: 80,
        path: '/upload',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

var request = http.request(options, function (response) {});

request.write('Hello World');
request.end();
```
还能把response对象当作一个只读数据流来访问响应体数据
```javascript
http.get('http://www.google.com',function(response){
  var body = [];
  console.log(response.status);
  console.log(response.headers);

  response.on('data', function(chunk){
    body.push(chunk);
  });

  response.on('end', function(){
    body = Buffer.concat(body);
    console.log(body.toString());
  })
})
------------------------------------
200
{ 'content-type': 'text/html',
  server: 'Apache',
  'content-length': '801',
  date: 'Tue, 05 Nov 2013 06:08:41 GMT',
  connection: 'keep-alive' }
<!DOCTYPE html>
...
```

### HTTPS
https模块与http模块极为类似，区别在于https模块需要额外处理SSL证书

服务端模式，创建一个HTTPS服务器的示例
```javascript
var options = {
  key: fs.readFileSync('./ssl/default.key'),
  cert: fs.readFileSync('./ssl/default.cer'),
};
var server = https.createServer(options, function (request, response) {
        // ...
    });
```
与创建HTTP服务器相比，多了一个options对象，通过key和cert字段指定了HTTPS服务器使用的私钥和公钥。

NodeJS支持SNI技术，可以根据HTTPS客户端请求使用的域名动态使用不同的证书，因此同一个HTTPS服务器可以使用多个域名提供服务。接着上例，可以使用以下方法为HTTPS服务器添加多组证书。
```javascript
server.addContext('foo.com', {
    key: fs.readFileSync('./ssl/foo.com.key'),
    cert: fs.readFileSync('./ssl/foo.com.cer')
});

server.addContext('bar.com', {
    key: fs.readFileSync('./ssl/bar.com.key'),
    cert: fs.readFileSync('./ssl/bar.com.cer')
});
```
在客户端模式下，发起一个HTTPS客户端请求与http模块几乎相同，示例如下。
```javascript
var options = {
  hostname: 'www.example.com',
  port: 443,
  path: '/',
  method: 'GET'
};

var request = https.request(options, function(response){});

request.end();
```
但如果目标服务器使用的SSL证书是自制的，不是从颁发机构购买的，默认情况下https模块会拒绝连接，提示说有证书安全问题。在options里加入rejectUnauthorized: false字段可以禁用对证书有效性的检查，从而允许https模块请求开发环境下使用自制证书的HTTPS服务器。

### URL
我们可以使用.parse方法来将一个URL字符串转换为URL对象.
.parse方法还支持第二个和第三个布尔类型可选参数。第二个参数等于true时，该方法返回的URL对象中，query字段不再是一个字符串，而是一个经过querystring模块转换后的参数对象。第三个参数等于true时，该方法可以正确解析不带协议头的URL，例如//www.example.com/foo/bar。
反过来，format方法允许将一个URL对象转换为URL字符串，示例如下.
```javascript
url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');
/* =>
{ protocol: 'http:',
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }
*/

url.format({
    protocol: 'http:',
    host: 'www.example.com',
    pathname: '/p/a/t/h',
    search: 'query=string'
});
/* =>
'http://www.example.com/p/a/t/h?query=string'
*/
```
在JavaScript中，经常用到./和../及/路径访问指定的资源，但三者有什么区别：
- ./表示当前目录
- ../表示父级目录

总结
- http和https模块支持服务端模式和客户端模式两种使用方式。
- request和response对象除了用于读写头数据外，都可以当作数据流来操作。
- url.parse方法加上request.url属性是处理HTTP请求时的固定搭配。
- 使用zlib模块可以减少使用HTTP协议时的数据传输量。
- 通过net模块的Socket服务器与客户端可对HTTP协议做底层操作。

## 进程管理
`child_process`模块可以创建和控制子进程，提供的API中最核心的是`.spawn`；
`cluster`是对`child_process`模块的进一步封装，专用于解决单进程NodeJS Web服务器无法充分利用多核CPU的问题。可以简化多进程服务器程序的开发，让每个核上运行一个工作进程，并统一通过主进程监听端口和分发请求。

### 应用场景
#### 获取命令行参数
通过`process.argv`获取命令行参数，node执行程序路径和主模块文件路径固定占据了argv[0]和argv[1]两个位置，而第一个命令行参数从argv[2]开始。为了让argv使用起来更加自然，可以按照以下方式处理。
```javascript
function main(argv){
  //...
}

main(process.argv.slice(2))
```
#### 退出程序
正常退出程序的状态码是0，如果是发生异常挂了，退出码不为0（可以设置为1）
```javascript
try {
  //...
} catch (err) {
  //...
  process.exit(1);
}
```

#### 控制输入输出
- 标准输入流 stdin 只读数据流
- 标准输出流 stdout 只写数据流
- 标准错误流 stderr 只写数据流
如，实现`console.log`
```javascript
function log() {
  process.stdout.write(
    util.format.apply(util, arguments + '\n');
  )
}
```

#### 降权
需要root权限才能监听1024以下的端口，一旦完成端口监听，继续让程序运行在root权限下存在安全隐患，最好降权.

如果是通过sudo获取root权限的，运行程序的用户的UID和GID保存在环境变量SUDO_UID和SUDO_GID里边。如果是通过chmod +s方式获取root权限的，运行程序的用户的UID和GID可直接通过process.getuid和process.getgid方法获取。降权时必须先降GID再降UID，否则顺序反过来的话就没权限更改程序的GID了
```javascript
http.createServer(callback).listen(80, function(){
  var env = process.env,
      uid = parseInt(env['SUDO_UID'] || process.getuid(),10),
      gid = parseInt(env['SUDO_GID'] || process.getgid(),10);
  
  process.setgid(gid);
  process.setuid(uid);
})
```

创建子进程`.spawn(exec, args, options)`

父进程通过`.kill`方法向子进程发送SIGTERM信号，子进程监听process对象的SIGTERM事件响应信号。kill是用来给进程发送信号的，进程做啥取决于信号的种类和进程自身的代码。

如果父子进程都是NodeJS进程，就可以通过IPC进程间通讯双向传递数据。父进程在创建子进程时，在options.stdio字段中通过ipc开启了一条IPC通道，之后就可以监听子进程对象的message事件接收来自子进程的消息，并通过.send方法给子进程发送消息。在子进程这边，可以在process对象上监听message事件接收来自父进程的消息，并通过.send方法向父进程发送消息。数据在传递过程中，会先在发送端使用JSON.stringify方法序列化，再在接收端使用JSON.parse方法反序列化。
```javascript
/* parent.js */
var child = child_process.spawn('node', [ 'child.js' ], {
        stdio: [ 0, 1, 2, 'ipc' ]
    });

child.on('message', function (msg) {
    console.log(msg);
});

child.send({ hello: 'hello' });

/* child.js */
process.on('message', function (msg) {
    msg.hello = msg.hello.toUpperCase();
    process.send(msg);
});
```

守护子进程
守护进程一般用于监控工作进程的运行状态，在工作进程不正常退出时重启工作进程，保障工作进程不间断运行
```javascript
function spawn(mainModule) {
  var worker = child_process.spawn('node', [mainModule]);

  worker.on('exit', function(code){
    if(code != 0){
      spawn(mainModule);
    }
  })
}

spawn('worker.js')
```
工作进程非正常退出时，守护进程立即重启工作进程。

## 异步编程
JS本身是单线程的，无法异步执行，因此我们可以认为setTimeout这类JS规范之外的由运行环境的特殊函数做的事情是创建一个平行线程后立即返回，让JS主线程可以接着执行后续代码，并在收到平行进程的通知后再执行回调函数。
这类函数：`setTimeout`, `setInterval`以外还有，NodeJS提供的`fs.readFile`等异步API。

JS是单线程运行的这个事实决定了JS在执行完一段代码之前无法执行包括回调函数在内的别的代码。也就是说，即使平行线程完成工作了，通知JS主线程执行回调函数了，回调函数也要等到JS主线程空闲时才能开始执行。

