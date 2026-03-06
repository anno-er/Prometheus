# 基础知识

## 一、TypeScript 基础类型

TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了实用的枚举类型等。

### 布尔值 (boolean)

最基本的数据类型就是简单的 true/false 值，在 JavaScript 和 TypeScript 里叫做 boolean（其它语言中也叫 bool）。

```ts
let isDone: boolean = false;
```

### 数字 (number)

和 JavaScript 一样，TypeScript 里的所有数字都是浮点数。这些浮点数的类型是 number。

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

### 字符串 (string)

表示文本数据类型，在 TypeScript 中使用 string 表示。

```ts
let color: string = "blue";
color = "red";
```

### 数组 (Array)

TypeScript 像 JavaScript 一样可以操作数组元素。

```ts
let list: number[] = [1, 2, 3];
// 或者使用数组泛型
let list2: Array<number> = [1, 2, 3];
```

### 元组 (Tuple)

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

```ts
let x: [string, number];
x = ["hello", 10]; // OK
// x = [10, 'hello']; // Error
```

### 枚举 (Enum)

enum 类型是对 JavaScript 标准数据类型的一个补充。

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

// 默认情况下，从 0 开始为元素编号，也可以手动指定
enum Color2 {
  Red = 1,
  Green,
  Blue,
}
let c2: Color2 = Color2.Green;
```

### Any

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。

```ts
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

### Void

某种程度上来说，void 类型像是与 any 类型相反，它表示没有任何类型。

```ts
function warnUser(): void {
  console.log("This is my warning message");
}

// 声明一个 void 类型的变量没有什么大用，因为你只能为它赋予 undefined 和 null
let unusable: void = undefined;
```

### Null 和 Undefined

TypeScript 里，undefined 和 null 两者各自有自己的类型分别叫做 undefined 和 null。

```ts
let u: undefined = undefined;
let n: null = null;
```

### Never

never 类型表示的是那些永不存在的值的类型。

```ts
// 返回 never 的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}
```

### Object

object 表示非原始类型，也就是除 number，string，boolean，symbol，null 或 undefined 之外的类型。

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK
```

## 二、接口 (Interface)

接口是 TypeScript 的核心特性之一，用于定义对象的结构和类型契约。

### 基本接口定义

```ts
interface Person {
  name: string;
  age: number;
}

let user: Person = {
  name: "张三",
  age: 25,
};
```

### 可选属性

接口中的属性可以是可选的，使用 `?` 标记：

```ts
interface Car {
  brand: string;
  model: string;
  year?: number; // 可选属性
}

let car1: Car = { brand: "Toyota", model: "Camry" };
let car2: Car = { brand: "Honda", model: "Accord", year: 2023 };
```

### 只读属性

使用 `readonly` 标记只读属性，一旦赋值后就不能修改：

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}

let p: Point = { x: 10, y: 20 };
// p.x = 5; // Error: Cannot assign to 'x' because it is a read-only property
```

### 函数类型接口

接口可以描述函数类型：

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function (
  source: string,
  subString: string
): boolean {
  return source.search(subString) > -1;
};
```

### 索引签名

接口可以描述具有索引签名的对象：

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray = ["Alice", "Bob", "Charlie"];
let myStr: string = myArray[0]; // "Alice"
```

### 接口继承

接口可以相互继承，实现代码复用：

```ts
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square: Square = {
  color: "blue",
  sideLength: 10,
};
```

### 混合类型

接口可以描述具有多种类型的对象：

```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) {
    return String(start);
  } as Counter;
  counter.interval = 123;
  counter.reset = function () {
    console.log("reset");
  };
  return counter;
}
```

## 三、高级类型特性

### 索引访问类型 (Indexed Access Types)

使用索引访问操作符 `[]` 可以获取对象类型的属性类型：

```ts
interface Person {
  name: string;
  age: number;
  address: {
    city: string;
    country: string;
  };
}

// 获取 name 属性的类型
type NameType = Person["name"]; // string

// 获取嵌套属性的类型
type CityType = Person["address"]["city"]; // string

// 使用联合类型获取多个属性
type PersonInfo = Person["name" | "age"]; // string | number
```

### keyof 操作符

`keyof` 操作符可以获取对象类型的所有键，返回一个字符串字面量联合类型：

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

// 获取 User 的所有键
type UserKeys = keyof User; // "id" | "name" | "email"

// 结合索引访问获取属性值类型
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: "张三", email: "zhangsan@example.com" };
const userName = getProperty(user, "name"); // 类型为 string
const userId = getProperty(user, "id"); // 类型为 number
```

### in 操作符

`in` 操作符用于遍历联合类型，常用于映射类型：

```ts
type Keys = "name" | "age" | "email";

type User = {
  [K in Keys]: string; // 遍历 Keys 中的每个元素
};

// 结果：
// type User = {
//   name: string;
//   age: string;
//   email: string;
// }

