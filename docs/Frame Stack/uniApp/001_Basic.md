# uni-app 基础知识与面试题大全

## 目录

- [一、uni-app 基础知识](#一uni-app-基础知识)
- [二、核心概念详解](#二核心概念详解)
- [三、开发技巧与最佳实践](#三开发技巧与最佳实践)
- [四、常见面试题](#四常见面试题)
- [五、性能优化与跨端适配](#五性能优化与跨端适配)

---

## 一、uni-app 基础知识

### 1.1 uni-app 简介

**uni-app** 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。

#### 核心特点

- **一套代码，多端发布**：通过条件编译实现平台差异化处理
- **Vue.js 语法**：基于 Vue.js 开发，学习成本低
- **丰富的组件和 API**：提供丰富的跨端组件和 API
- **完善的生态**：插件市场、UI 库、开发工具完善
- **性能优异**：原生渲染，性能接近原生应用

#### 支持平台

| 平台类型 | 具体平台                                                   |
| -------- | ---------------------------------------------------------- |
| 小程序   | 微信、支付宝、百度、头条、QQ、钉钉、淘宝、快手、飞书、京东 |
| App      | iOS、Android                                               |
| Web      | H5、PC Web                                                 |
| 快应用   | 华为、小米、OPPO、vivo 等厂商快应用                        |

### 1.2 环境搭建

#### 开发工具

**HBuilderX**（推荐）

- DCloud 官方开发工具
- 内置 uni-app 编译器
- 支持可视化创建项目
- 提供代码提示和调试功能

**VS Code**

- 安装 uni-app 插件
- 需要配置编译环境
- 适合习惯 VS Code 的开发者

#### 项目创建

```bash
# 使用 HBuilderX 创建
# 文件 -> 新建 -> 项目 -> uni-app

# 使用 CLI 创建（Vue 3）
npx degit dcloudio/uni-preset-vue#vite-ts my-project

# 使用 CLI 创建（Vue 2）
npx degit dcloudio/uni-preset-vue my-project
```

#### 项目结构

```
my-project/
├── pages/                  # 页面文件夹
│   ├── index/             # 首页
│   │   ├── index.vue      # 首页组件
│   │   └── main.js        # 页面入口（可选）
│   └── user/              # 用户页面
│       └── user.vue
├── static/                # 静态资源
│   ├── images/           # 图片资源
│   └── icons/            # 图标资源
├── uni_modules/          # uni-app 插件
├── common/               # 公共文件
│   ├── css/             # 公共样式
│   ├── js/              # 公共 JS
│   └── utils/           # 工具函数
├── components/           # 自定义组件
├── store/               # Vuex/Pinia 状态管理
├── api/                 # API 接口
├── App.vue              # 应用配置
├── main.js              # 入口文件
├── manifest.json        # 配置文件
├── pages.json           # 页面路由配置
└── uni.scss             # 全局样式变量
```

### 1.3 核心配置文件

#### pages.json - 页面路由配置

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页",
        "navigationBarBackgroundColor": "#007AFF",
        "navigationBarTextStyle": "white",
        "backgroundColor": "#F8F8F8",
        "enablePullDownRefresh": true,
        "backgroundTextStyle": "dark"
      }
    },
    {
      "path": "pages/user/user",
      "style": {
        "navigationBarTitleText": "用户中心"
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  },
  "tabBar": {
    "color": "#7A7E83",
    "selectedColor": "#007AFF",
    "borderStyle": "black",
    "backgroundColor": "#F8F8F8",
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "static/home.png",
        "selectedIconPath": "static/home-active.png",
        "text": "首页"
      },
      {
        "pagePath": "pages/user/user",
        "iconPath": "static/user.png",
        "selectedIconPath": "static/user-active.png",
        "text": "我的"
      }
    ]
  }
}
```

#### manifest.json - 应用配置

```json
{
  "name": "uni-app项目",
  "appid": "__UNI__XXXXXXX",
  "description": "应用描述",
  "versionName": "1.0.0",
  "versionCode": "100",
  "transformPx": false,
  "app-plus": {
    "usingComponents": true,
    "nvueStyleCompiler": "uni-app",
    "compilerVersion": 3,
    "splashscreen": {
      "alwaysShowBeforeRender": true,
      "waiting": true,
      "autoclose": true,
      "delay": 0
    },
    "modules": {},
    "distribute": {
      "android": {
        "permissions": [
          "<uses-permission android:name=\"android.permission.CHANGE_NETWORK_STATE\"/>",
          "<uses-permission android:name=\"android.permission.MOUNT_UNMOUNT_FILESYSTEMS\"/>",
          "<uses-permission android:name=\"android.permission.VIBRATE\"/>",
          "<uses-permission android:name=\"android.permission.READ_LOGS\"/>",
          "<uses-permission android:name=\"android.permission.ACCESS_WIFI_STATE\"/>",
          "<uses-feature android:name=\"android.hardware.camera.autofocus\"/>",
          "<uses-permission android:name=\"android.permission.ACCESS_NETWORK_STATE\"/>",
          "<uses-permission android:name=\"android.permission.CAMERA\"/>",
          "<uses-permission android:name=\"android.permission.GET_ACCOUNTS\"/>",
          "<uses-permission android:name=\"android.permission.READ_PHONE_STATE\"/>",
          "<uses-permission android:name=\"android.permission.CHANGE_WIFI_STATE\"/>",
          "<uses-permission android:name=\"android.permission.WAKE_LOCK\"/>",
          "<uses-permission android:name=\"android.permission.FLASHLIGHT\"/>",
          "<uses-feature android:name=\"android.hardware.camera\"/>",
          "<uses-permission android:name=\"android.permission.WRITE_SETTINGS\"/>"
        ]
      },
      "ios": {},
      "sdkConfigs": {}
    }
  },
  "quickapp": {},
  "mp-weixin": {
    "appid": "wx000000000000",
    "setting": {
      "urlCheck": false
    },
    "usingComponents": true
  },
  "mp-alipay": {
    "usingComponents": true
  },
  "mp-baidu": {
    "usingComponents": true
  },
  "mp-toutiao": {
    "usingComponents": true
  },
  "uniStatistics": {
    "enable": false
  },
  "vueVersion": "3"
}
```

---

## 二、核心概念详解

### 2.1 生命周期

uni-app 的生命周期分为三类：应用生命周期、页面生命周期和组件生命周期。

#### 应用生命周期（App.vue）

```vue
<script>
export default {
  onLaunch: function () {
    console.log("App Launch - 应用初始化完成");
  },
  onShow: function () {
    console.log("App Show - 应用从后台进入前台");
  },
  onHide: function () {
    console.log("App Hide - 应用从前台进入后台");
  },
  onError: function (err) {
    console.log("App Error - 应用发生错误", err);
  },
  onUniNViewMessage: function (e) {
    console.log("App onUniNViewMessage - nvue 页面发送的数据", e);
  },
  onUnhandledRejection: function (e) {
    console.log("App onUnhandledRejection - 未处理的 Promise 拒绝", e);
  },
  onPageNotFound: function (e) {
    console.log("App onPageNotFound - 页面不存在", e);
  },
  onThemeChange: function (e) {
    console.log("App onThemeChange - 系统主题变化", e);
  },
};
</script>
```

#### 页面生命周期

```vue
<template>
  <view class="container">
    <text>{{ message }}</text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello uni-app",
    };
  },

  onLoad(options) {
    console.log("页面加载 - 监听页面加载", options);
  },

  onShow() {
    console.log("页面显示 - 监听页面显示");
  },

  onReady() {
    console.log("页面初次渲染完成 - 监听页面初次渲染完成");
  },

  onHide() {
    console.log("页面隐藏 - 监听页面隐藏");
  },

  onUnload() {
    console.log("页面卸载 - 监听页面卸载");
  },

  onPullDownRefresh() {
    console.log("用户下拉动作");
    setTimeout(() => {
      uni.stopPullDownRefresh();
    }, 1000);
  },

  onReachBottom() {
    console.log("页面上拉触底事件");
  },

  onTabItemTap(item) {
    console.log("当前是 tab 页，点击 tab 时触发", item);
  },

  onShareAppMessage(res) {
    console.log("用户点击右上角分享");
    return {
      title: "分享标题",
      path: "/pages/index/index",
      imageUrl: "/static/share.png",
    };
  },

  onShareTimeline() {
    console.log("用户点击右上角分享到朋友圈");
    return {
      title: "分享标题",
      query: "id=123",
      imageUrl: "/static/share.png",
    };
  },

  onAddToFavorites(res) {
    console.log("用户点击右上角收藏");
    return {
      title: "收藏标题",
      imageUrl: "/static/favorite.png",
    };
  },

  onPageScroll(e) {
    console.log("页面滚动", e.scrollTop);
  },

  onResize(e) {
    console.log("窗口尺寸变化", e);
  },

  onNavigationBarButtonTap(e) {
    console.log("导航栏按钮点击事件", e);
  },

  onBackPress(e) {
    console.log("页面返回", e);
    return false;
  },

  onNavigationBarSearchInputChanged(e) {
    console.log("导航栏搜索框输入", e.text);
  },

  onNavigationBarSearchInputConfirmed(e) {
    console.log("导航栏搜索框确认", e.text);
  },

  onNavigationBarSearchInputFocused() {
    console.log("导航栏搜索框聚焦");
  },
};
</script>
```

#### 组件生命周期

```vue
<template>
  <view class="custom-component">
    <text>{{ title }}</text>
  </view>
</template>

<script>
export default {
  props: {
    title: String,
  },

  beforeCreate() {
    console.log("组件实例刚刚被创建，组件属性计算之前");
  },

  created() {
    console.log("组件实例创建完成，属性已绑定，但 DOM 还未生成");
  },

  beforeMount() {
    console.log("组件挂载之前");
  },

  mounted() {
    console.log("组件挂载之后");
  },

  beforeUpdate() {
    console.log("组件数据更新之前");
  },

  updated() {
    console.log("组件数据更新之后");
  },

  beforeDestroy() {
    console.log("组件销毁之前");
  },

  destroyed() {
    console.log("组件销毁之后");
  },
};
</script>
```

### 2.2 组件系统

#### 基础组件

uni-app 提供了丰富的基础组件，以下是常用组件：

**视图容器组件**

```vue
<template>
  <view class="container">
    <!-- view - 视图容器 -->
    <view class="box" hover-class="box-hover">
      <text>普通视图容器</text>
    </view>

    <!-- scroll-view - 可滚动视图区域 -->
    <scroll-view
      scroll-y
      class="scroll-box"
      @scrolltoupper="onScrollToUpper"
      @scrolltolower="onScrollToLower"
    >
      <view v-for="item in 20" :key="item" class="scroll-item">
        {{ item }}
      </view>
    </scroll-view>

    <!-- swiper - 滑块视图容器 -->
    <swiper
      class="swiper-box"
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      circular
    >
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <image :src="item.image" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <!-- movableView - 可移动视图 -->
    <movable-area class="move-area">
      <movable-view direction="all" class="move-view" @change="onMoveChange">
        <text>可移动</text>
      </movable-view>
    </movable-area>

    <!-- cover-view - 覆盖在原生组件上的视图 -->
    <video src="/static/video.mp4" class="video"></video>
    <cover-view class="cover-text">覆盖在视频上的文字</cover-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [
        { image: "/static/banner1.jpg" },
        { image: "/static/banner2.jpg" },
        { image: "/static/banner3.jpg" },
      ],
    };
  },
  methods: {
    onScrollToUpper() {
      console.log("滚动到顶部");
    },
    onScrollToLower() {
      console.log("滚动到底部");
    },
    onMoveChange(e) {
      console.log("移动变化", e);
    },
  },
};
</script>

<style>
.container {
  padding: 20rpx;
}

.box {
  width: 100%;
  height: 100rpx;
  background-color: #007aff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box-hover {
  background-color: #0055ff;
}

.scroll-box {
  height: 300rpx;
  border: 1rpx solid #eee;
}

.scroll-item {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  border-bottom: 1rpx solid #eee;
}

.swiper-box {
  height: 300rpx;
}

.move-area {
  width: 100%;
  height: 300rpx;
  background-color: #f0f0f0;
}

.move-view {
  width: 100rpx;
  height: 100rpx;
  background-color: #007aff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video {
  width: 100%;
  height: 400rpx;
}

