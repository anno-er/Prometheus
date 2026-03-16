# MongoDB 与 Mongoose 知识点

### 1. 什么是 MongoDB? 它有什么特点?

**定义：**
MongoDB 是一个基于分布式文件存储的开源 NoSQL 数据库，使用 BSON（Binary JSON）格式存储数据，支持灵活的文档模型。

**特点：**

- **文档存储**：以文档为单位存储数据，类似 JSON 格式
- **模式灵活**：无需预定义表结构，字段可动态添加
- **高性能**：支持索引，查询效率高
- **高可用**：支持副本集，自动故障转移
- **水平扩展**：支持分片，易于扩展
- **丰富的查询语言**：支持聚合管道、全文搜索等
- **跨平台**：支持 Windows、Linux、macOS

---

### 2. MongoDB 与关系型数据库有什么区别?

| 特性         | MongoDB                      | 关系型数据库 (MySQL)       |
| ------------ | ---------------------------- | -------------------------- |
| 数据模型     | 文档模型 (BSON)              | 表格模型 (行和列)          |
| 模式         | 灵活，无需预定义             | 固定，需预定义表结构       |
| 查询语言     | MongoDB 查询语言             | SQL                        |
| 事务支持     | 4.0+ 支持多文档事务          | 完善的事务支持             |
| 关联查询     | 嵌入式文档 + $lookup         | JOIN 关联查询              |
| 扩展方式     | 水平扩展（分片）             | 垂直扩展为主               |
| 索引类型     | 多种索引（单键、复合、全文） | B+ 树索引                  |
| 适用场景     | 非结构化数据、高并发写入     | 结构化数据、复杂事务       |

---

### 3. MongoDB 中的数据库、集合、文档分别是什么?

**概念对应：**

| MongoDB     | 关系型数据库 |
| ----------- | ------------ |
| Database    | 数据库       |
| Collection  | 表           |
| Document    | 行           |
| Field       | 列           |
| Index       | 索引         |
| _id         | 主键         |

**示例：**

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "张三",
  "age": 25,
  "address": {
    "city": "北京",
    "street": "长安街"
  },
  "hobbies": ["阅读", "游泳"]
}
```

---

### 4. MongoDB 中有哪些常用的数据类型?

| 数据类型        | 说明                   | 示例                           |
| --------------- | ---------------------- | ------------------------------ |
| String          | 字符串                 | `"hello"`                      |
| Number          | 数值（32位整数或64位浮点） | `123`, `3.14`                  |
| Boolean         | 布尔值                 | `true`, `false`                |
| ObjectId        | 对象 ID（12字节）      | `ObjectId("...")`              |
| Array           | 数组                   | `[1, 2, 3]`                    |
| Object          | 嵌入文档               | `{ "key": "value" }`           |
| Date            | 日期时间               | `new Date()`                   |
| Null            | 空值                   | `null`                         |
| Binary Data     | 二进制数据             | 图片、文件等                   |
| Decimal128      | 高精度小数             | `NumberDecimal("3.14159")`     |
| Timestamp       | 时间戳                 | `Timestamp(123456789, 1)`      |
| Regular Express | 正则表达式             | `/pattern/`                    |

---

### 5. MongoDB 中如何进行 CRUD 操作?

**插入文档：**

```javascript
db.users.insertOne({ name: "张三", age: 25 });
db.users.insertMany([
  { name: "李四", age: 30 },
  { name: "王五", age: 28 }
]);
```

**查询文档：**

```javascript
db.users.find({ age: { $gt: 25 } });
db.users.findOne({ name: "张三" });
db.users.find({}).sort({ age: -1 }).limit(10).skip(0);
```

**更新文档：**

```javascript
db.users.updateOne(
  { name: "张三" },
  { $set: { age: 26 } }
);

db.users.updateMany(
  { age: { $lt: 30 } },
  { $inc: { age: 1 } }
);

