interface lengthWise {
  length: number;
}

function loggingIdentity<T extends lengthWise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity("hello"); // 5
loggingIdentity([1, 2, 3]); // 3
loggingIdentity({ length: 10, value: 3 }); // 10
// loggingIdentity(123); // 错误：类型“number”的参数不能赋给类型“lengthWise”的参数。

/* type Person = {
  name: string;
};
type Person = {
  age: number;
}; // 错误：标识符重复 */

/* interface Person {
  name: string;
}
interface Person {
  age: number;
}// 结果：{ name: string, age: number }
const person: Person = {
  name: "张三",
  age: 30,
}; */

type MyPartial<T> = {
  [P in keyof T]?: T[P];
};
type A = {
  name: string;
  age: number;
};
type PartialA = MyPartial<A>;
let a: PartialA = {
  name: "张三",
};
