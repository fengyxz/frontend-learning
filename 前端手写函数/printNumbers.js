// 采用setTimeout实现，函数内部进行嵌套
function printNumbers(from, to) {
    let current = from;
    setTimeout(function go(){
        console.log(current);
        if(current < to){
            setTimeout(go, 1000);
        }
        current++;
    },1000)
}

printNumbers(1, 10);
// 采用setInterval实现，需要注意要记录timeId
function printNumbers1(from, to) {
    let current = from;
    let timeId = setInterval(function(){
        console.log(current);
        if(current === to){
            clearInterval(timeId);
        }
        current++;
    },1000)
}
printNumbers1(1, 10);
//immediate，实现立即执行
function printNumbers2(from, to) {
    let current = from;
    function go(){
        console.log(current,current);
        if(current === to){
            clearInterval(timeId);
        }
        current++;
    }
    go();
    let timeId = setInterval(go,1000);
}
printNumbers2(1, 10);