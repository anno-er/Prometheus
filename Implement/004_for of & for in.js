let myArray = [1, 2, 3, 4, 5];
let myObject = {
  name: "张三",
  age: 18,
};

for (let item of myArray) {
  console.log(item);
}

for (let key in myObject) {
  console.log(key, myObject[key]);
}

Object.keys(myObject).forEach((key) => {
  console.log(key, myObject[key]);
});

Object.values(myObject).forEach((value) => {
  console.log(value);
});

Object.entries(myObject).forEach(([key, value]) => {
  console.log(key, value);
});
