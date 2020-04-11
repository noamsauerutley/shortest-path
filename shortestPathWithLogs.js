let graph = {
	start: { A: 5, B: 2 },
	A: { start: 1, C: 4, D: 2 },
	B: { A: 8, D: 7 },
	C: { D: 6, end: 3 },
	D: { end: 1 },
	end: {},
};

let shortestDistanceNode = (distances, visited) => {
	let shortest = null;

	for (let node in distances) {
		let currentIsShortest =
			shortest === null || distances[node] < distances[shortest];
		if (currentIsShortest && !visited.includes(node)) {
			shortest = node;
		}
	}
	return shortest;
};

// function that returns the minimum distance and path to reach the end
let findShortestPath = (graph, startNode, endNode) => {
	// track the shortest distance to reach each node
	let distances = {};
	distances[endNode] = "Infinity";
	distances = Object.assign(distances, graph[startNode]);

	// track paths
	let parents = { endNode: null };
	for (let child in graph[startNode]) {
		parents[child] = startNode;
	}

	// track nodes that have already been visited
	let visited = [];

	let node = shortestDistanceNode(distances, visited);

	while (node) {
		let distance = distances[node];
		let children = graph[node];
		for (let n in children) {
			if (String(n) === String(startNode)) {
				console.log("don't return to the start node! 🙅");
			} else {
				console.log("startNode: " + startNode);
				console.log("distance from node " + n + " to node " + node + ")");
				console.log("previous distance: " + distances[n]);
				let newdistance = distance + children[n];
				console.log("new distance: " + newdistance);
				if (!distances[n] || distances[n] > newdistance) {
					distances[n] = newdistance;
					parents[n] = node;
					console.log("distance + parents updated");
				} else {
					console.log("a shorter path already exists");
				}
			}
		}
		visited.push(node);
		node = shortestDistanceNode(distances, visited);
	}

	let shortestPath = [endNode];
	let parent = parents[endNode];
	while (parent) {
		shortestPath.push(parent);
		parent = parents[parent];
	}
	shortestPath.reverse();

	let results = {
		distance: distances[endNode],
		path: shortestPath,
	};

	return results;
};

//console.log(findShortestPath(graph, "start", "end"));
//console.log(findShortestPath(graph, "A", "B"));
//console.log(findShortestPath(graph, "A", "start"));
