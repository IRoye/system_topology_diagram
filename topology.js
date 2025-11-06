const { Graph, NodeEvent } = G6;

// 定义节点状态颜色映射
const statusColors = {
    normal: '#808080',    // 灰色 - 正常
    warning: '#FFA500',   // 橙色 - 警戒
    severe: '#FF4444',    // 红色 - 严重
};

const data = {
    nodes: [
        // 订单子系统节点
        { id: 'order-node-1', label: '', description: '订单服务1', status: 'normal', combo: 'order-subsystem' },
        { id: 'order-node-2', label: '', description: '订单服务2', status: 'warning', combo: 'order-subsystem' },
        { id: 'order-node-3', label: '', description: '订单服务3', status: 'normal', combo: 'order-subsystem' },
        { id: 'order-node-4', label: '', description: '订单服务4', status: 'severe', combo: 'order-subsystem' },
        { id: 'order-node-5', label: '', description: '订单服务5', status: 'warning', combo: 'order-subsystem' },
        { id: 'order-node-6', label: '', description: '订单服务6', status: 'normal', combo: 'order-subsystem' },
        { id: 'order-node-7', label: '', description: '订单服务7', status: 'warning', combo: 'order-subsystem' },
        { id: 'order-node-8', label: '', description: '订单服务8', status: 'severe', combo: 'order-subsystem' }
    ],
    edges: [],
    combos: [
        // 主系统：电商系统1
        {
            id: 'ecommerce-system',
            label: '电商系统1',
            labelText: '电商系统1',
        },
        // 订单子系统（嵌套在主系统内）
        {
            id: 'order-subsystem',
            label: '订单子系统',
            labelText: '订单子系统',
            combo: 'ecommerce-system', // 属于电商系统
        }
    ],
};

const oriSize = {};
const nodes = data.nodes;

// 初始化节点大小
nodes.forEach((node) => {
    node.size = Math.random() * 20 + 12;
    oriSize[node.id] = node.size;
});

const container = document.getElementById('container');
const width = container.scrollWidth || window.innerWidth;
const height = container.scrollHeight || window.innerHeight;

const graph = new Graph({
    container: 'container',
    width: width,
    height: height,
    data,
    node: {
        style: {
            size: (d) => d.size,
            labelText: (d) => (d.size === 200 ? d.description : d.label),
            labelPlacement: 'middle',
            labelFill: '#fff',
            labelFontSize: 10,
            fill: (d) => statusColors[d.status] || statusColors.normal,
            stroke: (d) => statusColors[d.status] || statusColors.normal,
            lineWidth: 1,
        },
    },
    combo: {
        type: 'circle',
        style: {
            fill: 'rgba(100, 100, 100, 0.15)',
            stroke: 'rgba(200, 200, 200, 0.8)',
            lineWidth: 2,
            labelText: (d) => d.labelText || d.label || '',
            labelPlacement: 'top',
            labelFill: '#fff',
            labelFontSize: 14,
        },
        padding: 30,
    },
    layout: {
        type: 'd3-force',
        collide: {
            radius: (d) => d.size / 2,
            strength: 0.7,
        },
        manyBody: {
            strength: 30,
        },
    },
    behaviors: ['drag-element-force', 'collapse-expand', 'drag-element'],
});

graph.on(NodeEvent.CLICK, async (e) => {
    const nodeId = e.target.id;
    const nodeData = graph.getNodeData(nodeId);
    if (nodeData && oriSize[nodeId] !== undefined) {
        const size = nodeData.size === oriSize[nodeId] ? 200 : oriSize[nodeId];
        graph.updateNodeData([{ id: nodeId, size }]);
        await graph.layout();
    }
});

graph.render();

