function Parent(name){
  this.name = name;
};

Parent.prototype.getName = function(){
  return this.name;
}

function Son(name, age){
  Parent.call(this,name);
  this.age = age;
}

Son.prototype.getAge = function(){
  return this.age;
}

Son.prototype.__proto__ = Object.create(Parent.prototype);

const son1 = new Son('shao',20)
console.log(son1.getName()) // shao
console.log(son1.getAge()) // 20
console.log(son1.constructor);


//es6
class father{
  constructor(name){
    this.name = name;
  }

  getName(){
    return this.name;
  }
}

class daughter extends father{
  constructor(name,age){
    super(name);
    this.age = age;
  }
  getAge(){
    return this.age;
  }
}

const d1 = new daughter('alice',20);
console.log(d1.getName());
console.log(d1.getAge())