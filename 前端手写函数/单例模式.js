class Dog {

    constructor(name){
        this.name = name;
    }

    static getInstance(name){
        if(!Dog._instance){
            this._instance = new Dog(name);
        }
        return Dog._instance;
    }
}

let d1 = new Dog('d1');
let d2 = new Dog('d1');

console.log(d1 === d2);


let d3 = Dog.getInstance('d3');
let d4 = Dog.getInstance('d4');
console.log(d3 === d4);
