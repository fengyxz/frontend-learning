// Buffer将JS的数据处理能力从字符串扩展到了任意二进制数据。
var bin = new Buffer.from([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var str = bin.toString();
console.log(str);
// buffer 与字符串有一个重要区别：字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变。
// Buffer更像是可以做指针操作的c语言数组，可以用[index]直接修改某个位置的字节
// 因此对.slice方法返回的Buffer的修改会作用于原Buffer，例如：
var sub = bin.slice(2);
sub[0] = 0x65;
console.log(bin); // => <Buffer 68 65 65 6c 6f>
// 如果想要拷贝一份Buffer，得首先创建一个新的Buffer，并通过.copy方法把原Buffer中的数据复制过去。
var bin = new Buffer.from([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer.alloc(bin.length);

bin.copy(dup);
dup[0] = 0x48;
console.log(bin);
console.log(dup)