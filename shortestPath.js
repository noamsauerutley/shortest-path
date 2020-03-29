
const graph = {
    start: {A: 5, B: 2},
    A: {start: 1, C: 4, D: 2},
    B: {A: 8, D: 7},
    C: {D: 6, finish: 3},
    D: {finish: 1},
    finish: {}
}


const closestNode = (lengths, mappedNodes) => {
    return Object.keys(lengths).reduce((lowest, node) => {
        if (lowest === null || lengths[node] < lengths[lowest]) {
            if (!mappedNodes.includes(node)) {
                lowest = node;
            }
        }
        return lowest
    }, null)
};

// function that returns the minimum length and path to reach Finish
const findShortestPath = (graph, startNode, endNode) => {

    // track the lowest length to reach each node
    let lengths = {}
    lengths[endNode] = "infinite"
    lengths = Object.assign(lengths, graph[startNode])

    // track paths
    const parents = {endNode: null}
    for (let child in graph[startNode]) {
        parents[child] = startNode
    }

    // track nodes that have already been mappedNodes
    const mappedNodes = []

    let node = closestNode(lengths, mappedNodes)

    while (node) {
        let length = lengths[node]
        let children = graph[node]
        for (let n in children) {
            if (String(n) === String(startNode)) {
            } else {
                let newlength = length + children[n]
                if (!lengths[n] || lengths[n] > newlength) {
                    lengths[n] = newlength
                    parents[n] = node
                }
            }
        }
        mappedNodes.push(node)
        node = closestNode(lengths, mappedNodes)
    }

    let bestPath = [endNode]
    let parent = parents[endNode]
    while (parent) {
        bestPath.push(parent)
        parent = parents[parent]
    }
    bestPath.reverse()

    const results = {
        distance: lengths[endNode],
        path: bestPath
    };

    return results
};

//console.log(findShortestPath(graph, "start", "finish"));
//console.log(findShortestPath(graph, "A", "B"));
//console.log(findShortestPath(graph, "A", "start"));