db.users.replaceOne(
  { name: "张三" },
  { name: "张三", age: 30, city: "上海" }
);
```

**删除文档：**

```javascript
db.users.deleteOne({ name: "张三" });
db.users.deleteMany({ age: { $lt: 18 } });
```

---

### 6. MongoDB 中有哪些常用的查询操作符?

**比较操作符：**

| 操作符 | 说明     | 示例                          |
| ------ | -------- | ----------------------------- |
| `$eq`  | 等于     | `{ age: { $eq: 25 } }`        |
| `$ne`  | 不等于   | `{ age: { $ne: 25 } }`        |
| `$gt`  | 大于     | `{ age: { $gt: 25 } }`        |
| `$gte` | 大于等于 | `{ age: { $gte: 25 } }`       |
| `$lt`  | 小于     | `{ age: { $lt: 25 } }`        |
| `$lte` | 小于等于 | `{ age: { $lte: 25 } }`       |
| `$in`  | 在数组中 | `{ age: { $in: [20, 25, 30] } }` |
| `$nin` | 不在数组中 | `{ age: { $nin: [20, 25] } }` |

**逻辑操作符：**

| 操作符 | 说明   | 示例                                      |
| ------ | ------ | ----------------------------------------- |
| `$and` | 逻辑与 | `{ $and: [{ age: { $gt: 20 } }, { age: { $lt: 30 } }] }` |
| `$or`  | 逻辑或 | `{ $or: [{ status: "active" }, { vip: true }] }` |
| `$not` | 逻辑非 | `{ age: { $not: { $gt: 25 } } }`          |
| `$nor` | 逻辑或非 | `{ $nor: [{ age: 20 }, { age: 30 }] }`  |

**元素操作符：**

| 操作符     | 说明           | 示例                      |
| ---------- | -------------- | ------------------------- |
| `$exists`  | 字段是否存在   | `{ email: { $exists: true } }` |
| `$type`    | 字段类型       | `{ age: { $type: "number" } }` |

**数组操作符：**

| 操作符      | 说明               | 示例                              |
| ----------- | ------------------ | --------------------------------- |
| `$all`      | 匹配所有元素       | `{ tags: { $all: ["node", "js"] } }` |
| `$elemMatch`| 匹配数组元素条件   | `{ scores: { $elemMatch: { $gt: 80, $lt: 90 } } }` |
| `$size`     | 数组长度           | `{ tags: { $size: 3 } }`          |

---

### 7. MongoDB 中如何使用聚合管道?

**常用阶段：**

| 阶段         | 说明             |
| ------------ | ---------------- |
| `$match`     | 过滤文档         |
| `$group`     | 分组聚合         |
| `$project`   | 选择/重命名字段  |
| `$sort`      | 排序             |
| `$limit`     | 限制数量         |
| `$skip`      | 跳过数量         |
| `$lookup`    | 关联查询         |
| `$unwind`    | 展开数组         |
| `$addFields` | 添加新字段       |
| `$count`     | 统计数量         |

**示例：**

```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$userId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
]);

db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $project: {
      orderId: "$_id",
      amount: 1,
      userName: "$user.name"
    }
  }
]);
```

---

### 8. MongoDB 中索引的作用是什么? 有哪些类型?

**作用：**

- 提高查询效率
- 减少扫描文档数量
- 支持排序和去重

**索引类型：**

| 类型           | 说明                     | 创建示例                              |
| -------------- | ------------------------ | ------------------------------------- |
| 单键索引       | 单个字段索引             | `db.users.createIndex({ name: 1 })`   |
| 复合索引       | 多个字段组合索引         | `db.users.createIndex({ name: 1, age: -1 })` |
| 多键索引       | 数组字段索引             | `db.users.createIndex({ tags: 1 })`   |
| 文本索引       | 全文搜索索引             | `db.articles.createIndex({ content: "text" })` |
| 地理空间索引   | 地理位置查询             | `db.places.createIndex({ location: "2dsphere" })` |
| 哈希索引       | 哈希分片键               | `db.users.createIndex({ _id: "hashed" })` |
| TTL 索引       | 自动过期删除             | `db.logs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })` |

**索引管理：**

```javascript
db.users.getIndexes();
db.users.dropIndex("name_1");
db.users.dropIndexes();
```

---

### 9. 什么是 MongoDB 的副本集?

**定义：**
副本集是一组维护相同数据集的 MongoDB 实例，提供数据冗余和高可用性。

**架构：**

- **Primary（主节点）**：处理所有写操作
- **Secondary（从节点）**：复制主节点数据，可处理读请求
- **Arbiter（仲裁节点）**：不存储数据，仅参与选举投票

**特点：**

- 自动故障转移
- 数据冗余备份
- 读写分离
- 最少 3 个节点（推荐）

**创建副本集：**

```javascript
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "localhost:27017" },
    { _id: 1, host: "localhost:27018" },
    { _id: 2, host: "localhost:27019" }
  ]
});

