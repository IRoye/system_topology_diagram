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

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT


# system_topology_diagram