.cover-text {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10rpx;
}
</style>
```

**基础内容组件**

```vue
<template>
  <view class="content">
    <!-- text - 文本 -->
    <text selectable>可选择文本</text>
    <text space="ensp">带空格的文本</text>
    <text decode>带解码的文本 &amp; &lt; &gt;</text>

    <!-- rich-text - 富文本 -->
    <rich-text :nodes="htmlString"></rich-text>

    <!-- icon - 图标 -->
    <icon type="success" size="30"></icon>
    <icon type="info" size="30"></icon>
    <icon type="warn" size="30"></icon>
    <icon type="waiting" size="30"></icon>
    <icon type="cancel" size="30"></icon>
    <icon type="download" size="30"></icon>
    <icon type="search" size="30"></icon>
    <icon type="clear" size="30"></icon>

    <!-- progress - 进度条 -->
    <progress percent="50" show-info stroke-width="6"></progress>
    <progress
      percent="80"
      active
      stroke-width="6"
      activeColor="#007AFF"
    ></progress>
  </view>
</template>

<script>
export default {
  data() {
    return {
      htmlString: '<div style="color:red;">富文本内容</div><p>段落</p>',
    };
  },
};
</script>
```

**表单组件**

```vue
<template>
  <view class="form-container">
    <!-- button - 按钮 -->
    <button type="primary" @click="handleClick">主要按钮</button>
    <button type="default">默认按钮</button>
    <button type="warn">警告按钮</button>
    <button type="primary" size="mini">迷你按钮</button>
    <button type="primary" plain>镂空按钮</button>
    <button type="primary" disabled>禁用按钮</button>
    <button type="primary" loading>加载中</button>

    <!-- input - 输入框 -->
    <view class="form-item">
      <text>用户名：</text>
      <input
        v-model="formData.username"
        placeholder="请输入用户名"
        type="text"
        maxlength="20"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
    </view>

    <view class="form-item">
      <text>密码：</text>
      <input
        v-model="formData.password"
        placeholder="请输入密码"
        type="password"
        maxlength="20"
      />
    </view>

    <!-- textarea - 多行输入框 -->
    <view class="form-item">
      <text>简介：</text>
      <textarea
        v-model="formData.intro"
        placeholder="请输入简介"
        maxlength="200"
        :auto-height="true"
      />
    </view>

    <!-- radio - 单选框 -->
    <view class="form-item">
      <text>性别：</text>
      <radio-group @change="onRadioChange">
        <label>
          <radio value="male" :checked="formData.gender === 'male'" />
          <text>男</text>
        </label>
        <label>
          <radio value="female" :checked="formData.gender === 'female'" />
          <text>女</text>
        </label>
      </radio-group>
    </view>

    <!-- checkbox - 复选框 -->
    <view class="form-item">
      <text>爱好：</text>
      <checkbox-group @change="onCheckboxChange">
        <label v-for="item in hobbies" :key="item.value">
          <checkbox
            :value="item.value"
            :checked="formData.hobbies.includes(item.value)"
          />
          <text>{{ item.label }}</text>
        </label>
      </checkbox-group>
    </view>

    <!-- switch - 开关 -->
    <view class="form-item">
      <text>开启通知：</text>
      <switch :checked="formData.notify" @change="onSwitchChange" />
    </view>

    <!-- slider - 滑块 -->
    <view class="form-item">
      <text>音量：{{ formData.volume }}</text>
      <slider
        :value="formData.volume"
        min="0"
        max="100"
        show-value
        @change="onSliderChange"
      />
    </view>

    <!-- picker - 选择器 -->
    <view class="form-item">
      <text>城市：</text>
      <picker
        mode="selector"
        :range="cities"
        :value="formData.cityIndex"
        @change="onPickerChange"
      >
        <view class="picker">{{ cities[formData.cityIndex] }}</view>
      </picker>
    </view>

    <!-- picker - 日期选择器 -->
    <view class="form-item">
      <text>生日：</text>
      <picker
        mode="date"
        :value="formData.birthday"
        start="1950-01-01"
        end="2024-12-31"
        @change="onDateChange"
      >
        <view class="picker">{{ formData.birthday }}</view>
      </picker>
    </view>

    <!-- picker - 时间选择器 -->
    <view class="form-item">
      <text>时间：</text>
      <picker mode="time" :value="formData.time" @change="onTimeChange">
        <view class="picker">{{ formData.time }}</view>
      </picker>
    </view>

    <!-- picker-view - 嵌入页面的选择器 -->
    <picker-view
      :value="pickerValue"
      @change="onPickerViewChange"
      class="picker-view"
    >
      <picker-view-column>
        <view v-for="(item, index) in years" :key="index" class="picker-item">
          {{ item }}年
        </view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item, index) in months" :key="index" class="picker-item">
          {{ item }}月
        </view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item, index) in days" :key="index" class="picker-item">
          {{ item }}日
        </view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        password: "",
        intro: "",
        gender: "male",
        hobbies: [],
        notify: false,
        volume: 50,
        cityIndex: 0,
        birthday: "1990-01-01",
        time: "12:00",
      },
      hobbies: [
        { label: "阅读", value: "reading" },
        { label: "运动", value: "sports" },
        { label: "音乐", value: "music" },
        { label: "旅行", value: "travel" },
      ],
      cities: ["北京", "上海", "广州", "深圳", "杭州"],
      pickerValue: [0, 0, 0],
      years: [],
      months: [],
      days: [],
    };
  },
  onLoad() {
    this.initPickerData();
  },
  methods: {
    initPickerData() {
      const date = new Date();
      for (let i = 1990; i <= date.getFullYear(); i++) {
        this.years.push(i);
      }
      for (let i = 1; i <= 12; i++) {
        this.months.push(i);
      }
      for (let i = 1; i <= 31; i++) {
        this.days.push(i);
      }
    },

    handleClick() {
      console.log("按钮点击");
    },

    onInput(e) {
      console.log("输入内容", e.detail.value);
    },

    onFocus() {
      console.log("输入框聚焦");
    },

    onBlur() {
      console.log("输入框失焦");
    },

    onRadioChange(e) {
      this.formData.gender = e.detail.value;
    },

    onCheckboxChange(e) {
      this.formData.hobbies = e.detail.value;
    },

    onSwitchChange(e) {
      this.formData.notify = e.detail.value;
    },

    onSliderChange(e) {
      this.formData.volume = e.detail.value;
    },

    onPickerChange(e) {
      this.formData.cityIndex = e.detail.value;
    },

    onDateChange(e) {
      this.formData.birthday = e.detail.value;
    },

    onTimeChange(e) {
      this.formData.time = e.detail.value;
    },

    onPickerViewChange(e) {
      this.pickerValue = e.detail.value;
    },
  },
};
</script>

<style>
.form-container {
  padding: 20rpx;
}

.form-item {
  margin-bottom: 30rpx;
  display: flex;
  align-items: center;
}

.form-item text {
  width: 150rpx;
}

.picker {
  padding: 20rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}

.picker-view {
  height: 300rpx;
}

.picker-item {
  line-height: 100rpx;
  text-align: center;
}
</style>
```

**导航组件**

```vue
<template>
  <view class="nav-container">
    <!-- navigator - 导航链接 -->
    <navigator url="/pages/user/user" hover-class="navigator-hover">
      <button type="primary">跳转到用户页</button>
    </navigator>

    <navigator url="/pages/detail/detail" open-type="redirect">
      <button type="default">重定向到详情页</button>
    </navigator>

    <navigator url="/pages/index/index" open-type="switchTab">
      <button type="default">切换到首页 Tab</button>
    </navigator>

    <navigator url="/pages/index/index" open-type="reLaunch">
      <button type="warn">重启动到首页</button>
    </navigator>

    <navigator url="/pages/detail/detail" open-type="navigateBack" delta="1">
      <button type="default">返回上一页</button>
    </navigator>
  </view>
</template>

<style>
.nav-container {
  padding: 20rpx;
}

.navigator-hover {
  opacity: 0.7;
}
</style>
```

**媒体组件**

```vue
<template>
  <view class="media-container">
    <!-- image - 图片 -->
    <image
      src="/static/logo.png"
      mode="aspectFit"
      lazy-load
      @load="onImageLoad"
      @error="onImageError"
    ></image>

    <!-- mode 模式说明 -->
    <!-- scaleToFill: 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素 -->
    <!-- aspectFit: 保持纵横比缩放图片，使图片的长边能完全显示出来 -->
    <!-- aspectFill: 保持纵横比缩放图片，只保证图片的短边能完全显示出来 -->
    <!-- widthFix: 宽度不变，高度自动变化，保持原图宽高比不变 -->
    <!-- heightFix: 高度不变，宽度自动变化，保持原图宽高比不变 -->
    <!-- top: 不缩放图片，只显示图片的顶部区域 -->
    <!-- bottom: 不缩放图片，只显示图片的底部区域 -->
    <!-- center: 不缩放图片，只显示图片的中间区域 -->
    <!-- left: 不缩放图片，只显示图片的左边区域 -->
    <!-- right: 不缩放图片，只显示图片的右边区域 -->
    <!-- top left: 不缩放图片，只显示图片的左上区域 -->
    <!-- top right: 不缩放图片，只显示图片的右上区域 -->
    <!-- bottom left: 不缩放图片，只显示图片的左下区域 -->
    <!-- bottom right: 不缩放图片，只显示图片的右下区域 -->

    <!-- video - 视频 -->
    <video
      id="myVideo"
      src="/static/video.mp4"
      controls
      autoplay
      loop
      muted
      object-fit="contain"
      poster="/static/poster.jpg"
      @play="onVideoPlay"
      @pause="onVideoPause"
      @ended="onVideoEnded"
      @error="onVideoError"
    ></video>

    <!-- audio - 音频 -->
    <audio
      :src="audioSrc"
      :name="audioName"
      :author="audioAuthor"
      :poster="audioPoster"
      controls
      @play="onAudioPlay"
      @pause="onAudioPause"
      @error="onAudioError"
    ></audio>

    <!-- camera - 相机 -->
    <camera device-position="back" flash="auto" @error="onCameraError"></camera>

    <!-- live-player - 直播播放 -->
    <live-player
      src="rtmp://live.example.com/live/stream"
      autoplay
      @statechange="onLiveStateChange"
    ></live-player>

    <!-- live-pusher - 直播推流 -->
    <live-pusher
      url="rtmp://live.example.com/live/stream"
      mode="SD"
      autopush
      @statechange="onPushStateChange"
    ></live-pusher>
  </view>
</template>

<script>
export default {
  data() {
    return {
      audioSrc: "/static/audio.mp3",
      audioName: "音频名称",
      audioAuthor: "作者",
      audioPoster: "/static/poster.jpg",
    };
  },
  methods: {
    onImageLoad(e) {
      console.log("图片加载完成", e);
    },

    onImageError(e) {
      console.log("图片加载失败", e);
    },

    onVideoPlay(e) {
      console.log("视频播放", e);
    },

    onVideoPause(e) {
      console.log("视频暂停", e);
    },

    onVideoEnded(e) {
      console.log("视频播放结束", e);
    },

    onVideoError(e) {
      console.log("视频播放错误", e);
    },

    onAudioPlay(e) {
      console.log("音频播放", e);
    },

    onAudioPause(e) {
      console.log("音频暂停", e);
    },

    onAudioError(e) {
      console.log("音频播放错误", e);
    },

    onCameraError(e) {
      console.log("相机错误", e);
    },

    onLiveStateChange(e) {
      console.log("直播状态变化", e);
    },

    onPushStateChange(e) {
      console.log("推流状态变化", e);
    },
  },
};
</script>
```

**地图组件**

```vue
<template>
  <view class="map-container">
    <!-- map - 地图 -->
    <map
      id="myMap"
      :longitude="longitude"
      :latitude="latitude"
      :scale="scale"
      :markers="markers"
      :polyline="polyline"
      :circles="circles"
      :controls="controls"
      show-location
      @markertap="onMarkerTap"
      @callouttap="onCalloutTap"
      @controltap="onControlTap"
      @regionchange="onRegionChange"
      @tap="onMapTap"
    ></map>
  </view>
</template>

