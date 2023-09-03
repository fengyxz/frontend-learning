// 绑定参数，但是不绑定上下文this
function partial(func,...argsBound) {
    return function(...args){
        return func.call(this,...argsBound,...args)
    }
}

let user = {
    firstName: "John",
    say(time, phrase){
        console.log(`[${time}] ${user.firstName}:${phrase}`);
    }
}

user.sayNow = partial(user.say,  new Date().getHours() + ':' + new Date().getMinutes());
user.sayNow();
