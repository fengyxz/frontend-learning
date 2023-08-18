 // 实现根据输入数值，输出格式化时间显示；显示如下console所示。
function formatSecond(value) {
  let time = "";
  let flag = false;
  const hour = value/60/60;
  console.log()
  if(hour){
    time += hour + "小时";
    flag = true;
  }
  const minute = (value%3600)/60;
  if(minute){
    if(minute<10)time+="0";
    time += minute + "分";
    flag = true;
  }else if(flag){
    time += "00" + "分";
  }
  const second = value%60;
  if(second){
    if(second<10)time+="0";
    time += second + "分";
  }else if(flag){
    time += "00" + "秒";
  }
  return 'TODO';
}

console.log(formatSecond(59)); // 59秒
console.log(formatSecond(60)); // 1分00秒
console.log(formatSecond(3601)); // 1小时00分01秒

const arr = [1,2,3,4,6];
let maxNum = arr[0];//or index
Math.max()


object.__proto__ = 
object.prototype = 