<script>
export default {
  data() {
    return {
      longitude: 116.397428,
      latitude: 39.90923,
      scale: 14,
      markers: [
        {
          id: 1,
          longitude: 116.397428,
          latitude: 39.90923,
          title: "天安门",
          iconPath: "/static/marker.png",
          width: 30,
          height: 30,
          callout: {
            content: "天安门广场",
            color: "#333",
            fontSize: 14,
            borderRadius: 5,
            bgColor: "#fff",
            padding: 10,
            display: "ALWAYS",
          },
        },
      ],
      polyline: [
        {
          points: [
            { longitude: 116.397428, latitude: 39.90923 },
            { longitude: 116.407428, latitude: 39.91923 },
          ],
          color: "#FF0000",
          width: 5,
          dottedLine: false,
        },
      ],
      circles: [
        {
          longitude: 116.397428,
          latitude: 39.90923,
          radius: 500,
          color: "#FF0000",
          fillColor: "#FF000033",
          strokeWidth: 2,
        },
      ],
      controls: [
        {
          id: 1,
          position: { left: 15, top: 15, width: 40, height: 40 },
          iconPath: "/static/location.png",
          clickable: true,
        },
      ],
    };
  },
  methods: {
    onMarkerTap(e) {
      console.log("标记点点击", e);
    },

    onCalloutTap(e) {
      console.log("气泡点击", e);
    },

    onControlTap(e) {
      console.log("控件点击", e);
    },

    onRegionChange(e) {
      console.log("视野变化", e);
    },

    onMapTap(e) {
      console.log("地图点击", e);
    },
  },
};
</script>

<style>
.map-container {
  width: 100%;
  height: 100vh;
}

map {
  width: 100%;
  height: 100%;
}
</style>
```

**画布组件**

```vue
<template>
  <view class="canvas-container">
    <!-- canvas - 画布 -->
    <canvas
      canvas-id="myCanvas"
      id="myCanvas"
      class="canvas"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    ></canvas>

    <button type="primary" @click="drawRect">绘制矩形</button>
    <button type="primary" @click="drawCircle">绘制圆形</button>
    <button type="primary" @click="drawText">绘制文字</button>
    <button type="primary" @click="drawImage">绘制图片</button>
    <button type="warn" @click="clearCanvas">清空画布</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      ctx: null,
    };
  },
  onReady() {
    this.ctx = uni.createCanvasContext("myCanvas", this);
  },
  methods: {
    drawRect() {
      this.ctx.setFillStyle("#007AFF");
      this.ctx.fillRect(50, 50, 100, 100);
      this.ctx.draw();
    },

    drawCircle() {
      this.ctx.beginPath();
      this.ctx.arc(150, 150, 50, 0, 2 * Math.PI);
      this.ctx.setFillStyle("#FF0000");
      this.ctx.fill();
      this.ctx.draw();
    },

    drawText() {
      this.ctx.setFontSize(20);
      this.ctx.setFillStyle("#000000");
      this.ctx.fillText("Hello uni-app", 50, 250);
      this.ctx.draw();
    },

    drawImage() {
      this.ctx.drawImage("/static/logo.png", 50, 300, 100, 100);
      this.ctx.draw();
    },

    clearCanvas() {
      this.ctx.clearRect(0, 0, 300, 500);
      this.ctx.draw();
    },

    onTouchStart(e) {
      console.log("触摸开始", e);
    },

    onTouchMove(e) {
      console.log("触摸移动", e);
    },

    onTouchEnd(e) {
      console.log("触摸结束", e);
    },
  },
};
</script>

<style>
.canvas-container {
  padding: 20rpx;
}

.canvas {
  width: 300px;
  height: 500px;
  border: 1rpx solid #eee;
  margin-bottom: 20rpx;
}
</style>
```

#### 自定义组件

**组件定义**

```vue
<template>
  <view class="custom-card">
    <view class="card-header">
      <text class="title">{{ title }}</text>
      <text class="subtitle" v-if="subtitle">{{ subtitle }}</text>
    </view>
    <view class="card-body">
      <slot></slot>
    </view>
    <view class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: "CustomCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.custom-card {
  background-color: #fff;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
  margin: 20rpx;
  overflow: hidden;
}

