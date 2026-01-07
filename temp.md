1. 路由守卫：
   全局路由守卫： beforeEach， beforeResolve, afterEach
   路由独享守卫： beforeEnter
   组件内守卫： beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave

2. 加载性能和渲染性能

3. 宏任务 -> 微任务队列 -> 清空 -> 宏任务

4. HTTP： 无状态协议，请求-响应模型，基于 TCP 协议 keep-alive 机制, 缓存机制
   HTTPS: 基于 SSL/TLS 协议，加密传输，保障数据安全
   HTTP/2: 基于二进制协议，多路复用，头部压缩，服务器推送等特性，提升了性能
   HTTP/3: 基于 QUIC 协议，实现了低延迟和高吞吐量，解决了 HTTP/2 中的队头阻塞问题
