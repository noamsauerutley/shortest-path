const findShortestPath = require('../shortestPath');

const graph = {
	start: { A: 5, B: 2 },
	A: { start: 1, C: 4, D: 2 },
	B: { A: 8, D: 7 },
	C: { D: 6, end: 3 },
	D: { end: 1 },
	end: {},
};

test(`shortest path from 'start' to 'end' should be 8 with start-A-D-end`, () => {
  const shortestPath = findShortestPath(graph, 'start', 'end');
  expect(shortestPath).toEqual({
    distance: 8,
    path: ['start', 'A', 'D', 'end'],
  });
});
