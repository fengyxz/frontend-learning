const arr = ['1.45.0','6.1','1.0','2.5','1.5']

function compare(a,b){
  let a_arr = a.split('.');
  let b_arr = b.split('.');
  const len = Math.max(a_arr.length, b_arr.length);
  for(let i = 0; i < len; i++){
    const n1 = parseInt(a_arr[i]) ?? 0;
    const n2 = parseInt(b_arr[i]) ?? 0;
    if(n1 < n2){
      return -1;
    }else if(n1 > n2){
      return 1;
    }
  }
  return 0;
}

function versionsSort(arr){
  arr.sort(compare);
  console.log(arr);
}

versionsSort(arr);