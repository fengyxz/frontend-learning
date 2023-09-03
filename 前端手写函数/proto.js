function Person1() {
    this.name = "person1";
    this.arr = [1, 2, 3];
}
function Child1() {
    this.type = 'child1';
}
// 重点就是这句，通过将子类的原型指针指向了超类的构造函数
Child1.prototype = new Person1();
console.log(new Child1().__proto__)