rs.status();
rs.add("localhost:27020");
rs.remove("localhost:27020");
```

---

### 10. 什么是 MongoDB 的分片?

**定义：**
分片是将数据分散存储在多个服务器上的方法，用于支持大数据量和高吞吐量的水平扩展。

**组件：**

- **Shard（分片）**：存储数据子集，通常是一个副本集
- **Config Servers**：存储集群元数据和配置
- **mongos（路由器）**：路由客户端请求到正确的分片

**分片键选择原则：**

- 高基数（值多样性高）
- 分布均匀
- 查询热点字段

**分片类型：**

| 类型       | 说明                         |
| ---------- | ---------------------------- |
| 范围分片   | 按分片键值范围划分           |
| 哈希分片   | 按分片键哈希值均匀分布       |

---

### 11. 什么是 Mongoose? 它有什么作用?

**定义：**
Mongoose 是 MongoDB 的对象数据模型（ODM）库，为 Node.js 提供了一种直接的、基于模式的解决方案来建模应用数据。

**作用：**

- **Schema 定义**：定义文档结构和数据类型
- **数据验证**：内置和自定义验证器
- **中间件**：支持前置和后置钩子
- **查询构建**：链式调用构建复杂查询
- **类型转换**：自动类型转换
- **虚拟属性**：计算属性
- **索引管理**：自动创建索引

---

### 12. Mongoose 中 Schema、Model、Document 的关系是什么?

**关系图：**

```
Schema → 定义结构 → Model → 创建 → Document
           ↓           ↓           ↓
        字段定义     集合操作     文档实例
```

**示例：**

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0, max: 150 },
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

const user = new User({
  name: "张三",
  age: 25,
  email: "zhangsan@example.com"
});
```

---

### 13. Mongoose 中如何定义 Schema 类型?

**基本类型：**

```javascript
const schema = new mongoose.Schema({
  stringField: String,
  numberField: Number,
  dateField: Date,
  bufferField: Buffer,
  booleanField: Boolean,
  mixedField: mongoose.Schema.Types.Mixed,
  objectIdField: mongoose.Schema.Types.ObjectId,
  arrayField: [String],
  decimalField: mongoose.Schema.Types.Decimal128,
  mapField: {
    type: Map,
    of: String
  }
});
```

**SchemaType 配置：**

```javascript
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "姓名必填"],
    trim: true,
    lowercase: true,
    maxlength: 50,
    minlength: 2
  },
  age: {
    type: Number,
    min: 0,
    max: 150,
    default: 18
  },
  email: {
    type: String,
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/
  },
  role: {
    type: String,
    enum: ["user", "admin", "guest"],
    default: "user"
  },
  tags: {
    type: [String],
    default: []
  }
});
```

---

### 14. Mongoose 中如何进行 CRUD 操作?

**创建文档：**

```javascript
const User = mongoose.model("User", userSchema);

const user = await User.create({
  name: "张三",
  age: 25
});

const user = new User({ name: "李四" });
await user.save();

const users = await User.insertMany([
  { name: "王五" },
  { name: "赵六" }
]);
```

**查询文档：**

```javascript
const users = await User.find({ age: { $gte: 20 } });
const user = await User.findOne({ name: "张三" });
const user = await User.findById("64f1a2b3c4d5e6f7a8b9c0d1");

const users = await User.find()
  .sort({ age: -1 })
  .limit(10)
  .skip(0)
  .select("name age");

const count = await User.countDocuments({ age: { $gt: 20 } });
const exists = await User.exists({ name: "张三" });
```

**更新文档：**

```javascript
await User.updateOne(
  { name: "张三" },
  { $set: { age: 26 } }
);

await User.updateMany(
  { age: { $lt: 18 } },
  { $set: { role: "minor" } }
);

const user = await User.findByIdAndUpdate(
  "64f1a2b3c4d5e6f7a8b9c0d1",
  { age: 30 },
  { new: true, runValidators: true }
);

user.age = 31;
await user.save();
```

**删除文档：**

```javascript
await User.deleteOne({ name: "张三" });
await User.deleteMany({ age: { $lt: 18 } });

const user = await User.findByIdAndDelete("64f1a2b3c4d5e6f7a8b9c0d1");

await user.remove();
```

