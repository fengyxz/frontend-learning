class Hardman {
  constructor(name) {
    this.promise = Promise.resolve().then(() => {
      console.log(`I am ${name}`);
    })
  }

  rest(time) {
    this.promise = this.promise.then(
      () => new Promise((resolve) => {
        console.log(`等待${time}秒`)
        setTimeout(() => {
          console.log(`Start learning after ${time} seconds`);
          resolve()
        }, time * 1000);
      }))
    return this;
  }

  restFirst(time) {
    const initialPromise = this.promise;
    this.promise = Promise.resolve().then(
      () => new Promise((resolve) => {
        console.log(`Start learning after ${time} seconds`);
        setTimeout(() => {
          console.log(`Start learning after ${time} seconds`);
          resolve();
        }, time * 1000);
      }).then(() => initialPromise))
    return this;
  }

  learn(sub) {
    this.promise = this.promise.then(() => {
      console.log(`learning ${sub}`)
    })
  }
}

new Hardman("mike").restFirst(3).learn("History")