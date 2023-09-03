1. Number 类型

   1. 代表整数和浮点数
   2. 常规数字以外还有特殊数值，`Infinity`,`-Infinity`,`NaN`
   3. 在 JavaScript 中做数学运算是安全的。我们可以做任何事：除以 0，将非数字字符串视为数字，等等。脚本永远不会因为一个致命的错误（“死亡”）而停止。最坏的情况下，我们会得到 `NaN` 的结果。

2. BinInt类型

   1. number类型无法安全地表示大于 `(253-1)`（即 `9007199254740991`），或小于 `-(253-1)` 的整数。

   2. 而BigInt可以表示任意长度的整数，末尾加n表示

   3. ```js
      const bigint = 1234567890123456789012345678901234567890n;
      
      const sameBigint = BigInt("1234567890123456789012345678901234567890");
      
      const bigintFromNumber = BigInt(10); // 与 10n 相同
      
      ```

3. String类型

   1. ```js
      let str = "Hello";
      let str2 = 'Single quotes are ok too';
      let phrase = `can embed another ${str}`;
      ```

   2. 反引号是 **功能扩展** 引号。它们允许我们通过将变量和表达式包装在 `${…}` 中，来将它们嵌入到字符串中

4. Boolean类型（逻辑类型）

   1. true or false

5. null值

   1. null不属于上述类型，是一个独立的类型，只包含null值
   2. null仅仅表示代表空/无，值未知

6. undefined值

   1. 含义是未被赋值

   2. 如果一个变量已被声明，但未被赋值，那么他的值就是undefined

   3. ```js
      let age;
      console.log(age);//undefined
      ```

   4. 通常，使用 `null` 将一个“空”或者“未知”的值写入变量中，而 `undefined` 则保留作为未进行初始化的事物的默认初始值。

7. Symbol：用于唯一标识符

8. 非原始数据类型：Object



`typeof`运算符返回参数的类型，快速进行数据类型检验，以字符串的形式返回数据类型

- 可以正确识别出 undefined,number,bigint,boolean,string,symbol

- 特殊情况

- ```js
  typeof Math;//object
  typeof null;//object
  typeof alert;//function
  typeof [1,2,3];//object
  ```

- 其中null被错误判断为object是js的官方错误



## Object

属性存在性测试

- 对象能够被访问任何属性，即使不存在也不会报错，会返回undefined
- 检查属性是否存在的操作符`in`
- 一般情况判断undefined就可以，但是有的时候可能存在的属性被赋值为了undefined这样结果就会出现问题

for...in循环

- 为了遍历一个对象的所有键key

- ```js
  for (key in object) {
    //running
  }
  ```

- 对象的整数属性会被排序

  - 整数属性指的是一个可以在不做任何更改的情况下与一个整数进行相互转换的字符串

  - ```js
    //Number()显式转换为数字
    //Math.trunc内建的去除小数部分的方法
    String(Math.trunct(Number("49")));//"49",yes
    String(Math.trunct(Number("+49")));//"49",not
    String(Math.trunct(Number("49.2")));//"49",not
    ```

  - 如果属性名不是整数，那么就按照创建时的顺序来排序

  - 所以可以在数字前加"+"



isEmpty

```js
function isEmpty(obj){
  for(key in obj){
    return false;
  }
  return true;
}
```

multiplyNumber

```js
multiplyNumber(obj){
  for(key in obj){
    if(typeof obj[key] === 'number'){
      obj[key] *= 2;
    }
  }
}
```



浅拷贝

- 可以使用for(key in obj)

- `Object.assign(dest,[src1,src2,...])`

​	可以实现合并多个对象到dest中，将第二个参数的属性都被拷贝到第一个参数的对象中



深拷贝

现有的轮子：`lodash`库中的`_.cloneDeep(obj)_`

自己写见手写算法题部分，主要思路

- 首先看是否是简单数据类型，是-直接返回
- 利用`constructor`看是不是Date、Function、RegExp、Map、Set，是的话调用构造函数
- 为了防止循环引用，闭包一个map，如果已经出现过则直接返回，否则新生成
- 利用拷贝循环进行拷贝

