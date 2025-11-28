function MyNew(func, ...args) {
  let obj = {};
  obj.__proto__ = func.prototype;
  const result = func(...args).call(obj);
  return typeof result === "object" ? result : obj;
}

/* class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    console.log(this.name, this.age);
  }
}

let person1 = new Person("张三", 18);
console.log("@@-->Person.__proto__", Person.__proto__);
console.log("@@-->person1", person1); */

/* function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.say = function () {
  console.log(this.name, this.age);
}

let person1 = MyNew(Person, "张三", 18);
console.log("@@-->person1", person1);
console.log("@@-->person1.__proto__", person1.__proto__); */