---

### 15. Mongoose 中如何实现数据验证?

**内置验证器：**

| 验证器     | 适用类型     | 说明               |
| ---------- | ------------ | ------------------ |
| `required` | 所有         | 必填               |
| `min`      | Number       | 最小值             |
| `max`      | Number       | 最大值             |
| `minlength`| String       | 最小长度           |
| `maxlength`| String       | 最大长度           |
| `enum`     | String       | 枚举值             |
| `match`    | String       | 正则匹配           |
| `unique`   | 所有         | 唯一值（需索引）   |

**自定义验证器：**

```javascript
const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /^1[3-9]\d{9}$/.test(v);
      },
      message: props => `${props.value} 不是有效的手机号码`
    }
  },
  password: {
    type: String,
    validate: [
      {
        validator: function(v) {
          return v.length >= 6;
        },
        message: "密码长度至少6位"
      },
      {
        validator: function(v) {
          return /\d/.test(v) && /[a-zA-Z]/.test(v);
        },
        message: "密码必须包含数字和字母"
      }
    ]
  }
});
```

**运行验证：**

```javascript
const user = new User({ name: "" });
try {
  await user.save();
} catch (err) {
  console.error(err.message);
}

await user.validate();
```

---

### 16. Mongoose 中间件有哪些类型?

**类型：**

| 中间件类型     | 触发时机         | 适用操作                           |
| -------------- | ---------------- | ---------------------------------- |
| `pre`          | 操作前           | `save`, `validate`, `remove`, `updateOne` 等 |
| `post`         | 操作后           | 同上                               |

**Pre 中间件：**

```javascript
userSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = hashPassword(this.password);
  }
  next();
});

userSchema.pre("save", async function() {
  if (this.isNew) {
    const count = await User.countDocuments();
    this.userId = `U${String(count + 1).padStart(6, "0")}`;
  }
});

userSchema.pre("deleteOne", { document: true }, function(next) {
  console.log("删除用户:", this._id);
  next();
});
```

**Post 中间件：**

```javascript
userSchema.post("save", function(doc) {
  console.log("用户已保存:", doc._id);
});

userSchema.post("save", function(err, doc, next) {
  if (err.name === "MongoError" && err.code === 11000) {
    next(new Error("邮箱已存在"));
  } else {
    next(err);
  }
});

userSchema.post("remove", function(doc) {
  console.log("用户已删除:", doc._id);
});
```

---

### 17. Mongoose 中如何实现关联查询?

**方式一：ObjectId 引用**

```javascript
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Post = mongoose.model("Post", postSchema);

const post = await Post.findById(id).populate("author");
console.log(post.author.name);

const posts = await Post.find().populate({
  path: "author",
  select: "name email -_id",
  match: { age: { $gte: 18 } }
});
```

**方式二：嵌套文档**

```javascript
const userSchema = new mongoose.Schema({
  name: String,
  address: {
    city: String,
    street: String,
    zipCode: String
  }
});
```

**方式三：子文档数组**

```javascript
const orderSchema = new mongoose.Schema({
  orderNo: String,
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    price: Number
  }]
});

const order = await Order.findById(id).populate("items.productId");
```

---

### 18. Mongoose 中如何使用虚拟属性?

**定义：**
虚拟属性是不会持久化到数据库的计算属性，可以动态生成。

```javascript
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

userSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual("fullName").set(function(name) {
  const [firstName, lastName] = name.split(" ");
  this.firstName = firstName;
  this.lastName = lastName;
});

const User = mongoose.model("User", userSchema);
const user = new User({ firstName: "张", lastName: "三" });
console.log(user.fullName);

user.fullName = "李 四";
console.log(user.firstName);
```

**虚拟属性填充：**

```javascript
userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
  justOne: false
});

const user = await User.findById(id).populate("posts");
```

---

### 19. Mongoose 中如何处理事务?

**使用事务（MongoDB 4.0+）：**

```javascript
const mongoose = require("mongoose");

async function transferMoney(fromId, toId, amount) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const from = await Account.findById(fromId).session(session);
    const to = await Account.findById(toId).session(session);

    if (from.balance < amount) {
      throw new Error("余额不足");
    }

    from.balance -= amount;
    to.balance += amount;

    await from.save({ session });
    await to.save({ session });

    await session.commitTransaction();
    console.log("转账成功");
  } catch (err) {
    await session.abortTransaction();
    console.error("转账失败:", err.message);
    throw err;
  } finally {
    session.endSession();
  }
}
```

