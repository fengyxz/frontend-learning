class EventEmitter {
  constructor(){
    // key: 事件名
    // value: callback[]
    this.events = {};
  }

  on(name, callback){
    if(this.events[name]) {
      this.events[name].push(callback)
    }else{
      this.events[name] = [callback];
    }
  }

  off(name, callback){
    if(!this.events[name])return;
    if(!callback){
      this.events[name] = undefined;
    }
    this.message[name] = this.message[name].filter(item => item!=callback);
  }

  emit(name,...args){
    if(!this.event[name])return;
    this.events[name].forEach(cb => cb(...args));
  }
}