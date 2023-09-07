function test(){
  this.name = 'Alice';
  return ()=>{console.log(this.name)}
}
const get = test();
get();