.card-header {
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.subtitle {
  font-size: 24rpx;
  color: #999;
  margin-left: 20rpx;
}

.card-body {
  padding: 30rpx;
}

.card-footer {
  padding: 30rpx;
  border-top: 1rpx solid #eee;
}
</style>
```

**组件使用**

```vue
<template>
  <view class="page">
    <custom-card title="卡片标题" subtitle="副标题">
      <view class="content">
        <text>卡片内容</text>
      </view>

      <template #footer>
        <button type="primary" size="mini">确定</button>
        <button type="default" size="mini">取消</button>
      </template>
    </custom-card>
  </view>
</template>

<script>
import CustomCard from "@/components/custom-card/custom-card.vue";

export default {
  components: {
    CustomCard,
  },
};
</script>
```

**组件通信**

```vue
<template>
  <view class="parent">
    <child-component
      :message="parentMessage"
      @child-event="onChildEvent"
      @update:message="onMessageUpdate"
    ></child-component>
  </view>
</template>

<script>
import ChildComponent from "@/components/child-component.vue";

export default {
  components: {
    ChildComponent,
  },
  data() {
    return {
      parentMessage: "来自父组件的消息",
    };
  },
  methods: {
    onChildEvent(data) {
      console.log("接收到子组件事件", data);
    },

    onMessageUpdate(newValue) {
      this.parentMessage = newValue;
    },
  },
};
</script>
```

```vue
<template>
  <view class="child">
    <text>{{ message }}</text>
    <button @click="sendEvent">发送事件</button>
    <button @click="updateMessage">更新消息</button>
  </view>
</template>

<script>
export default {
  props: {
    message: String,
  },
  methods: {
    sendEvent() {
      this.$emit("child-event", {
        data: "来自子组件的数据",
      });
    },

    updateMessage() {
      this.$emit("update:message", "更新后的消息");
    },
  },
};
</script>
```

### 2.3 API 接口

uni-app 提供了丰富的 API 接口，以下是常用 API 分类：

#### 网络请求

```javascript
// uni.request - 网络请求
export default {
  methods: {
    async fetchData() {
      try {
        const res = await uni.request({
          url: "https://api.example.com/data",
          method: "GET",
          data: {
            page: 1,
            size: 10,
          },
          header: {
            Authorization: "Bearer token",
            "Content-Type": "application/json",
          },
          timeout: 60000,
          dataType: "json",
          responseType: "text",
        });

        console.log("请求成功", res.data);
      } catch (error) {
        console.error("请求失败", error);
      }
    },

    async postData() {
      try {
        const res = await uni.request({
          url: "https://api.example.com/data",
          method: "POST",
          data: {
            name: "张三",
            age: 25,
          },
        });

        console.log("提交成功", res.data);
      } catch (error) {
        console.error("提交失败", error);
      }
    },

    uploadFile() {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;

          uni.uploadFile({
            url: "https://api.example.com/upload",
            filePath: tempFilePaths[0],
            name: "file",
            formData: {
              user: "test",
            },
            success: (uploadRes) => {
              console.log("上传成功", uploadRes.data);
            },
            fail: (error) => {
              console.error("上传失败", error);
            },
          });
        },
      });
    },

    downloadFile() {
      uni.downloadFile({
        url: "https://example.com/file.pdf",
        success: (res) => {
          if (res.statusCode === 200) {
            console.log("下载成功", res.tempFilePath);

            uni.saveFile({
              tempFilePath: res.tempFilePath,
              success: (saveRes) => {
                console.log("保存成功", saveRes.savedFilePath);
              },
            });
          }
        },
        fail: (error) => {
          console.error("下载失败", error);
        },
      });
    },
  },
};
```

#### 数据缓存

```javascript
export default {
  methods: {
    setStorage() {
      uni.setStorage({
        key: "userInfo",
        data: {
          name: "张三",
          age: 25,
          token: "xxxxx",
        },
        success: () => {
          console.log("存储成功");
        },
      });
    },

    async setStorageSync() {
      try {
        uni.setStorageSync("userInfo", {
          name: "张三",
          age: 25,
        });
        console.log("同步存储成功");
      } catch (error) {
        console.error("同步存储失败", error);
      }
    },

    getStorage() {
      uni.getStorage({
        key: "userInfo",
        success: (res) => {
          console.log("获取成功", res.data);
        },
        fail: (error) => {
          console.error("获取失败", error);
        },
      });
    },

    getStorageSync() {
      try {
        const data = uni.getStorageSync("userInfo");
        console.log("同步获取成功", data);
        return data;
      } catch (error) {
        console.error("同步获取失败", error);
        return null;
      }
    },

    removeStorage() {
      uni.removeStorage({
        key: "userInfo",
        success: () => {
          console.log("删除成功");
        },
      });
    },

    clearStorage() {
      uni.clearStorage({
        success: () => {
          console.log("清空成功");
        },
      });
    },

    getStorageInfo() {
      uni.getStorageInfo({
        success: (res) => {
          console.log("存储信息", res);
          console.log("当前占用空间", res.currentSize);
          console.log("限制空间", res.limitSize);
          console.log("所有 key", res.keys);
        },
      });
    },
  },
};
```

#### 界面交互

```javascript
export default {
  methods: {
    showToast() {
      uni.showToast({
        title: "操作成功",
        icon: "success",
        duration: 2000,
        mask: true,
        position: "center",
      });
    },

    showLoading() {
      uni.showLoading({
        title: "加载中...",
        mask: true,
      });

      setTimeout(() => {
        uni.hideLoading();
      }, 2000);
    },

    showModal() {
      uni.showModal({
        title: "提示",
        content: "确定要删除吗？",
        showCancel: true,
        cancelText: "取消",
        confirmText: "确定",
        cancelColor: "#999",
        confirmColor: "#007AFF",
        success: (res) => {
          if (res.confirm) {
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },

    showActionSheet() {
      uni.showActionSheet({
        itemList: ["选项一", "选项二", "选项三"],
        itemColor: "#333",
        cancelText: "取消",
        cancelColor: "#999",
        success: (res) => {
          console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
        },
        fail: (error) => {
          console.log("取消选择", error);
        },
      });
    },

    setNavigationBarTitle() {
      uni.setNavigationBarTitle({
        title: "新标题",
      });
    },

    setNavigationBarColor() {
      uni.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#007AFF",
        animation: {
          duration: 400,
          timingFunc: "easeIn",
        },
      });
    },

    showNavigationBarLoading() {
      uni.showNavigationBarLoading();

      setTimeout(() => {
        uni.hideNavigationBarLoading();
      }, 2000);
    },

    setTabBarBadge() {
      uni.setTabBarBadge({
        index: 0,
        text: "5",
      });
    },

    removeTabBarBadge() {
      uni.removeTabBarBadge({
        index: 0,
      });
    },

    showTabBarRedDot() {
      uni.showTabBarRedDot({
        index: 1,
      });
    },

    hideTabBarRedDot() {
      uni.hideTabBarRedDot({
        index: 1,
      });
    },

    setTabBarStyle() {
      uni.setTabBarStyle({
        color: "#7A7E83",
        selectedColor: "#007AFF",
        backgroundColor: "#F8F8F8",
        borderStyle: "black",
      });
    },

    setTabBarItem() {
      uni.setTabBarItem({
        index: 0,
        text: "首页",
        iconPath: "/static/home.png",
        selectedIconPath: "/static/home-active.png",
      });
    },
  },
};
```

#### 导航跳转

```javascript
export default {
  methods: {
    navigateTo() {
      uni.navigateTo({
        url: "/pages/detail/detail?id=123&name=test",
        success: () => {
          console.log("跳转成功");
        },
        fail: (error) => {
          console.log("跳转失败", error);
        },
      });
    },

    redirectTo() {
      uni.redirectTo({
        url: "/pages/login/login",
      });
    },

    reLaunch() {
      uni.reLaunch({
        url: "/pages/index/index",
      });
    },

    switchTab() {
      uni.switchTab({
        url: "/pages/index/index",
      });
    },

    navigateBack() {
      uni.navigateBack({
        delta: 1,
      });
    },

    getCurrentPages() {
      const pages = getCurrentPages();
      console.log("当前页面栈", pages);
      console.log("当前页面", pages[pages.length - 1]);
    },
  },
};
```

#### 设备相关

```javascript
export default {
  methods: {
    getSystemInfo() {
      uni.getSystemInfo({
        success: (res) => {
          console.log("系统信息", res);
          console.log("品牌", res.brand);
          console.log("型号", res.model);
          console.log("系统", res.system);
          console.log("屏幕宽度", res.screenWidth);
          console.log("屏幕高度", res.screenHeight);
          console.log("状态栏高度", res.statusBarHeight);
          console.log("窗口宽度", res.windowWidth);
          console.log("窗口高度", res.windowHeight);
          console.log("像素比", res.pixelRatio);
        },
      });
    },

    getNetworkType() {
      uni.getNetworkType({
        success: (res) => {
          console.log("网络类型", res.networkType);
        },
      });
    },

    onNetworkStatusChange() {
      uni.onNetworkStatusChange((res) => {
        console.log("网络状态变化", res);
        console.log("是否连接", res.isConnected);
        console.log("网络类型", res.networkType);
      });
    },

    onAccelerometerChange() {
      uni.onAccelerometerChange((res) => {
        console.log("加速度", res);
        console.log("X轴", res.x);
        console.log("Y轴", res.y);
        console.log("Z轴", res.z);
      });
    },

    onCompassChange() {
      uni.onCompassChange((res) => {
        console.log("罗盘方向", res.direction);
      });
    },

    makePhoneCall() {
      uni.makePhoneCall({
        phoneNumber: "10086",
      });
    },

    scanCode() {
      uni.scanCode({
        success: (res) => {
          console.log("扫码结果", res);
          console.log("内容", res.result);
          console.log("类型", res.scanType);
        },
      });
    },

    setClipboardData() {
      uni.setClipboardData({
        data: "复制的内容",
        success: () => {
          uni.showToast({
            title: "复制成功",
            icon: "success",
          });
        },
      });
    },

    getClipboardData() {
      uni.getClipboardData({
        success: (res) => {
          console.log("剪贴板内容", res.data);
        },
      });
    },

    vibrateShort() {
      uni.vibrateShort({
        success: () => {
          console.log("短震动");
        },
      });
    },

    vibrateLong() {
      uni.vibrateLong({
        success: () => {
          console.log("长震动");
        },
      });
    },
  },
};
```

#### 媒体相关

```javascript
export default {
  methods: {
    chooseImage() {
      uni.chooseImage({
        count: 9,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          console.log("选择的图片", res.tempFilePaths);
          console.log("图片信息", res.tempFiles);
        },
      });
    },

    previewImage() {
      uni.previewImage({
        urls: [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg",
        ],
        current: "https://example.com/image1.jpg",
        success: () => {
          console.log("预览成功");
        },
      });
    },

    getImageInfo() {
      uni.getImageInfo({
        src: "/static/logo.png",
        success: (res) => {
          console.log("图片信息", res);
          console.log("宽度", res.width);
          console.log("高度", res.height);
          console.log("类型", res.type);
          console.log("路径", res.path);
        },
      });
    },

    saveImageToPhotosAlbum() {
      uni.saveImageToPhotosAlbum({
        filePath: "/static/logo.png",
        success: () => {
          uni.showToast({
            title: "保存成功",
            icon: "success",
          });
        },
        fail: (error) => {
          console.error("保存失败", error);
        },
      });
    },

    chooseVideo() {
      uni.chooseVideo({
        sourceType: ["album", "camera"],
        maxDuration: 60,
        camera: "back",
        success: (res) => {
          console.log("视频路径", res.tempFilePath);
          console.log("视频时长", res.duration);
          console.log("视频大小", res.size);
          console.log("视频宽度", res.width);
          console.log("视频高度", res.height);
        },
      });
    },

    saveVideoToPhotosAlbum() {
      uni.saveVideoToPhotosAlbum({
        filePath: "/static/video.mp4",
        success: () => {
          uni.showToast({
            title: "保存成功",
            icon: "success",
          });
        },
      });
    },

    getRecorderManager() {
      const recorderManager = uni.getRecorderManager();

      recorderManager.onStart(() => {
        console.log("录音开始");
      });

      recorderManager.onStop((res) => {
        console.log("录音停止", res);
        console.log("文件路径", res.tempFilePath);
        console.log("时长", res.duration);
        console.log("大小", res.fileSize);
      });

      recorderManager.onError((error) => {
        console.error("录音错误", error);
      });

      recorderManager.start({
        duration: 60000,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        format: "mp3",
      });

      setTimeout(() => {
        recorderManager.stop();
      }, 5000);
    },

    getBackgroundAudioManager() {
      const backgroundAudioManager = uni.getBackgroundAudioManager();

      backgroundAudioManager.title = "音频标题";
      backgroundAudioManager.singer = "歌手";
      backgroundAudioManager.coverImgUrl = "/static/cover.jpg";
      backgroundAudioManager.src = "/static/audio.mp3";

      backgroundAudioManager.onPlay(() => {
        console.log("背景音频播放");
      });

      backgroundAudioManager.onPause(() => {
        console.log("背景音频暂停");
      });

      backgroundAudioManager.onStop(() => {
        console.log("背景音频停止");
      });

      backgroundAudioManager.onEnded(() => {
        console.log("背景音频播放结束");
      });

      backgroundAudioManager.onError((error) => {
        console.error("背景音频错误", error);
      });
    },
  },
};
```

#### 位置相关

```javascript
export default {
  methods: {
    getLocation() {
      uni.getLocation({
        type: "gcj02",
        altitude: true,
        geocode: true,
        success: (res) => {
          console.log("位置信息", res);
          console.log("经度", res.longitude);
          console.log("纬度", res.latitude);
          console.log("速度", res.speed);
          console.log("精度", res.accuracy);
          console.log("高度", res.altitude);
          console.log("地址信息", res.address);
        },
        fail: (error) => {
          console.error("获取位置失败", error);
        },
      });
    },

    chooseLocation() {
      uni.chooseLocation({
        success: (res) => {
          console.log("选择的位置", res);
          console.log("名称", res.name);
          console.log("地址", res.address);
          console.log("经度", res.longitude);
          console.log("纬度", res.latitude);
        },
      });
    },

    openLocation() {
      uni.openLocation({
        latitude: 39.90923,
        longitude: 116.397428,
        name: "天安门",
        address: "北京市东城区东长安街",
        scale: 18,
      });
    },

    startLocationUpdate() {
      uni.startLocationUpdate({
        success: () => {
          console.log("开启位置更新");
        },
      });

      uni.onLocationChange((res) => {
        console.log("位置变化", res);
        console.log("经度", res.longitude);
        console.log("纬度", res.latitude);
      });
    },

    stopLocationUpdate() {
      uni.stopLocationUpdate({
        success: () => {
          console.log("停止位置更新");
        },
      });
    },
  },
};
```

#### 文件相关

```javascript
export default {
  methods: {
    saveFile() {
      uni.saveFile({
        tempFilePath: "/temp/file.pdf",
        success: (res) => {
          console.log("保存成功", res.savedFilePath);
        },
      });
    },

    getSavedFileList() {
      uni.getSavedFileList({
        success: (res) => {
          console.log("文件列表", res.fileList);
        },
      });
    },

    getSavedFileInfo() {
      uni.getSavedFileInfo({
        filePath: "savedFilePath",
        success: (res) => {
          console.log("文件信息", res);
          console.log("大小", res.size);
          console.log("创建时间", res.createTime);
        },
      });
    },

    removeSavedFile() {
      uni.removeSavedFile({
        filePath: "savedFilePath",
        success: () => {
          console.log("删除成功");
        },
      });
    },

    getFileInfo() {
      uni.getFileInfo({
        filePath: "/static/file.pdf",
        success: (res) => {
          console.log("文件信息", res);
          console.log("大小", res.size);
          console.log("摘要", res.digest);
        },
      });
    },

    openDocument() {
      uni.openDocument({
        filePath: "/static/file.pdf",
        fileType: "pdf",
        showMenu: true,
        success: () => {
          console.log("打开文档成功");
        },
      });
    },
  },
};
```

### 2.4 路由管理

#### 路由配置

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页",
        "navigationBarBackgroundColor": "#007AFF",
        "navigationBarTextStyle": "white",
        "backgroundColor": "#F8F8F8",
        "enablePullDownRefresh": true,
        "backgroundTextStyle": "dark",
        "navigationBarShadow": {
          "colorType": "grey",
          "offset": {
            "x": 0,
            "y": 1
          }
        }
      }
    },
    {
      "path": "pages/detail/detail",
      "style": {
        "navigationBarTitleText": "详情页",
        "navigationBarBackgroundColor": "#007AFF",
        "navigationBarTextStyle": "white",
        "app-plus": {
          "bounce": "none",
          "titleNView": {
            "buttons": [
              {
                "text": "\ue534",
                "fontSize": "16",
                "onclick": "javascript:console.log('点击按钮')"
              }
            ]
          }
        }
      }
    }
  ],
  "subPackages": [
    {
      "root": "pages/user",
      "pages": [
        {
          "path": "profile/profile",
          "style": {
            "navigationBarTitleText": "个人资料"
          }
        },
        {
          "path": "setting/setting",
          "style": {
            "navigationBarTitleText": "设置"
          }
        }
      ]
    }
  ],
  "preloadRule": {
    "pages/index/index": {
      "network": "all",
      "packages": ["pages/user"]
    }
  },
  "condition": {
    "current": 0,
    "list": [
      {
        "name": "详情页",
        "path": "pages/detail/detail",
        "query": "id=123&name=test"
      }
    ]
  }
}
```

#### 路由跳转方式

```javascript
export default {
  methods: {
    navigateTo() {
      uni.navigateTo({
        url: "/pages/detail/detail?id=123&name=test",
        success: (res) => {
          console.log("跳转成功");
          res.eventChannel.emit("acceptDataFromOpenerPage", {
            data: "来自上个页面的数据",
          });
        },
        fail: (error) => {
          console.log("跳转失败", error);
        },
        complete: () => {
          console.log("跳转完成");
        },
      });
    },

    navigateToWithEvents() {
      uni.navigateTo({
        url: "/pages/detail/detail",
        events: {
          acceptDataFromOpenedPage: (data) => {
            console.log("接收打开页面发送的数据", data);
          },
          someEvent: (data) => {
            console.log("自定义事件", data);
          },
        },
        success: (res) => {
          res.eventChannel.emit("acceptDataFromOpenerPage", {
            data: "发送给打开页面的数据",
          });
        },
      });
    },

    redirectTo() {
      uni.redirectTo({
        url: "/pages/login/login",
        success: () => {
          console.log("重定向成功");
        },
      });
    },

    reLaunch() {
      uni.reLaunch({
        url: "/pages/index/index",
        success: () => {
          console.log("重启成功");
        },
      });
    },

    switchTab() {
      uni.switchTab({
        url: "/pages/index/index",
        success: () => {
          console.log("切换 Tab 成功");
        },
      });
    },

    navigateBack() {
      uni.navigateBack({
        delta: 1,
        success: () => {
          console.log("返回成功");
        },
      });
    },

    navigateBackWithData() {
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2];

      prevPage.$vm.otherFun({ data: "返回携带的数据" });

      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
```

#### 页面参数传递

**URL 参数传递**

```javascript
export default {
  onLoad(options) {
    console.log("页面参数", options);
    console.log("ID", options.id);
    console.log("名称", options.name);
  },
};
```

**EventChannel 通信**

```javascript
export default {
  methods: {
    navigateToPage() {
      uni.navigateTo({
        url: "/pages/detail/detail",
        events: {
          acceptDataFromOpenedPage: (data) => {
            console.log("接收数据", data);
          },
        },
        success: (res) => {
          res.eventChannel.emit("acceptDataFromOpenerPage", {
            data: "发送数据",
          });
        },
      });
    },
  },
};
```

```javascript
export default {
  onLoad() {
    const eventChannel = this.getOpenerEventChannel();

    eventChannel.on("acceptDataFromOpenerPage", (data) => {
      console.log("接收数据", data);
    });

    eventChannel.emit("acceptDataFromOpenedPage", { data: "返回数据" });
  },
};
```

**全局变量传递**

```javascript
export default {
  methods: {
    setGlobalData() {
      getApp().globalData.userInfo = {
        name: "张三",
        age: 25,
      };
    },

    getGlobalData() {
      const userInfo = getApp().globalData.userInfo;
      console.log("全局数据", userInfo);
    },
  },
};
```

### 2.5 状态管理

#### Vuex 状态管理（Vue 2）

**store/index.js**

```javascript
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: null,
    token: "",
    cartList: [],
    count: 0,
  },

  getters: {
    getUserInfo: (state) => state.userInfo,
    getToken: (state) => state.token,
    getCartList: (state) => state.cartList,
    getCartCount: (state) => state.cartList.length,
    getCount: (state) => state.count,
  },

  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    },

    SET_TOKEN(state, token) {
      state.token = token;
    },

    ADD_CART(state, item) {
      state.cartList.push(item);
    },

    REMOVE_CART(state, index) {
      state.cartList.splice(index, 1);
    },

    CLEAR_CART(state) {
      state.cartList = [];
    },

    INCREMENT(state) {
      state.count++;
    },

    DECREMENT(state) {
      state.count--;
    },
  },

  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        uni.request({
          url: "https://api.example.com/login",
          method: "POST",
          data: userInfo,
          success: (res) => {
            commit("SET_USER_INFO", res.data.userInfo);
            commit("SET_TOKEN", res.data.token);
            uni.setStorageSync("token", res.data.token);
            resolve(res.data);
          },
          fail: (error) => {
            reject(error);
          },
        });
      });
    },

    logout({ commit }) {
      commit("SET_USER_INFO", null);
      commit("SET_TOKEN", "");
      uni.removeStorageSync("token");
    },

    addCart({ commit, state }, item) {
      const existItem = state.cartList.find((cart) => cart.id === item.id);

      if (existItem) {
        existItem.count += item.count;
      } else {
        commit("ADD_CART", item);
      }
    },
  },
});

export default store;
```

**main.js**

```javascript
import Vue from "vue";
import App from "./App";
import store from "./store";

const app = new Vue({
  store,
  ...App,
});

app.$mount();
```

**组件中使用**

```vue
<template>
  <view class="container">
    <text>用户名：{{ userInfo.name }}</text>
    <text>购物车数量：{{ cartCount }}</text>
    <text>计数器：{{ count }}</text>

    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
    <button @click="addToCart">添加到购物车</button>
    <button @click="handleLogin">登录</button>
  </view>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["userInfo", "count"]),
    ...mapGetters(["getCartCount", "getCount"]),

    cartCount() {
      return this.getCartCount;
    },
  },

  methods: {
    ...mapMutations(["INCREMENT", "DECREMENT", "ADD_CART"]),
    ...mapActions(["login", "addCart"]),

    increment() {
      this.INCREMENT();
    },

    decrement() {
      this.DECREMENT();
    },

    addToCart() {
      this.addCart({
        id: 1,
        name: "商品名称",
        price: 99.99,
        count: 1,
      });
    },

    async handleLogin() {
      try {
        await this.login({
          username: "admin",
          password: "123456",
        });

        uni.showToast({
          title: "登录成功",
          icon: "success",
        });
      } catch (error) {
        uni.showToast({
          title: "登录失败",
          icon: "none",
        });
      }
    },
  },
};
</script>
```

#### Pinia 状态管理（Vue 3）

**stores/user.js**

```javascript
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref(null);
  const token = ref("");

  const isLoggedIn = computed(() => !!token.value);
  const userName = computed(() => userInfo.value?.name || "");

  function setUserInfo(info) {
    userInfo.value = info;
  }

  function setToken(newToken) {
    token.value = newToken;
    uni.setStorageSync("token", newToken);
  }

  async function login(credentials) {
    try {
      const res = await uni.request({
        url: "https://api.example.com/login",
        method: "POST",
        data: credentials,
      });

      setUserInfo(res.data.userInfo);
      setToken(res.data.token);

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    userInfo.value = null;
    token.value = "";
    uni.removeStorageSync("token");
  }

  return {
    userInfo,
    token,
    isLoggedIn,
    userName,
    setUserInfo,
    setToken,
    login,
    logout,
  };
});
```

**stores/cart.js**

```javascript
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const cartList = ref([]);

  const cartCount = computed(() => cartList.value.length);
  const totalPrice = computed(() => {
    return cartList.value.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  });

  function addToCart(item) {
    const existItem = cartList.value.find((cart) => cart.id === item.id);

    if (existItem) {
      existItem.count += item.count;
    } else {
      cartList.value.push(item);
    }
  }

  function removeFromCart(index) {
    cartList.value.splice(index, 1);
  }

  function clearCart() {
    cartList.value = [];
  }

  return {
    cartList,
    cartCount,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
  };
});
```

**main.js**

```javascript
import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();

  app.use(pinia);

  return {
    app,
    pinia,
  };
}
```

**组件中使用**

```vue
<template>
  <view class="container">
    <text>用户名：{{ userStore.userName }}</text>
    <text>购物车数量：{{ cartStore.cartCount }}</text>
    <text>总价：{{ cartStore.totalPrice }}</text>

    <button @click="addToCart">添加到购物车</button>
    <button @click="handleLogin">登录</button>
  </view>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { useCartStore } from "@/stores/cart";

const userStore = useUserStore();
const cartStore = useCartStore();

const addToCart = () => {
  cartStore.addToCart({
    id: 1,
    name: "商品名称",
    price: 99.99,
    count: 1,
  });
};

const handleLogin = async () => {
  try {
    await userStore.login({
      username: "admin",
      password: "123456",
    });

    uni.showToast({
      title: "登录成功",
      icon: "success",
    });
  } catch (error) {
    uni.showToast({
      title: "登录失败",
      icon: "none",
    });
  }
};
</script>
```

---

## 三、开发技巧与最佳实践

### 3.1 条件编译

条件编译是 uni-app 最重要的特性之一，可以根据不同平台编译不同的代码。

#### 基础语法

```vue
<template>
  <view class="container">
    <!-- #ifdef H5 -->
    <view>这段代码只在 H5 平台显示</view>
    <!-- #endif -->

    <!-- #ifdef MP-WEIXIN -->
    <view>这段代码只在微信小程序平台显示</view>
    <!-- #endif -->

    <!-- #ifdef APP-PLUS -->
    <view>这段代码只在 App 平台显示</view>
    <!-- #endif -->

    <!-- #ifndef H5 -->
    <view>这段代码不在 H5 平台显示</view>
    <!-- #endif -->

    <!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
    <view>这段代码在微信小程序或支付宝小程序平台显示</view>
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello uni-app",
    };
  },

  onLoad() {
    // #ifdef H5
    console.log("H5 平台特有代码");
    // #endif

    // #ifdef MP-WEIXIN
    console.log("微信小程序平台特有代码");
    // #endif

    // #ifdef APP-PLUS
    console.log("App 平台特有代码");
    // #endif

    // #ifndef H5
    console.log("非 H5 平台代码");
    // #endif
  },

  methods: {
    handleClick() {
      // #ifdef H5
      alert("H5 平台弹窗");
      // #endif

      // #ifdef MP-WEIXIN
      wx.showToast({
        title: "微信小程序提示",
        icon: "success",
      });
      // #endif

      // #ifdef APP-PLUS
      plus.nativeUI.alert("App 平台弹窗");
      // #endif
    },
  },
};
</script>

<style>
.container {
  padding: 20rpx;
}

/* #ifdef H5 */
.h5-only {
  color: red;
}
/* #endif */

/* #ifdef MP-WEIXIN */
.mp-weixin-only {
  color: blue;
}
/* #endif */

/* #ifdef APP-PLUS */
.app-only {
  color: green;
}
/* #endif */
</style>
```

#### 条件编译平台标识

| 平台标识                | 说明                                                       |
| ----------------------- | ---------------------------------------------------------- |
| APP-PLUS                | App                                                        |
| APP-PLUS-NVUE           | App nvue                                                   |
| H5                      | H5                                                         |
| MP-WEIXIN               | 微信小程序                                                 |
| MP-ALIPAY               | 支付宝小程序                                               |
| MP-BAIDU                | 百度小程序                                                 |
| MP-TOUTIAO              | 字节跳动小程序                                             |
| MP-QQ                   | QQ小程序                                                   |
| MP                      | 微信小程序/支付宝小程序/百度小程序/字节跳动小程序/QQ小程序 |
| MP-360                  | 360小程序                                                  |
| QUICKAPP-WEBVIEW        | 快应用通用                                                 |
| QUICKAPP-WEBVIEW-HUAWEI | 快应用华为                                                 |
| QUICKAPP-WEBVIEW-UNION  | 快应用联盟                                                 |

#### 条件编译应用场景

**1. 平台特有 API 调用**

```javascript
export default {
  methods: {
    share() {
      // #ifdef MP-WEIXIN
      wx.shareAppMessage({
        title: "分享标题",
        path: "/pages/index/index",
      });
      // #endif

      // #ifdef APP-PLUS
      plus.share.sendWithSystem({
        type: "text",
        content: "分享内容",
      });
      // #endif

      // #ifdef H5
      if (navigator.share) {
        navigator.share({
          title: "分享标题",
          url: window.location.href,
        });
      }
      // #endif
    },
  },
};
```

**2. 平台特有组件**

```vue
<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <official-account></official-account>
    <!-- #endif -->

    <!-- #ifdef APP-PLUS -->
    <live-pusher url="rtmp://example.com/live"></live-pusher>
    <!-- #endif -->
  </view>
</template>
```

**3. 平台特有样式**

```css
/* #ifdef H5 */
.container {
  max-width: 750px;
  margin: 0 auto;
}
/* #endif */

/* #ifdef APP-PLUS */
.container {
  padding-top: var(--status-bar-height);
}
/* #endif */
```

### 3.2 封装网络请求

**request.js**

```javascript
const BASE_URL = "https://api.example.com";

const request = (options) => {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync("token");

    uni.request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...options.header,
      },
      timeout: options.timeout || 60000,
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.code === 0) {
            resolve(res.data);
          } else if (res.data.code === 401) {
            uni.removeStorageSync("token");
            uni.reLaunch({
              url: "/pages/login/login",
            });
            reject(new Error("未授权，请重新登录"));
          } else {
            uni.showToast({
              title: res.data.message || "请求失败",
              icon: "none",
            });
            reject(new Error(res.data.message || "请求失败"));
          }
        } else {
          uni.showToast({
            title: "网络请求失败",
            icon: "none",
          });
          reject(new Error("网络请求失败"));
        }
      },
      fail: (error) => {
        uni.showToast({
          title: "网络连接失败",
          icon: "none",
        });
        reject(error);
      },
    });
  });
};

export const get = (url, data, options = {}) => {
  return request({
    url,
    method: "GET",
    data,
    ...options,
  });
};

export const post = (url, data, options = {}) => {
  return request({
    url,
    method: "POST",
    data,
    ...options,
  });
};

export const put = (url, data, options = {}) => {
  return request({
    url,
    method: "PUT",
    data,
    ...options,
  });
};

export const del = (url, data, options = {}) => {
  return request({
    url,
    method: "DELETE",
    data,
    ...options,
  });
};

export default {
  get,
  post,
  put,
  del,
};
```

**使用示例**

```javascript
import { get, post } from "@/utils/request";

export default {
  data() {
    return {
      userList: [],
      userInfo: null,
    };
  },

  methods: {
    async getUserList() {
      try {
        const res = await get("/user/list", {
          page: 1,
          size: 10,
        });
        this.userList = res.data.list;
      } catch (error) {
        console.error("获取用户列表失败", error);
      }
    },

    async getUserInfo(id) {
      try {
        const res = await get(`/user/${id}`);
        this.userInfo = res.data;
      } catch (error) {
        console.error("获取用户信息失败", error);
      }
    },

    async updateUserInfo(data) {
      try {
        const res = await post("/user/update", data);
        uni.showToast({
          title: "更新成功",
          icon: "success",
        });
        return res;
      } catch (error) {
        console.error("更新用户信息失败", error);
      }
    },
  },
};
```

### 3.3 组件封装最佳实践

**1. 可复用组件设计原则**

- 单一职责：每个组件只负责一个功能
- 可配置性：通过 props 提供丰富的配置选项
- 可扩展性：通过插槽提供扩展能力
- 可维护性：代码结构清晰，注释完善

**2. 示例：封装列表组件**

```vue
<template>
  <view class="list-container">
    <scroll-view
      scroll-y
      class="scroll-view"
      :style="{ height: height }"
      @scrolltolower="loadMore"
    >
      <view
        v-for="(item, index) in list"
        :key="getKey(item, index)"
        class="list-item"
        @click="handleItemClick(item, index)"
      >
        <slot name="item" :item="item" :index="index">
          <text>{{ item }}</text>
        </slot>
      </view>

      <view v-if="loading" class="loading">
        <text>加载中...</text>
      </view>

      <view v-if="!hasMore && list.length > 0" class="no-more">
        <text>没有更多了</text>
      </view>

      <view v-if="!loading && list.length === 0" class="empty">
        <slot name="empty">
          <text>暂无数据</text>
        </slot>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: "ListView",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
    height: {
      type: String,
      default: "100vh",
    },
    itemKey: {
      type: String,
      default: "id",
    },
  },

  methods: {
    getKey(item, index) {
      return item[this.itemKey] || index;
    },

    loadMore() {
      if (!this.loading && this.hasMore) {
        this.$emit("load-more");
      }
    },

    handleItemClick(item, index) {
      this.$emit("item-click", { item, index });
    },
  },
};
</script>

<style scoped>
.list-container {
  width: 100%;
}

.scroll-view {
  width: 100%;
}

.list-item {
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.loading,
.no-more,
.empty {
  padding: 40rpx;
  text-align: center;
  color: #999;
}
</style>
```

**使用示例**

```vue
<template>
  <view class="page">
    <list-view
      :list="userList"
      :loading="loading"
      :has-more="hasMore"
      @load-more="loadMore"
      @item-click="handleItemClick"
    >
      <template #item="{ item, index }">
        <view class="user-item">
          <image :src="item.avatar" class="avatar"></image>
          <view class="info">
            <text class="name">{{ item.name }}</text>
            <text class="desc">{{ item.desc }}</text>
          </view>
        </view>
      </template>

      <template #empty>
        <view class="empty-container">
          <image src="/static/empty.png" class="empty-image"></image>
          <text>暂无用户数据</text>
        </view>
      </template>
    </list-view>
  </view>
</template>

<script>
import ListView from "@/components/list-view/list-view.vue";

export default {
  components: {
    ListView,
  },

  data() {
    return {
      userList: [],
      loading: false,
      hasMore: true,
      page: 1,
    };
  },

  onLoad() {
    this.loadUserList();
  },

  methods: {
    async loadUserList() {
      if (this.loading) return;

      this.loading = true;

      try {
        const res = await this.$http.get("/user/list", {
          page: this.page,
          size: 20,
        });

        if (this.page === 1) {
          this.userList = res.data.list;
        } else {
          this.userList = [...this.userList, ...res.data.list];
        }

        this.hasMore = res.data.hasMore;
        this.page++;
      } catch (error) {
        console.error("加载用户列表失败", error);
      } finally {
        this.loading = false;
      }
    },

    loadMore() {
      this.loadUserList();
    },

    handleItemClick({ item, index }) {
      console.log("点击用户", item, index);
      uni.navigateTo({
        url: `/pages/user/detail?id=${item.id}`,
      });
    },
  },
};
</script>

<style>
.user-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.info {
  flex: 1;
}

.name {
  font-size: 32rpx;
  color: #333;
  display: block;
}

.desc {
  font-size: 24rpx;
  color: #999;
  display: block;
  margin-top: 10rpx;
}

.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100rpx 0;
}

.empty-image {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 20rpx;
}
</style>
```

### 3.4 权限管理

**permission.js**

```javascript
const whiteList = [
  "/pages/login/login",
  "/pages/index/index",
  "/pages/register/register",
];

export function checkPermission() {
  const token = uni.getStorageSync("token");
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const currentRoute = "/" + currentPage.route;

  if (token) {
    if (currentRoute === "/pages/login/login") {
      uni.reLaunch({
        url: "/pages/index/index",
      });
    }
    return true;
  } else {
    if (whiteList.indexOf(currentRoute) !== -1) {
      return true;
    } else {
      uni.reLaunch({
        url: "/pages/login/login",
      });
      return false;
    }
  }
}

export function setupPermission() {
  uni.addInterceptor("navigateTo", {
    invoke(e) {
      const token = uni.getStorageSync("token");
      if (!token && whiteList.indexOf(e.url) === -1) {
        uni.reLaunch({
          url: "/pages/login/login",
        });
        return false;
      }
      return true;
    },
  });

  uni.addInterceptor("redirectTo", {
    invoke(e) {
      const token = uni.getStorageSync("token");
      if (!token && whiteList.indexOf(e.url) === -1) {
        uni.reLaunch({
          url: "/pages/login/login",
        });
        return false;
      }
      return true;
    },
  });

  uni.addInterceptor("reLaunch", {
    invoke(e) {
      const token = uni.getStorageSync("token");
      if (!token && whiteList.indexOf(e.url) === -1) {
        e.url = "/pages/login/login";
      }
      return true;
    },
  });
}
```

**main.js**

```javascript
import { setupPermission } from "@/utils/permission";

setupPermission();
```

### 3.5 国际化

**i18n/index.js**

```javascript
import Vue from "vue";
import VueI18n from "vue-i18n";
import zhCN from "./locales/zh-CN";
import enUS from "./locales/en-US";

Vue.use(VueI18n);

const messages = {
  "zh-CN": zhCN,
  "en-US": enUS,
};

const i18n = new VueI18n({
  locale: uni.getStorageSync("language") || "zh-CN",
  messages,
});

export default i18n;
```

**i18n/locales/zh-CN.js**

```javascript
export default {
  common: {
    confirm: "确定",
    cancel: "取消",
    submit: "提交",
    reset: "重置",
    search: "搜索",
    loading: "加载中...",
    noData: "暂无数据",
    noMore: "没有更多了",
  },

  user: {
    login: "登录",
    logout: "退出登录",
    register: "注册",
    username: "用户名",
    password: "密码",
    profile: "个人资料",
    setting: "设置",
  },

  message: {
    success: "操作成功",
    failed: "操作失败",
    networkError: "网络连接失败",
    loginSuccess: "登录成功",
    loginFailed: "登录失败",
  },
};
```

**i18n/locales/en-US.js**

```javascript
export default {
  common: {
    confirm: "Confirm",
    cancel: "Cancel",
    submit: "Submit",
    reset: "Reset",
    search: "Search",
    loading: "Loading...",
    noData: "No Data",
    noMore: "No More",
  },

  user: {
    login: "Login",
    logout: "Logout",
    register: "Register",
    username: "Username",
    password: "Password",
    profile: "Profile",
    setting: "Setting",
  },

  message: {
    success: "Success",
    failed: "Failed",
    networkError: "Network Error",
    loginSuccess: "Login Success",
    loginFailed: "Login Failed",
  },
};
```

**使用示例**

```vue
<template>
  <view class="container">
    <text>{{ $t("user.login") }}</text>
    <button @click="changeLanguage">切换语言</button>
  </view>
</template>

<script>
export default {
  methods: {
    changeLanguage() {
      const currentLang = this.$i18n.locale;
      const newLang = currentLang === "zh-CN" ? "en-US" : "zh-CN";

      this.$i18n.locale = newLang;
      uni.setStorageSync("language", newLang);

      uni.showToast({
        title: this.$t("message.success"),
        icon: "success",
      });
    },
  },
};
</script>
```

---

## 四、常见面试题

### 4.1 基础题

#### 1. 什么是 uni-app？它的核心优势是什么？

**答案：**

uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到 iOS、Android、Web（响应式）、以及各种小程序等多个平台。

**核心优势：**

1. **一套代码，多端发布**：通过条件编译实现平台差异化处理，减少开发成本
2. **Vue.js 语法**：基于 Vue.js 开发，学习成本低，上手快
3. **丰富的组件和 API**：提供丰富的跨端组件和 API，满足各种开发需求
4. **完善的生态**：插件市场、UI 库、开发工具完善，社区活跃
5. **性能优异**：原生渲染，性能接近原生应用
6. **开发效率高**：支持热更新，开发调试方便

#### 2. uni-app 的生命周期有哪些？

**答案：**

uni-app 的生命周期分为三类：

**1. 应用生命周期（App.vue）：**

- `onLaunch`：应用初始化完成
- `onShow`：应用从后台进入前台
- `onHide`：应用从前台进入后台
- `onError`：应用发生错误
- `onUniNViewMessage`：nvue 页面发送的数据
- `onUnhandledRejection`：未处理的 Promise 拒绝
- `onPageNotFound`：页面不存在
- `onThemeChange`：系统主题变化

**2. 页面生命周期：**

- `onLoad`：页面加载
- `onShow`：页面显示
- `onReady`：页面初次渲染完成
- `onHide`：页面隐藏
- `onUnload`：页面卸载
- `onPullDownRefresh`：用户下拉动作
- `onReachBottom`：页面上拉触底
- `onTabItemTap`：当前是 tab 页，点击 tab 时触发
- `onShareAppMessage`：用户点击右上角分享
- `onShareTimeline`：用户点击右上角分享到朋友圈
- `onAddToFavorites`：用户点击右上角收藏
- `onPageScroll`：页面滚动
- `onResize`：窗口尺寸变化
- `onNavigationBarButtonTap`：导航栏按钮点击事件
- `onBackPress`：页面返回
- `onNavigationBarSearchInputChanged`：导航栏搜索框输入
- `onNavigationBarSearchInputConfirmed`：导航栏搜索框确认
- `onNavigationBarSearchInputFocused`：导航栏搜索框聚焦

**3. 组件生命周期：**

- `beforeCreate`：组件实例刚刚被创建
- `created`：组件实例创建完成
- `beforeMount`：组件挂载之前
- `mounted`：组件挂载之后
- `beforeUpdate`：组件数据更新之前
- `updated`：组件数据更新之后
- `beforeDestroy`：组件销毁之前
- `destroyed`：组件销毁之后

#### 3. uni-app 中如何进行页面跳转？有哪些方式？

**答案：**

uni-app 提供了以下页面跳转方式：

**1. uni.navigateTo()**

- 保留当前页面，跳转到应用内的某个页面
- 可以返回上一页
- 页面栈最多 10 层

```javascript
uni.navigateTo({
  url: "/pages/detail/detail?id=123",
});
```

**2. uni.redirectTo()**

- 关闭当前页面，跳转到应用内的某个页面
- 不能返回上一页

```javascript
uni.redirectTo({
  url: "/pages/login/login",
});
```

**3. uni.reLaunch()**

- 关闭所有页面，打开到应用内的某个页面
- 可以返回首页

```javascript
uni.reLaunch({
  url: "/pages/index/index",
});
```

**4. uni.switchTab()**

- 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
- 只能跳转到 tabBar 页面

```javascript
uni.switchTab({
  url: "/pages/index/index",
});
```

**5. uni.navigateBack()**

- 关闭当前页面，返回上一页面或多级页面
- 可通过 `getCurrentPages()` 获取页面栈

```javascript
uni.navigateBack({
  delta: 1,
});
```

#### 4. uni-app 中如何进行数据缓存？

**答案：**

uni-app 提供了以下数据缓存 API：

**1. 异步存储**

```javascript
uni.setStorage({
  key: "userInfo",
  data: { name: "张三", age: 25 },
  success: () => {
    console.log("存储成功");
  },
});

uni.getStorage({
  key: "userInfo",
  success: (res) => {
    console.log("获取成功", res.data);
  },
});

uni.removeStorage({
  key: "userInfo",
  success: () => {
    console.log("删除成功");
  },
});

uni.clearStorage({
  success: () => {
    console.log("清空成功");
  },
});
```

**2. 同步存储**

```javascript
uni.setStorageSync("userInfo", { name: "张三", age: 25 });

const userInfo = uni.getStorageSync("userInfo");
console.log("获取成功", userInfo);

uni.removeStorageSync("userInfo");

uni.clearStorageSync();

const info = uni.getStorageInfoSync();
console.log("存储信息", info);
```

**注意事项：**

- 单个 key 允许存储的最大数据长度为 1MB
- 所有数据存储上限为 10MB
- 建议存储 JSON 格式数据
- 小程序中数据会存储在本地，App 中数据会存储在应用沙盒中

#### 5. uni-app 中如何进行网络请求？

**答案：**

uni-app 提供了 `uni.request()` API 进行网络请求：

**基本用法：**

```javascript
uni.request({
  url: "https://api.example.com/data",
  method: "GET",
  data: {
    page: 1,
    size: 10,
  },
  header: {
    "Content-Type": "application/json",
    Authorization: "Bearer token",
  },
  timeout: 60000,
  success: (res) => {
    console.log("请求成功", res.data);
  },
  fail: (error) => {
    console.error("请求失败", error);
  },
  complete: () => {
    console.log("请求完成");
  },
});
```

**Promise 封装：**

```javascript
const request = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: options.header || {},
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error("请求失败"));
        }
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
};

// 使用
try {
  const data = await request({
    url: "https://api.example.com/data",
    method: "GET",
  });
  console.log("请求成功", data);
} catch (error) {
  console.error("请求失败", error);
}
```

**注意事项：**

- 小程序中需要配置合法域名
- 支持 GET、POST、PUT、DELETE 等请求方法
- 请求超时时间默认为 60 秒
- 可以通过拦截器统一处理请求和响应

### 4.2 进阶题

#### 1. uni-app 中如何实现条件编译？有哪些应用场景？

**答案：**

条件编译是 uni-app 最重要的特性之一，可以根据不同平台编译不同的代码。

**语法：**

```vue
<template>
  <!-- #ifdef H5 -->
  <view>这段代码只在 H5 平台显示</view>
  <!-- #endif -->

  <!-- #ifdef MP-WEIXIN -->
  <view>这段代码只在微信小程序平台显示</view>
  <!-- #endif -->

  <!-- #ifndef H5 -->
  <view>这段代码不在 H5 平台显示</view>
  <!-- #endif -->
</template>

<script>
export default {
  methods: {
    handleClick() {
      // #ifdef H5
      console.log("H5 平台特有代码");
      // #endif

      // #ifdef MP-WEIXIN
      console.log("微信小程序平台特有代码");
      // #endif
    },
  },
};
</script>

<style>
/* #ifdef H5 */
.h5-only {
  color: red;
}
/* #endif */
</style>
```

**应用场景：**

1. **平台特有 API 调用**

```javascript
share() {
  // #ifdef MP-WEIXIN
  wx.shareAppMessage({ title: '分享标题' })
  // #endif

  // #ifdef APP-PLUS
  plus.share.sendWithSystem({ type: 'text', content: '分享内容' })
  // #endif
}
```

2. **平台特有组件**

```vue
<!-- #ifdef MP-WEIXIN -->
<official-account></official-account>
<!-- #endif -->
```

3. **平台特有样式**

```css
/* #ifdef H5 */
.container {
  max-width: 750px;
  margin: 0 auto;
}
/* #endif */
```

4. **平台特有功能**

```javascript
// #ifdef APP-PLUS
plus.runtime.getVersion();
// #endif
```

#### 2. uni-app 中如何实现组件通信？

**答案：**

uni-app 中组件通信有以下几种方式：

**1. 父子组件通信**

**父传子（props）：**

```vue
<template>
  <child-component :message="parentMessage"></child-component>
</template>

<script>
export default {
  data() {
    return {
      parentMessage: "来自父组件的消息",
    };
  },
};
</script>
```

```vue
<template>
  <view>{{ message }}</view>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
  },
};
</script>
```

**子传父（$emit）：**

```vue
<template>
  <child-component @child-event="onChildEvent"></child-component>
</template>

<script>
export default {
  methods: {
    onChildEvent(data) {
      console.log("接收到子组件事件", data);
    },
  },
};
</script>
```

```vue
<template>
  <button @click="sendEvent">发送事件</button>
</template>

<script>
export default {
  methods: {
    sendEvent() {
      this.$emit("child-event", { data: "来自子组件的数据" });
    },
  },
};
</script>
```

**2. 兄弟组件通信（Event Bus）**

```javascript
const eventBus = new Vue();

export default eventBus;
```

```javascript
import eventBus from "@/utils/eventBus";

export default {
  methods: {
    sendEvent() {
      eventBus.$emit("custom-event", { data: "数据" });
    },
  },
};
```

```javascript
import eventBus from "@/utils/eventBus";

export default {
  mounted() {
    eventBus.$on("custom-event", (data) => {
      console.log("接收到事件", data);
    });
  },

  beforeDestroy() {
    eventBus.$off("custom-event");
  },
};
```

**3. 跨级组件通信（provide/inject）**

```javascript
export default {
  provide() {
    return {
      userInfo: this.userInfo,
      updateUser: this.updateUser,
    };
  },

  data() {
    return {
      userInfo: { name: "张三" },
    };
  },

  methods: {
    updateUser(info) {
      this.userInfo = info;
    },
  },
};
```

```javascript
export default {
  inject: ["userInfo", "updateUser"],

  methods: {
    update() {
      this.updateUser({ name: "李四" });
    },
  },
};
```

**4. 全局状态管理（Vuex/Pinia）**

```javascript
import { useUserStore } from "@/stores/user";

export default {
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    };
  },
};
```

#### 3. uni-app 中如何实现下拉刷新和上拉加载？

**答案：**

**下拉刷新：**

**1. 配置 pages.json**

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "enablePullDownRefresh": true,
        "backgroundTextStyle": "dark"
      }
    }
  ],
  "globalStyle": {
    "enablePullDownRefresh": false
  }
}
```

**2. 页面中使用**

```javascript
export default {
  onPullDownRefresh() {
    console.log("用户下拉刷新");

    this.loadData().then(() => {
      uni.stopPullDownRefresh();
    });
  },

  methods: {
    async loadData() {
      try {
        const res = await this.$http.get("/data/list");
        this.list = res.data;
      } catch (error) {
        console.error("加载失败", error);
      }
    },
  },
};
```

**上拉加载：**

**1. 配置 pages.json**

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "onReachBottomDistance": 50
      }
    }
  ]
}
```

