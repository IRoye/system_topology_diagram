# DATABUFF 拓扑图 Demo

基于 AntV G6 实现的拓扑图可视化demo，展示系统架构的嵌套节点结构。

## 功能特性

- ✅ 嵌套的节点结构（系统 → 子系统 → 服务实例）
- ✅ 不同颜色的状态节点（正常/警戒/严重）
- ✅ 深色主题UI界面
- ✅ 支持拖拽和缩放
- ✅ 自定义节点类型（服务实例、数据库、Web服务器）

## 快速开始

### 方式一：使用本地服务器

```bash
npm install -g http-server
npm start
# 或
npx http-server . -p 8080 -o
```

### 方式二：直接打开

直接用浏览器打开 `index.html` 文件即可（推荐使用现代浏览器）。

## 项目结构

```
DATABUFF/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── topology.js         # G6拓扑图核心逻辑
├── package.json        # 项目配置
└── README.md          # 说明文档
```

## 技术栈

- **AntV G6** - 图可视化引擎
- **原生 JavaScript** - 无额外依赖
- **CSS3** - 现代化样式

## 节点类型说明

### 系统节点（System Combo）
- 外层大圆圈，表示业务系统
- 示例：电商系统2

### 子系统节点（Subsystem Combo）
- 中层圆圈，表示子系统
- 示例：订单子系统、商铺子系统、物流子系统、支付子系统

### 服务实例节点（Service Instance）
- 内层小圆圈，表示服务实例
- 颜色含义：
  - 🔵 灰色：正常（Normal）
  - 🟡 黄色：警戒（Warning）
  - 🔴 红色：严重（Severe）

### 数据库节点（Database）
- 带数据库图标的特殊节点
- 示例：mysql

### Web服务器节点（Webserver）
- 带Web图标的特殊节点
- 示例：easyOrderWebserver

## 交互功能

- **拖拽画布**：鼠标左键拖拽
- **缩放画布**：鼠标滚轮
- **拖拽节点**：直接拖拽节点或combo
- **悬停高亮**：鼠标悬停显示高亮效果
- **折叠/展开 Combo**：双击 combo 可以折叠或展开其包含的节点

## 节点聚集调整方法

在使用力导向图（force layout）时，如果节点分散，可以通过调整以下参数来控制节点的聚集程度：

### 布局参数说明

在 `topology.js` 的 `layout` 配置中，可以调整以下参数：

#### 1. `linkDistance`（边的长度）
- **作用**：控制节点到中心节点的距离
- **调整方法**：
  - 减小值（如 `25` → `20`）：节点更靠近中心，更紧密
  - 增大值（如 `25` → `40`）：节点距离中心更远，更分散
- **推荐范围**：`20-40`

#### 2. `nodeStrength`（节点斥力）
- **作用**：控制节点之间的排斥力
- **调整方法**：
  - 减小绝对值（如 `-5` → `-3`）：斥力减小，节点可以更靠近
  - 增大绝对值（如 `-3` → `-10`）：斥力增大，节点更分散
- **注意**：必须为负值，负值表示斥力
- **推荐范围**：`-3` 到 `-10`

#### 3. `collideStrength`（碰撞强度）
- **作用**：控制节点碰撞时的反弹强度
- **调整方法**：
  - 减小值（如 `0.2` → `0.1`）：碰撞强度减小，节点可以更紧靠
  - 增大值（如 `0.1` → `0.5`）：碰撞强度增大，节点更容易被弹开
- **推荐范围**：`0.1` 到 `0.5`

#### 4. `nodeSpacing`（节点间距）
- **作用**：节点之间的最小距离
- **调整方法**：
  - 减小值（如 `5` → `2`）：节点可以更紧密
  - 增大值（如 `2` → `10`）：节点之间保持更大距离
- **推荐范围**：`2` 到 `10`

#### 5. 初始随机位置范围
- **位置**：在节点初始化时设置 `node.x` 和 `node.y`
- **调整方法**：
  ```javascript
  // 当前设置（紧密）
  node.x = width / 2 + 5 * (Math.random() - 0.5);
  node.y = height / 2 + 5 * (Math.random() - 0.5);
  
  // 更分散（增大数值）
  node.x = width / 2 + 20 * (Math.random() - 0.5);
  node.y = height / 2 + 20 * (Math.random() - 0.5);
  ```

### 当前推荐配置（紧密聚集）

```javascript
layout: {
    type: 'force',
    center: [width / 2, height / 2],
    linkDistance: 25,        // 节点到中心距离
    nodeStrength: -3,        // 节点斥力（负值）
    collideStrength: 0.1,   // 碰撞强度
    preventOverlap: true,    // 防止重叠
    nodeSpacing: 2,         // 节点最小间距
    alphaDecay: 0.02,       // 衰减速度
    alpha: 0.3,             // 初始温度
}
```

### 调整技巧

1. **让节点更紧密**：
   - 减小 `linkDistance`
   - 减小 `nodeStrength` 的绝对值
   - 减小 `collideStrength`
   - 减小 `nodeSpacing`
   - 减小初始随机位置范围

2. **让节点更分散**：
   - 增大 `linkDistance`
   - 增大 `nodeStrength` 的绝对值
   - 增大 `collideStrength`
   - 增大 `nodeSpacing`
   - 增大初始随机位置范围

3. **注意事项**：
   - 参数调整后需要刷新页面才能看到效果
   - 建议逐步调整，每次只修改一个参数
   - 如果节点重叠，可以适当增大 `nodeSpacing` 或 `collideStrength`

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT


# system_topology_diagram
# system_topology_diagram
