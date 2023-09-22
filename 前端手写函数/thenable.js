class Thenalble{
  constructor(num){
    this.num = num;
  }

  then(resolve,reject){
    console.log(resolve)
    // alert(resolve);
    setTimeout(() => resolve(this.num *2),1000)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
    console.log('------',result)
    return new Thenalble(result)
  })
  .then(result => console.log(result))