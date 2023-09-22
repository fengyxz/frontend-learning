let arr = [1,2,3];
arr.map((item,index) => arr[index]=item*2);
for(let i = 0;i<arr.length;i++){
  console.log(arr[i])
}