**2. 页面中使用**

```javascript
export default {
  data() {
    return {
      list: [],
      page: 1,
      loading: false,
      hasMore: true,
    };
  },

  onLoad() {
    this.loadData();
  },

  onReachBottom() {
    if (!this.loading && this.hasMore) {
      this.loadMore();
    }
  },

  methods: {
    async loadData() {
      this.loading = true;

      try {
        const res = await this.$http.get("/data/list", {
          page: this.page,
          size: 20,
        });

        this.list = res.data.list;
        this.hasMore = res.data.hasMore;
      } catch (error) {
        console.error("加载失败", error);
      } finally {
        this.loading = false;
      }
    },

    async loadMore() {
      this.page++;
      await this.loadData();
    },
  },
};
```

**使用 scroll-view 组件：**

```vue
<template>
  <scroll-view scroll-y class="scroll-view" @scrolltolower="loadMore">
    <view v-for="item in list" :key="item.id">
      {{ item.name }}
    </view>
  </scroll-view>
</template>

<script>
export default {
  methods: {
    loadMore() {
      if (!this.loading && this.hasMore) {
        this.loadData();
      }
    },
  },
};
</script>
```

#### 4. uni-app 中如何处理图片懒加载？

**答案：**

**1. 使用 image 组件的 lazy-load 属性**