// 更实用的例子：将接口的所有属性变为可选
type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type PartialTodo = Partial<Todo>;
// 所有属性都变为可选
```

### typeof 操作符

`typeof` 操作符可以在类型上下文中获取变量或属性的类型：

```ts
// 获取变量的类型
let user = {
  name: "张三",
  age: 25,
  email: "zhangsan@example.com",
};

type UserType = typeof user; // { name: string; age: number; email: string; }

// 获取函数的类型
function add(a: number, b: number): number {
  return a + b;
}

type AddFunction = typeof add; // (a: number, b: number) => number

// 获取枚举的类型
enum Status {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

type StatusType = typeof Status; // typeof Status

// 结合 keyof 使用
type StatusKeys = keyof typeof Status; // "Pending" | "Approved" | "Rejected"
```

### 类型扩展 (extends)

`extends` 关键字用于类型扩展和条件类型，可以实现类型的继承和约束：

```ts
// 接口扩展
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const dog: Dog = {
  name: "旺财",
  age: 3,
  breed: "金毛",
  bark() {
    console.log("汪汪!");
  },
};

// 类型别名扩展
type BaseUser = {
  id: number;
  name: string;
};

type AdminUser = BaseUser & {
  role: "admin";
  permissions: string[];
};

// 泛型约束
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

getLength("hello"); // OK
getLength([1, 2, 3]); // OK
getLength({ length: 10, name: "test" }); // OK
// getLength(123); // Error: number 没有 length 属性

// 条件类型
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false

// 更复杂的条件类型
type ExtractArrayType<T> = T extends (infer U)[] ? U : never;

type StringType = ExtractArrayType<string[]>; // string
type NumberType = ExtractArrayType<number[]>; // number
```

### 联合类型 (Union Types)

联合类型表示一个值可以是几种类型之一，使用 `|` 分隔每个类型：

```ts
// 基本联合类型
function printId(id: number | string): void {
  console.log(`ID: ${id}`);
}

printId(101); // OK
printId("202"); // OK
// printId(true); // Error

// 联合类型的类型收窄
function getLength(obj: string | string[]): number {
  if (typeof obj === "string") {
    return obj.length; // 这里 obj 被收窄为 string
  } else {
    return obj.length; // 这里 obj 被收窄为 string[]
  }
}

// 联合类型与字面量类型
type Status = "loading" | "success" | "error";

type ApiResponse = {
  status: Status;
  data?: any;
  error?: string;
};

// 可辨识联合（Discriminated Unions）
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

// 联合类型的常见应用
type ValueOrArray<T> = T | T[];

type StringOrArray = ValueOrArray<string>; // string | string[]
type NumberOrArray = ValueOrArray<number>; // number | number[]
```

### 交叉类型 (Intersection Types)

交叉类型将多个类型合并为一个类型，使用 `&` 符号连接：

```ts
// 基本交叉类型
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;

const colorfulCircle: ColorfulCircle = {
  color: "red",
  radius: 10,
};

// 交叉类型与接口继承的区别
interface A {
  a: string;
  x: number;
}

interface B {
  b: string;
  x: string; // 与 A 中的 x 属性类型不同
}

// 交叉类型会合并冲突的类型
type AB = A & B; // { a: string; b: string; x: never }

// 实际应用：混入模式
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActive = false;
    activate() {
      this.isActive = true;
    }
    deactivate() {
      this.isActive = false;
    }
  };
}

// 组合多个混入
const TimestampedActivatable = Timestamped(Activatable(class {}));

const instance = new TimestampedActivatable();
console.log(instance.timestamp); // number
console.log(instance.isActive); // boolean

// 交叉类型的高级用法
type Primitive = string | number | boolean;

type NonPrimitive = object;

type NonNullable<T> = T extends null | undefined ? never : T;

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface Company {
  name: string;
  address: {
    street: string;
    city: string;
  };
}

type ReadonlyCompany = DeepReadonly<Company>;
// 所有属性递归地变为只读
```

### 综合应用示例

```ts
// 创建一个函数，可以安全地访问对象属性
function pluck<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map((key) => obj[key]);
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const product: Product = {
  id: 1,
  name: "手机",
  price: 2999,
  category: "电子产品",
};

// 安全地获取多个属性
const productInfo = pluck(product, ["name", "price"]); // (string | number)[]

// 创建只读类型
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyProduct = Readonly<Product>;
// 所有属性都变为只读
```

## 四、TypeScript 其他重要关键字详解

### 1. `as` - 类型断言

```ts
// 基本类型断言
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

// DOM 元素断言
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// 双重断言（谨慎使用）
let value = "hello" as any as number;
```

**特点：**

- 告诉编译器"我知道这个类型是什么"
- 在 JSX 语法中使用 `as` 而不是尖括号语法
- 不会进行运行时类型检查

### 2. `is` - 类型保护

```ts
// 自定义类型保护函数
function isString(value: any): value is string {
  return typeof value === "string";
}

function isNumber(value: any): value is number {
  return typeof value === "number";
}

