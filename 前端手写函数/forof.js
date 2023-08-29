const object = { 
  name: 111,
  age:18,
};


Object.prototype[Symbol.iterator] = function () {
  let keys = Object.keys(this);
  let index = 0;
  return {
      next: () => {
          return {
              value: [keys[index],this[keys[index++]]],
              done: index >= keys.length + 1 ? true : false,
          }
      }
  }
}

Object.prototype[Symbol.iterator] = function*() {
  for (let key of Object.keys(this)) {
    yield [key, this[key]];
  }
};

for (let [key,value] of object) {
  console.log(key,value);
}