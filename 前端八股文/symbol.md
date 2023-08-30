4. `Symbol`可带描述的原始唯一值，不会被自动转换为字符串，除非调用`toString()`或者`.description`
- 字面量中调用symbol需要用`[]`括号
- symbol属性不参与for...in循环，但是会被assign复制
- 读取（不存在则创建）全局注册表的symbol，应当使用`Symbol.for(key)`
- 通过全局symbol返回名字，`Symbol.keyFor(sym)`
```javaScript
//通过name获取symbol
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

//通过symbol获取name
alert(Symbol.keyFor(sym));//name
alert(Symbol.keyFor(sym2));//id

let localSymbol = Symbol.for("name");
alert( Symbol.keyFor(localSymbol));//undefined
alert( localSymbol.description );//name
```

- Symbol不是百分百隐藏的，可以通过`Object.getOwnPropertySymbols(obj)`允许我们获取所有的symbols
- `Reflect.ownKeys(obj)`可以返回一个对象的所有键，包括symbol
