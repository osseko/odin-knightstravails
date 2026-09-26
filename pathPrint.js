// JavaScript Program to print all paths
// from source to destination

function dfs(src, dest, graph, path, allPaths){
    
    // Add the current vertex to the path
    // path.push(src);
    path = [src]
    // Store the path when destination is reached
    if (src[0] === dest[0] && src[1] === dest) {
        allPaths.push([...path ]);
    }
    else {
        for (let adjNode of graph[src]) {
            dfs(adjNode, dest, graph, path, allPaths);
        }
    }
    console.log("graph", graph)
    // remove the current vertex from the path
    path.pop();
}

function findPaths(v, edges, src, dest){
    let graph = Array.from({length : v}, () => []);


    for (let edge of edges) {

        graph[edge[0]].push(edge[1]);
    }

    let allPaths = [];
    let path = [];

    dfs(src, dest, graph, path, allPaths);

    return allPaths;
}

// Driver Code
const edges =
    [ [ 0, 3 ], [ 0, 1 ], [ 1, 3 ], [ 2, 0 ], [ 2, 1 ] ];

const edges2 =
    [ [ [0,1], [0,3] ], [ [0,1], [0,2] ], [ [1,1], [0,2] ], [ [2,2], [0,3] ], [ [0,3], [1,3] ] ]
const src = 2;
const src2 = [0,1];
const dest = 3;
const dest2 = [1,3];
const v = 5;

const paths = findPaths(v, edges2, src2, dest2);
console.log(paths)
// for (const path of paths) {
//     console.log(path.join(" "));
// }


//break