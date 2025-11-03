/* 手写Express中间层实现 */
class Application {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  next(layer = 0) {
    if (layer < this.middlewares.length) {
      this.middlewares[layer]();
      this.next(++layer);
    }
  }

  run() {
    this.next();
  }
}

const app = new Application();
app.use(() => {
  console.log("@@-->1", 1);
});
app.use(() => {
  console.log("@@-->3", 3);
});
app.use(() => {
  console.log("@@-->5", 5);
});

app.run();

app.run();
