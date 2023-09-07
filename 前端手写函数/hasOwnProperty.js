let animal = {
  eats: true
}

let rabbit = {
  jumps: true,
  __proto__: animal
}

for(let prop in rabbit){
  if(rabbit.hasOwnProperty(prop)){
    console.log(`Our: ${prop}`);
  }else{
    console.log(`Inherited: ${prop}`);
  }
}