```vue
<template>
  <image :src="item.image" lazy-load mode="aspectFill"></image>
</template>
```

**2. 自定义懒加载实现**

```vue
<template>
  <view class="image-container">
    <image
      v-for="(item, index) in imageList"
      :key="index"
      :src="item.loaded ? item.src : placeholder"
      :data-src="item.src"
      :data-index="index"
      @load="onImageLoad"
      mode="aspectFill"
    ></image>
  </view>
</template>

<script>
export default {
  data() {
    return {
      placeholder: "/static/placeholder.png",
      imageList: [
        { src: "https://example.com/image1.jpg", loaded: false },
        { src: "https://example.com/image2.jpg", loaded: false },
      ],
    };
  },

  methods: {
    onImageLoad(e) {
      const index = e.currentTarget.dataset.index;
      this.imageList[index].loaded = true;
    },
  },
};
</script>
```

**3. 使用 Intersection Observer（H5）**

```javascript
export default {
  mounted() {
    // #ifdef H5
    this.setupLazyLoad();
    // #endif
  },

  methods: {
    setupLazyLoad() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        observer.observe(img);
      });
    },
  },
};
```

#### 5. uni-app 中如何实现登录状态管理？

**答案：**

**1. 登录流程**

```javascript
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    async handleLogin() {
      try {
        const res = await this.$http.post("/user/login", this.form);

        uni.setStorageSync("token", res.data.token);
        uni.setStorageSync("userInfo", res.data.userInfo);

        uni.showToast({
          title: "登录成功",
          icon: "success",
        });

        setTimeout(() => {
          uni.reLaunch({
            url: "/pages/index/index",
          });
        }, 1500);
      } catch (error) {
        uni.showToast({
          title: "登录失败",
          icon: "none",
        });
      }
    },
  },
};
```

