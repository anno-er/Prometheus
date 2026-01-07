let A = function (name) {
  this.name = name;
};
A.prototype.sayName = function () {
  console.log(this.name);
};

let a = new A("a");
a.sayName();

for (let i = 0; i < 10; i++) {
  console.log(i);
}