// 使用类型保护
function processValue(value: string | number) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // value 被收窄为 string
  } else if (isNumber(value)) {
    console.log(value.toFixed(2)); // value 被收窄为 number
  }
}
```

### 3. `infer` - 类型推断

```ts
// 在条件类型中推断类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type FunctionType = () => string;
type ReturnValue = ReturnType<FunctionType>; // string

// 推断数组元素类型
type ElementType<T> = T extends (infer U)[] ? U : never;
type StringArray = string[];
type Element = ElementType<StringArray>; // string

// 推断 Promise 的解析类型
type Awaited<T> = T extends Promise<infer U> ? U : T;
type PromiseString = Promise<string>;
type Resolved = Awaited<PromiseString>; // string
```

### 4. `never` - 永不存在的类型

```ts
// 抛出异常的函数
function throwError(message: string): never {
  throw new Error(message);
}

// 无限循环的函数
function infiniteLoop(): never {
  while (true) {}
}

// 穷尽检查
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    default:
      const _exhaustiveCheck: never = shape; // 如果遗漏了情况，这里会报错
      return _exhaustiveCheck;
  }
}
```

### 5. `unknown` - 类型安全的 any

```ts
// 与 any 的区别
let anyValue: any = "hello";
let unknownValue: unknown = "hello";

anyValue.foo(); // OK，但运行时可能报错
// unknownValue.foo(); // Error，需要先进行类型检查

// 安全使用 unknown
function processUnknown(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // OK，已经验证
  } else if (Array.isArray(value)) {
    console.log(value.length); // OK，已经验证
  }
}

// 类型断言
let value: unknown = "hello";
let str: string = value as string;
```

### 6. `readonly` - 只读修饰符

```ts
// 只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}

const p: Point = { x: 10, y: 20 };
// p.x = 5; // Error: Cannot assign to 'x' because it is a read-only property

// 只读数组
let readonlyArray: readonly number[] = [1, 2, 3];
// readonlyArray.push(4); // Error

// 映射类型中的 readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// 移除 readonly
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
```

### 7. `declare` - 声明语句

```ts
// 声明全局变量
declare const process: any;
declare let window: Window;

// 声明函数
declare function alert(message?: any): void;

// 声明模块
declare module "lodash" {
  export function chunk<T>(array: T[], size: number): T[][];
}

// 声明命名空间
declare namespace NodeJS {
  interface Global {
    myGlobal: string;
  }
}
```

### 8. 访问修饰符

```ts
class Person {
  public name: string; // 公有，默认
  private age: number; // 私有，只能在类内部访问
  protected gender: string; // 受保护，可以在类及子类中访问
  readonly id: number; // 只读属性

  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.id = Math.random();
  }

  public getAge() {
    return this.age; // OK，在类内部访问
  }
}

class Employee extends Person {
  private salary: number;

  getGender() {
    return this.gender; // OK，protected 可以在子类中访问
    // return this.age; // Error，private 不能在子类中访问
  }
}
```

### 9. `abstract` - 抽象类和方法

```ts
// 抽象类
abstract class Animal {
  abstract makeSound(): void; // 抽象方法

  move(): void {
    // 具体方法
    console.log("Moving...");
  }
}

// 具体实现
class Dog extends Animal {
  makeSound(): void {
    // 必须实现抽象方法
    console.log("汪汪!");
  }
}

// 抽象类的使用
const animal: Animal = new Dog(); // OK，可以创建子类实例
// const animal2 = new Animal(); // Error，不能直接实例化抽象类
```

### 10. `implements` - 接口实现

```ts
// 接口定义
interface Drawable {
  draw(): void;
  getArea(): number;
}

interface Resizable {
  resize(factor: number): void;
}

// 类实现接口
class Circle implements Drawable, Resizable {
  constructor(private radius: number) {}

  draw(): void {
    console.log("Drawing circle");
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  resize(factor: number): void {
    this.radius *= factor;
  }
}
```

### 11. `static` - 静态成员

```ts
class MathUtils {
  static PI = 3.14159;

  static calculateArea(radius: number): number {
    return this.PI * radius ** 2;
  }

  static createCircle(radius: number) {
    return new this(radius); // 静态方法中可以使用 this 访问构造函数
  }

  constructor(private radius: number) {}
}

// 使用静态成员
console.log(MathUtils.PI);
console.log(MathUtils.calculateArea(5));
```

### 12. `asserts` - 断言函数

```ts
// 断言函数
function assert(condition: any): asserts condition {
  if (!condition) {
    throw new Error("Assertion failed");
  }
}

function assertIsString(value: any): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value must be a string");
  }
}

// 使用断言函数
function processValue(value: unknown) {
  assertIsString(value);
  console.log(value.toUpperCase()); // OK，TypeScript 知道 value 是 string
}
```

这些关键字构成了 TypeScript 类型系统和面向对象编程的核心，掌握它们对于编写类型安全、结构清晰的代码非常重要。