**2. 权限拦截**

```javascript
const whiteList = ["/pages/login/login", "/pages/index/index"];

function checkAuth() {
  const token = uni.getStorageSync("token");
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const currentRoute = "/" + currentPage.route;

  if (!token && whiteList.indexOf(currentRoute) === -1) {
    uni.reLaunch({
      url: "/pages/login/login",
    });
    return false;
  }

  return true;
}

export default checkAuth;
```

**3. 请求拦截**

```javascript
const request = (options) => {
  const token = uni.getStorageSync("token");

  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: {
        Authorization: token ? `Bearer ${token}` : "",
        ...options.header,
      },
      success: (res) => {
        if (res.statusCode === 401) {
          uni.removeStorageSync("token");
          uni.reLaunch({
            url: "/pages/login/login",
          });
          reject(new Error("未授权"));
        } else {
          resolve(res.data);
        }
      },
      fail: reject,
    });
  });
};
```

### 4.3 实战题

#### 1. 如何实现一个完整的购物车功能？

**答案：**

**1. 数据结构设计**

```javascript
export default {
  data() {
    return {
      cartList: [
        {
          id: 1,
          name: "商品名称",
          price: 99.99,
          count: 1,
          selected: true,
          image: "/static/product.jpg",
        },
      ],
    };
  },
};
```

**2. 计算属性**

```javascript
computed: {
  totalPrice() {
    return this.cartList
      .filter(item => item.selected)
      .reduce((total, item) => {
        return total + item.price * item.count
      }, 0)
      .toFixed(2)
  },

  selectedCount() {
    return this.cartList.filter(item => item.selected).length
  },

  isAllSelected() {
    return this.cartList.length > 0 &&
           this.cartList.every(item => item.selected)
  }
}
```

**3. 方法实现**

```javascript
methods: {
  selectItem(item) {
    item.selected = !item.selected
  },

  selectAll() {
    const isAllSelected = this.isAllSelected
    this.cartList.forEach(item => {
      item.selected = !isAllSelected
    })
  },

  increaseCount(item) {
    item.count++
    this.updateCart(item)
  },

  decreaseCount(item) {
    if (item.count > 1) {
      item.count--
      this.updateCart(item)
    }
  },

  removeItem(index) {
    uni.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: (res) => {
        if (res.confirm) {
          this.cartList.splice(index, 1)
          this.saveCart()
        }
      }
    })
  },

  async updateCart(item) {
    try {
      await this.$http.post('/cart/update', {
        id: item.id,
        count: item.count
      })
      this.saveCart()
    } catch (error) {
      console.error('更新购物车失败', error)
    }
  },

  saveCart() {
    uni.setStorageSync('cartList', this.cartList)
  },

  loadCart() {
    const cartList = uni.getStorageSync('cartList')
    if (cartList) {
      this.cartList = cartList
    }
  },

  async submitOrder() {
    const selectedItems = this.cartList.filter(item => item.selected)

    if (selectedItems.length === 0) {
      uni.showToast({
        title: '请选择商品',
        icon: 'none'
      })
      return
    }

    try {
      const res = await this.$http.post('/order/create', {
        items: selectedItems
      })

      uni.navigateTo({
        url: `/pages/order/detail?id=${res.data.orderId}`
      })
    } catch (error) {
      console.error('提交订单失败', error)
    }
  }
}
```

**4. 完整组件**