**withTransaction 方法：**

```javascript
await mongoose.connection.transaction(async (session) => {
  await Order.create([{ userId, amount }], { session });
  await User.updateOne({ _id: userId }, { $inc: { orderCount: 1 } }).session(session);
});
```

---

### 20. Mongoose 中如何使用索引?

**定义索引：**

```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, index: true },
  email: { type: String, unique: true },
  age: Number,
  location: {
    type: { type: String },
    coordinates: [Number]
  }
});

userSchema.index({ name: 1, age: -1 });
userSchema.index({ location: "2dsphere" });
userSchema.index({ email: 1 }, { sparse: true });
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const User = mongoose.model("User", userSchema);

User.createIndexes();
User.ensureIndexes();
User.dropIndexes();
```

---

### 21. Mongoose 中 lean() 方法有什么作用?

**作用：**
`lean()` 将查询结果转换为纯 JavaScript 对象，跳过 Mongoose 文档包装，提高查询性能。

**对比：**

```javascript
const users = await User.find();
console.log(users[0] instanceof mongoose.Document);

const usersLean = await User.find().lean();
console.log(usersLean[0] instanceof mongoose.Document);
```

**适用场景：**

- 大量数据查询
- 只读操作
- 不需要 Mongoose 功能（验证、中间件、虚拟属性）

**性能对比：**

```javascript
console.time("with mongoose");
const users1 = await User.find().limit(10000);
console.timeEnd("with mongoose");

console.time("with lean");
const users2 = await User.find().lean().limit(10000);
console.timeEnd("with lean");
```

---

### 22. Mongoose 中如何实现分页查询?

**方式一：skip + limit**

```javascript
async function paginate(page, pageSize) {
  const skip = (page - 1) * pageSize;
  const [list, total] = await Promise.all([
    User.find().skip(skip).limit(pageSize).sort({ createdAt: -1 }),
    User.countDocuments()
  ]);
  return {
    list,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize)
  };
}
```

**方式二：使用 mongoose-paginate-v2 插件**

```javascript
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema({ name: String });
userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema);

const result = await User.paginate({}, { page: 1, limit: 10 });
console.log(result.docs, result.totalPages);
```

**方式三：游标分页（大数据量推荐）**

```javascript
async function cursorPagination(lastId, pageSize) {
  const query = lastId ? { _id: { $gt: lastId } } : {};
  const list = await User.find(query)
    .sort({ _id: 1 })
    .limit(pageSize);
  const nextCursor = list.length > 0 ? list[list.length - 1]._id : null;
  return { list, nextCursor };
}
```

---

### 23. Mongoose 中如何处理批量操作?

**bulkWrite：**

```javascript
const bulkOps = [
  {
    updateOne: {
      filter: { name: "张三" },
      update: { $set: { age: 26 } }
    }
  },
  {
    insertOne: {
      document: { name: "新用户", age: 20 }
    }
  },
  {
    deleteOne: {
      filter: { name: "已删除" }
    }
  }
];

const result = await User.bulkWrite(bulkOps);
console.log(result.modifiedCount, result.insertedCount, result.deletedCount);
```

**批量插入：**

```javascript
const users = await User.insertMany([
  { name: "用户1" },
  { name: "用户2" }
], { ordered: false });
```

---

### 24. MongoDB 中如何实现事务? (原生方式)

**使用 session：**

```javascript
const client = new MongoClient("mongodb://localhost:27017");

async function transfer(fromId, toId, amount) {
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const db = client.db("test");

      await db.collection("accounts").updateOne(
        { _id: fromId },
        { $inc: { balance: -amount } },
        { session }
      );

      await db.collection("accounts").updateOne(
        { _id: toId },
        { $inc: { balance: amount } },
        { session }
      );
    });
  } finally {
    await session.endSession();
  }
}
```

---

### 25. MongoDB 中如何实现全文搜索?

**创建文本索引：**

```javascript
db.articles.createIndex({ title: "text", content: "text" });
```

**全文搜索：**

