function delay(f, ms) {

    return function(a) {
      setTimeout(()=>f(a), ms);
    };
  
  }
  
  let f1000 = delay((RES)=>console.log(RES), 1000);
  
  f1000("test"); // shows "test" after 1000ms