class Hardman {
  constructor(name) {
    this.queue = [];
    this.callName(name)
    setTimeout(() => {
      this.next();
    }, 0);
  }

  next() {
    if (this.queue.length > 0) {
      const work = this.queue.shift();
      // console.log(work)
      // console.log("work", work)

      work && work();
    }
  }
  add(fn) {
    this.queue.push(fn);
  }

  callName(name) {
    this.add(() => {
      console.log(`I am ${name}`);
      this.next()
    })
    return this;
  }

  rest(time) {
    this.add(() => {
      console.log(`等待 ${time} 秒`)
      console.log(`Start learning after ${time} seconds`)
      setTimeout(() => {
        this.next()
      }, time * 1000)
    })
    return this;
  }
}

const man = new Hardman("Mike");
man.rest(3).callName("hi")