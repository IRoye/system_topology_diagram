const { Graph, NodeEvent } = G6;

const data = {
    nodes: [
        {
            id: '0',
            label: '0',
            value: 10,
            cluster: 'a',
            description: 'this is node 0, \nand the value of it is 10',
        },
        {
            id: '1',
            label: '1',
            value: 20,
            cluster: 'b',
            description: 'this is node 1, \nand the value of it is 20',
        },
        {
            id: '2',
            label: '2',
            value: 5,
            cluster: 'a',
            description: 'this is node 2, \nand the value of it is 5',
        },
        {
            id: '3',
            label: '3',
            value: 10,
            cluster: 'a',
            description: 'this is node 3, \nand the value of it is 10',
        },
        {
            id: '4',
            label: '4',
            value: 12,
            cluster: 'c',
            subCluster: 'sb',
            description: 'this is node 4, \nand the value of it is 12',
        },
        {
            id: '5',
            label: '5',
            value: 18,
            cluster: 'c',
            subCluster: 'sa',
            description: 'this is node 5, \nand the value of it is 18',
        },
        {
            id: '6',
            label: '6',
            value: 3,
            cluster: 'c',
            subCluster: 'sa',
            description: 'this is node 6, \nand the value of it is 3',
        },
        {
            id: '7',
            label: '7',
            value: 7,
            cluster: 'b',
            subCluster: 'sa',
            description: 'this is node 7, \nand the value of it is 7',
        },
        {
            id: '8',
            label: '8',
            value: 21,
            cluster: 'd',
            subCluster: 'sb',
            description: 'this is node 8, \nand the value of it is 21',
        },
        {
            id: '9',
            label: '9',
            value: 9,
            cluster: 'd',
            subCluster: 'sb',
            description: 'this is node 9, \nand the value of it is 9',
        },
    ],
    edges: [],
};

const oriSize = {};
const nodes = data.nodes;

// randomize the node size
nodes.forEach((node) => {
    node.size = Math.random() * 30 + 16;
    oriSize[node.id] = node.size;
    // 将所有节点添加到组合中，使用 combo 属性
    node.combo = 'main-combo';
});

// 添加圆形组合
data.combos = [
    {
        id: 'main-combo',
        label: '系统节点',
        labelText: '系统节点',
    },
];

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
            labelText: (d) => (d.size === 200 ? d.description : d.id),
            labelPlacement: 'middle',
            labelFill: '#fff',
        },
        palette: {
            field: (d) => d.cluster,
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
        padding: 20,
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
    const data = graph.getNodeData(nodeId);
    const size = data.size === oriSize[nodeId] ? 200 : oriSize[nodeId];
    graph.updateNodeData([{ id: nodeId, size }]);
    await graph.layout();
});

    graph.render();

// 响应窗口大小变化
    window.addEventListener('resize', () => {
    if (!graph.destroyed) {
        graph.changeSize(window.innerWidth, window.innerHeight);
    }
});
