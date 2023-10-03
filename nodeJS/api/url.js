var url = require('url');
var querystring = require('querystring');
// console.log(url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string&name=alice#hash',true,true));
console.log(url.resolve('http://www.example.com/foo/bar', './baz'))

// querystring实现URL参数字符串与参数对象的互相转换
console.log(querystring.parse('foo=bar&baz=qux&baz=quux&corge'))
/* =>
{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }
*/

console.log(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: ''}))
/* =>
'foo=bar&baz=qux&baz=quux&corge='
*/