```vue
<template>
  <view class="cart-container">
    <view class="cart-list">
      <view v-for="(item, index) in cartList" :key="item.id" class="cart-item">
        <checkbox :checked="item.selected" @click="selectItem(item)" />

        <image :src="item.image" class="product-image"></image>

        <view class="product-info">
          <text class="product-name">{{ item.name }}</text>
          <text class="product-price">¥{{ item.price }}</text>

          <view class="count-control">
            <button size="mini" @click="decreaseCount(item)">-</button>
            <text class="count">{{ item.count }}</text>
            <button size="mini" @click="increaseCount(item)">+</button>
          </view>
        </view>

        <button type="warn" size="mini" @click="removeItem(index)">删除</button>
      </view>
    </view>

    <view class="cart-footer">
      <checkbox :checked="isAllSelected" @click="selectAll">全选</checkbox>

      <view class="total-info">
        <text>合计：</text>
        <text class="total-price">¥{{ totalPrice }}</text>
      </view>

      <button type="primary" @click="submitOrder">
        结算({{ selectedCount }})
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cartList: [],
    };
  },

  computed: {
    totalPrice() {
      return this.cartList
        .filter((item) => item.selected)
        .reduce((total, item) => {
          return total + item.price * item.count;
        }, 0)
        .toFixed(2);
    },

    selectedCount() {
      return this.cartList.filter((item) => item.selected).length;
    },

    isAllSelected() {
      return (
        this.cartList.length > 0 && this.cartList.every((item) => item.selected)
      );
    },
  },

  onLoad() {
    this.loadCart();
  },

  methods: {
    selectItem(item) {
      item.selected = !item.selected;
      this.saveCart();
    },

    selectAll() {
      const isAllSelected = this.isAllSelected;
      this.cartList.forEach((item) => {
        item.selected = !isAllSelected;
      });
      this.saveCart();
    },

    increaseCount(item) {
      item.count++;
      this.saveCart();
    },

    decreaseCount(item) {
      if (item.count > 1) {
        item.count--;
        this.saveCart();
      }
    },

    removeItem(index) {
      uni.showModal({
        title: "提示",
        content: "确定要删除吗？",
        success: (res) => {
          if (res.confirm) {
            this.cartList.splice(index, 1);
            this.saveCart();
          }
        },
      });
    },

    saveCart() {
      uni.setStorageSync("cartList", this.cartList);
    },

    loadCart() {
      const cartList = uni.getStorageSync("cartList");
      if (cartList) {
        this.cartList = cartList;
      }
    },

    submitOrder() {
      const selectedItems = this.cartList.filter((item) => item.selected);

      if (selectedItems.length === 0) {
        uni.showToast({
          title: "请选择商品",
          icon: "none",
        });
        return;
      }

      uni.navigateTo({
        url: "/pages/order/confirm",
      });
    },
  },
};
</script>

<style>
.cart-container {
  padding-bottom: 100rpx;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.product-image {
  width: 150rpx;
  height: 150rpx;
  margin: 0 20rpx;
}

.product-info {
  flex: 1;
}

.product-name {
  display: block;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.product-price {
  display: block;
  font-size: 32rpx;
  color: #ff0000;
  margin-bottom: 10rpx;
}

.count-control {
  display: flex;
  align-items: center;
}

.count {
  margin: 0 20rpx;
}

.cart-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  border-top: 1rpx solid #eee;
}

.total-info {
  flex: 1;
  text-align: right;
  margin-right: 20rpx;
}

.total-price {
  font-size: 36rpx;
  color: #ff0000;
  font-weight: bold;
}
</style>
```

#### 2. 如何实现一个完整的登录注册流程？

**答案：**

**1. 登录页面**

```vue
<template>
  <view class="login-container">
    <view class="form">
      <view class="form-item">
        <input v-model="form.username" placeholder="请输入用户名" type="text" />
      </view>

      <view class="form-item">
        <input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        />
      </view>

      <button type="primary" @click="handleLogin">登录</button>

      <view class="links">
        <text @click="goToRegister">注册账号</text>
        <text @click="forgetPassword">忘记密码</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    async handleLogin() {
      if (!this.form.username) {
        uni.showToast({
          title: "请输入用户名",
          icon: "none",
        });
        return;
      }

      if (!this.form.password) {
        uni.showToast({
          title: "请输入密码",
          icon: "none",
        });
        return;
      }

      try {
        const res = await this.$http.post("/user/login", this.form);

        uni.setStorageSync("token", res.data.token);
        uni.setStorageSync("userInfo", res.data.userInfo);

        uni.showToast({
          title: "登录成功",
          icon: "success",
        });

        setTimeout(() => {
          uni.reLaunch({
            url: "/pages/index/index",
          });
        }, 1500);
      } catch (error) {
        uni.showToast({
          title: error.message || "登录失败",
          icon: "none",
        });
      }
    },

    goToRegister() {
      uni.navigateTo({
        url: "/pages/register/register",
      });
    },

    forgetPassword() {
      uni.navigateTo({
        url: "/pages/forget/forget",
      });
    },
  },
};
</script>
```

**2. 注册页面**

```vue
<template>
  <view class="register-container">
    <view class="form">
      <view class="form-item">
        <input v-model="form.username" placeholder="请输入用户名" type="text" />
      </view>

      <view class="form-item">
        <input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        />
      </view>

      <view class="form-item">
        <input
          v-model="form.confirmPassword"
          placeholder="请确认密码"
          type="password"
        />
      </view>

      <view class="form-item">
        <input v-model="form.phone" placeholder="请输入手机号" type="number" />
      </view>

      <view class="form-item code-item">
        <input v-model="form.code" placeholder="请输入验证码" type="number" />
        <button size="mini" :disabled="codeDisabled" @click="sendCode">
          {{ codeText }}
        </button>
      </view>

      <button type="primary" @click="handleRegister">注册</button>

      <view class="links">
        <text @click="goToLogin">已有账号？去登录</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        confirmPassword: "",
        phone: "",
        code: "",
      },
      codeText: "获取验证码",
      codeDisabled: false,
      timer: null,
    };
  },

  methods: {
    async sendCode() {
      if (!this.form.phone) {
        uni.showToast({
          title: "请输入手机号",
          icon: "none",
        });
        return;
      }

      if (!/^1[3-9]\d{9}$/.test(this.form.phone)) {
        uni.showToast({
          title: "手机号格式不正确",
          icon: "none",
        });
        return;
      }

      try {
        await this.$http.post("/user/send-code", {
          phone: this.form.phone,
        });

        uni.showToast({
          title: "验证码已发送",
          icon: "success",
        });

        this.startCountdown();
      } catch (error) {
        uni.showToast({
          title: error.message || "发送失败",
          icon: "none",
        });
      }
    },

    startCountdown() {
      let countdown = 60;
      this.codeDisabled = true;
      this.codeText = `${countdown}秒后重试`;

      this.timer = setInterval(() => {
        countdown--;

        if (countdown <= 0) {
          clearInterval(this.timer);
          this.codeDisabled = false;
          this.codeText = "获取验证码";
        } else {
          this.codeText = `${countdown}秒后重试`;
        }
      }, 1000);
    },

    async handleRegister() {
      if (!this.validateForm()) {
        return;
      }

      try {
        await this.$http.post("/user/register", this.form);

        uni.showToast({
          title: "注册成功",
          icon: "success",
        });

        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      } catch (error) {
        uni.showToast({
          title: error.message || "注册失败",
          icon: "none",
        });
      }
    },

    validateForm() {
      if (!this.form.username) {
        uni.showToast({ title: "请输入用户名", icon: "none" });
        return false;
      }

      if (!this.form.password) {
        uni.showToast({ title: "请输入密码", icon: "none" });
        return false;
      }

      if (this.form.password !== this.form.confirmPassword) {
        uni.showToast({ title: "两次密码不一致", icon: "none" });
        return false;
      }

      if (!this.form.phone) {
        uni.showToast({ title: "请输入手机号", icon: "none" });
        return false;
      }

      if (!/^1[3-9]\d{9}$/.test(this.form.phone)) {
        uni.showToast({ title: "手机号格式不正确", icon: "none" });
        return false;
      }

      if (!this.form.code) {
        uni.showToast({ title: "请输入验证码", icon: "none" });
        return false;
      }

      return true;
    },

    goToLogin() {
      uni.navigateBack();
    },
  },

  onUnload() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>
```

**3. 权限管理**

```javascript
const whiteList = [
  "/pages/login/login",
  "/pages/register/register",
  "/pages/index/index",
];

export function setupAuth() {
  uni.addInterceptor("navigateTo", {
    invoke(e) {
      const token = uni.getStorageSync("token");
      if (!token && whiteList.indexOf(e.url) === -1) {
        uni.reLaunch({
          url: "/pages/login/login",
        });
        return false;
      }
      return true;
    },
  });
}
```

---

## 五、性能优化与跨端适配

### 5.1 性能优化

#### 1. 代码优化

**减少 setData 调用**

```javascript
export default {
  methods: {
    updateData() {
      const newData = {
        name: "张三",
        age: 25,
        city: "北京",
      };

      this.setData(newData);
    },
  },
};
```

**避免频繁操作 DOM**

```javascript
export default {
  methods: {
    updateList() {
      const newList = this.list.map((item) => {
        return {
          ...item,
          status: "updated",
        };
      });

      this.list = newList;
    },
  },
};
```

**使用计算属性**

```javascript
export default {
  computed: {
    filteredList() {
      return this.list.filter((item) => item.status === "active");
    },
  },
};
```

#### 2. 图片优化

**使用懒加载**

```vue
<image :src="item.image" lazy-load mode="aspectFill"></image>
```

**使用合适的图片格式**

- JPEG：适合照片类图片
- PNG：适合图标、透明图片
- WebP：压缩率高，兼容性好
- SVG：适合矢量图标

**图片压缩**

```javascript
uni.compressImage({
  src: tempFilePaths[0],
  quality: 80,
  success: (res) => {
    console.log("压缩后图片路径", res.tempFilePath);
  },
});
```

#### 3. 网络优化

**请求合并**

```javascript
export default {
  async onLoad() {
    const [user, product, order] = await Promise.all([
      this.$http.get("/user/info"),
      this.$http.get("/product/list"),
      this.$http.get("/order/list"),
    ]);

    this.userInfo = user.data;
    this.productList = product.data;
    this.orderList = order.data;
  },
};
```

**数据缓存**

```javascript
export default {
  async loadData() {
    const cacheKey = "product_list";
    const cache = uni.getStorageSync(cacheKey);

    if (cache && Date.now() - cache.timestamp < 3600000) {
      this.productList = cache.data;
      return;
    }

    const res = await this.$http.get("/product/list");
    this.productList = res.data;

    uni.setStorageSync(cacheKey, {
      data: res.data,
      timestamp: Date.now(),
    });
  },
};
```

#### 4. 分包加载

**pages.json 配置**

```json
{
  "pages": [
    {
      "path": "pages/index/index"
    }
  ],
  "subPackages": [
    {
      "root": "pages/user",
      "pages": [
        {
          "path": "profile/profile"
        },
        {
          "path": "setting/setting"
        }
      ]
    }
  ],
  "preloadRule": {
    "pages/index/index": {
      "network": "all",
      "packages": ["pages/user"]
    }
  }
}
```

### 5.2 跨端适配

#### 1. 样式适配

**使用 rpx 单位**

```css
.container {
  width: 750rpx;
  padding: 20rpx;
  font-size: 28rpx;
}
```

**使用 CSS 变量**

```css
:root {
  --primary-color: #007aff;
  --text-color: #333;
  --bg-color: #f8f8f8;
}

.container {
  color: var(--text-color);
  background-color: var(--bg-color);
}
```

#### 2. API 适配

**封装平台 API**

```javascript
const platform = {
  getSystemInfo() {
    return new Promise((resolve) => {
      uni.getSystemInfo({
        success: (res) => {
          resolve(res);
        },
      });
    });
  },

  showToast(title) {
    // #ifdef MP-WEIXIN
    wx.showToast({
      title,
      icon: "success",
    });
    // #endif

    // #ifdef APP-PLUS
    plus.nativeUI.toast(title);
    // #endif

    // #ifdef H5
    uni.showToast({
      title,
      icon: "success",
    });
    // #endif
  },
};

export default platform;
```

#### 3. 组件适配

**条件编译组件**

```vue
<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <official-account></official-account>
    <!-- #endif -->

    <!-- #ifdef APP-PLUS -->
    <live-pusher url="rtmp://example.com/live"></live-pusher>
    <!-- #endif -->
  </view>
</template>
```

---

## 总结

本文档涵盖了 uni-app 的基础知识和常见面试题，包括：

1. **基础知识**：框架介绍、环境搭建、核心配置
2. **核心概念**：生命周期、组件系统、API 接口、路由管理、状态管理
3. **开发技巧**：条件编译、网络请求封装、组件封装、权限管理、国际化
4. **面试题**：基础题、进阶题、实战题
5. **性能优化**：代码优化、图片优化、网络优化、分包加载
6. **跨端适配**：样式适配、API 适配、组件适配

希望本文档能够帮助您更好地理解和掌握 uni-app 开发！

```

```
