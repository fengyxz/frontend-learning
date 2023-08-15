String.prototype._render= function (data){
  return this.replace(/{{[\s\S]*?}}/g, match =>{
    if((match = match.substring(2,match.length-2)).trim() === ""){
      return "";}
    else if(match.startsWith("#")){
      return eval(match.substring(1,match.length-1));}
    else {return data[match]? data[match]:"";}
  })
}
const data = {
  name: "小明",
  age: 16,
  school: "第三中学",
  classroom: "教室2"
}
console.log(
  `{{name}}说了句{{#
      if (data.age >= 18) {
          "我已经成年了！"
      } else {
          "我还没有成年！"
      }
  }}`._render(data)
);