```javascript
db.articles.find({ $text: { $search: "MongoDB 教程" } });

db.articles.find(
  { $text: { $search: "MongoDB" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });
```

**Mongoose 中使用：**

```javascript
const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

articleSchema.index({ title: "text", content: "text" });

const Article = mongoose.model("Article", articleSchema);

const results = await Article.find(
  { $text: { $search: "关键词" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });
```

---

### 26. MongoDB 中如何处理时区问题?

**存储 UTC 时间：**

```javascript
db.events.insertOne({
  name: "会议",
  time: new Date()
});
```

**聚合中转换时区：**

```javascript
db.events.aggregate([
  {
    $project: {
      name: 1,
      localTime: {
        $dateToString: {
          format: "%Y-%m-%d %H:%M:%S",
          date: "$time",
          timezone: "Asia/Shanghai"
        }
      }
    }
  }
]);
```

**Mongoose 中处理：**

```javascript
const eventSchema = new mongoose.Schema({
  name: String,
  time: { type: Date, default: Date.now }
});

eventSchema.virtual("localTime").get(function() {
  return this.time.toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai"
  });
});
```

---

### 27. Mongoose 中如何实现软删除?

**方式一：添加 deleted 字段**

```javascript
const schema = new mongoose.Schema({
  name: String,
  deleted: { type: Boolean, default: false },
  deletedAt: Date
});

schema.methods.softDelete = async function() {
  this.deleted = true;
  this.deletedAt = new Date();
  return this.save();
};

schema.statics.findActive = function() {
  return this.find({ deleted: false });
};

schema.pre("find", function() {
  this.where({ deleted: false });
});

schema.pre("findOne", function() {
  this.where({ deleted: false });
});
```

**方式二：使用 mongoose-delete 插件**

```javascript
const mongooseDelete = require("mongoose-delete");

const schema = new mongoose.Schema({ name: String });
schema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

const User = mongoose.model("User", schema);

await user.delete();
await User.find();
await User.findWithDeleted();
await User.restore({ _id: id });
```

---

### 28. Mongoose 中如何处理并发更新?

**方式一：版本号（__v）**

```javascript
const schema = new mongoose.Schema({ balance: Number });

const Account = mongoose.model("Account", schema);

const account = await Account.findById(id);
account.balance += 100;
await account.save();
```

**方式二：乐观锁**

```javascript
schema.pre("save", function(next) {
  if (this.isModified() && !this.$__version) {
    const err = new Error("文档已被修改，请刷新后重试");
    return next(err);
  }
  next();
});
```

**方式三：原子操作**

```javascript
await Account.updateOne(
  { _id: id, balance: { $gte: 100 } },
  { $inc: { balance: -100 } }
);
```

---

### 29. MongoDB 中如何实现数据去重?

**方式一：distinct**

```javascript
const tags = await User.distinct("tags");
```

**方式二：聚合去重**

```javascript
const uniqueUsers = await User.aggregate([
  { $group: { _id: "$email", doc: { $first: "$$ROOT" } } },
  { $replaceRoot: { newRoot: "$doc" } }
]);
```

**方式三：删除重复数据**

```javascript
db.users.aggregate([
  { $group: { _id: "$email", ids: { $push: "$_id" }, count: { $sum: 1 } } },
  { $match: { count: { $gt: 1 } } }
]).forEach(doc => {
  doc.ids.slice(1).forEach(id => {
    db.users.deleteOne({ _id: id });
  });
});
```

---

### 30. MongoDB 与 Mongoose 的最佳实践有哪些?

**连接管理：**

```javascript
mongoose.connect("mongodb://localhost:27017/test", {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
});

mongoose.connection.on("connected", () => console.log("连接成功"));
mongoose.connection.on("error", err => console.error("连接错误:", err));
mongoose.connection.on("disconnected", () => console.log("连接断开"));

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
```

**Schema 设计原则：**

- 根据访问模式设计，而非数据关系
- 嵌入文档用于一对一和一对少量关系
- 引用用于一对多和多对多关系
- 避免无限增长的数组

**性能优化：**

- 合理使用索引
- 使用 `lean()` 提高只读性能
- 批量操作替代循环单条操作
- 使用投影减少返回字段

**安全实践：**

- 启用身份认证
- 使用 TLS/SSL 加密
- 限制网络访问
- 定期备份
- 敏感字段加密存储
