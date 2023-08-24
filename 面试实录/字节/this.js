class Student{
  constructor(name) {
      this.name = 'Jarry'
  }
  getInfo = function(){
      return {
          name: 'Tom',
          getName() {
              return this.name
          }
      }
  }
}
const stu = new Student()
console.log(stu.getInfo().getName())