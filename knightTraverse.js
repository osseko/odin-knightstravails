class KnightGraph{
    constructor(){
        this.vertex = [];
        this.neighbors = [];
        this.adjacentList = {}; 
        this.loose = [];
    }

    //ogp = original point, dst = destination
    vertCase(ogp, dst){
        let x = Math.abs(ogp[0] -  dst[0])
        let y = Math.abs(ogp[1] -  dst[1])

        let result;
        
        if(x === 1 && y ===1){
            result = this.retreatVerts(ogp, dst)
        } else {
            result = this.findVertex(ogp, dst)
        }
    
        return result;
    }
    
    findVertex(ogp, dst){
   
        let pathVerts = [];

        if(ogp[0] < dst[0] && ogp[1] < dst[1]){
            pathVerts.push([ogp[0] + 1, ogp[1] + 2]);
            pathVerts.push([ogp[0] + 2, ogp[1] + 1])
        }

        if(ogp[0] < dst[0] && ogp[1] > dst[1]){
            pathVerts.push([ogp[0] + 2, ogp[1] - 1]);
            pathVerts.push([ogp[0] + 1, ogp[1] - 2])
        }

        if(ogp[0] > dst[0] && ogp[1] > dst[1]){
            pathVerts.push([ogp[0] - 2, ogp[1] - 1]);
            pathVerts.push([ogp[0] - 1, ogp[1] - 2])
        }

        if(ogp[0] > dst[0] && ogp[1] < dst[1]){
            pathVerts.push([ogp[0] - 2, ogp[1] + 1]);
            pathVerts.push([ogp[0] - 1, ogp[1] + 2])
        }

        if(ogp[0] === dst[0] && ogp[1] > dst[1]){
            pathVerts.push([ogp[0] - 2, ogp[1] - 1]);
            pathVerts.push([ogp[0] + 2, ogp[1] - 1])
        }

        if(ogp[0] === dst[0] && ogp[1] < dst[1]){
            pathVerts.push([ogp[0] + 2, ogp[1] + 1]);
            pathVerts.push([ogp[0] - 2, ogp[1] + 1])
        }

        if(ogp[0] > dst[0] && ogp[1] === dst[1]){
            pathVerts.push([ogp[0] - 1, ogp[1] + 2]);
            pathVerts.push([ogp[0] - 1, ogp[1] - 2])
        }

        if(ogp[0] < dst[0] && ogp[1] === dst[1]){
            pathVerts.push([ogp[0] + 1, ogp[1] + 2]);
            pathVerts.push([ogp[0] + 1, ogp[1] - 2])
        }

        if(ogp[0] === dst[0] && ogp[1] === dst[1]){
            return pathVerts;
        }

        return pathVerts;     
    }

    retreatVerts(ogp, dst){
      
        let retVerts = [];

        if(ogp[0] < dst[0] && ogp[1] === dst[1]){
            retVerts.push([ogp[0] -2, ogp[1] + 1]);
            retVerts.push([ogp[0] -2, ogp[1] + 1]);
            retVerts.push([ogp[0] +1, ogp[1] + 2]);
            retVerts.push([ogp[0] +1, ogp[1] - 2]);
        }

        if(ogp[0] < dst[0] && ogp[1] > dst[1]){
            retVerts.push([ogp[0] +2, ogp[1] + 1]);
            retVerts.push([ogp[0] -1, ogp[1] - 2])
        }

        if(ogp[0] === dst[0] && ogp[1] > dst[1]){
            retVerts.push([ogp[0] -1, ogp[1] + 2]);
            retVerts.push([ogp[0] +1, ogp[1] + 2])
        }

        if(ogp[0] > dst[0] && ogp[1] > dst[1]){
            retVerts.push([ogp[0] +1, ogp[1] - 2]);
            retVerts.push([ogp[0] -2, ogp[1] + 1])
        }

        if(ogp[0] > dst[0] && ogp[1] === dst[1]){
            retVerts.push([ogp[0] +2, ogp[1] + 1]);
            retVerts.push([ogp[0] +2, ogp[1] - 1]);
            retVerts.push([ogp[0] -1, ogp[1] + 2]);
            retVerts.push([ogp[0] -1, ogp[1] - 2]);
        }

        if(ogp[0] > dst[0] && ogp[1] < dst[1]){
            retVerts.push([ogp[0] -2, ogp[1] - 1]);
            retVerts.push([ogp[0] +1, ogp[1] + 2])
        }

        if(ogp[0] === dst[0] && ogp[1] < dst[1]){
            retVerts.push([ogp[0] -1, ogp[1] - 2]);
            retVerts.push([ogp[0] -1, ogp[1] - 2])
        }

        return retVerts;

    }

    compareVertex(path, destination){
        if(path.length !== destination.length) return false;
        else{
            for(let i = 0; i < path.length; i++){
                if(path[0] === destination[0] &&
                    path[1] === destination[1]){
                    return true
                }
            }
            return false;
        }
    }

    findDup(arr, bArr){
        let x = [];
        
        for(let i = 0; i < bArr.length; i++){
                if(arr[0] === bArr[i][0] &&
                arr[1] === bArr[i][1]){
                    x.push(1);
                } else {
                    x.push(0)
                }
        }

        if(x.includes(1)){
            return true;
        }else {
            return false;
        } 
    }

    findTrail(ogp, dst){ 
        let tempArr = [];
        let storePair = [];
        let foundVerts = [];
        let pointReached;
        let pointCheck = []
        let index = 0;
        foundVerts.push(ogp);
        tempArr = this.vertCase(ogp, dst);
        tempArr.forEach((pair) => foundVerts.push(pair))
     
        while(!pointCheck.includes(true)){
            pointCheck = []   
            tempArr.forEach((pair) => storePair.push(this.findVertex(pair, dst)))
            tempArr = [];
            
            storePair.forEach((verts) => {
                for(const point of verts){
                     if(point[0] >= 0 && point[0] <= 7 &&
                        point[1] >= 0 && point[1] <= 7){
                        tempArr.push(point);
                    } 
                }
            })
         
            tempArr.forEach((pair) => {
                    //removes duplicate
                let dupCheck = this.findDup(pair, foundVerts);
                if(dupCheck === false){
                    foundVerts.push(pair);
                }
                    
                pointReached = this.compareVertex(pair, dst)
                pointCheck.push(pointReached);

            })
        
            storePair = []
            index++
        }

        //calls to trim excess vertices after destination is reached for the first time
        let cutOff; 
        for(let i = 0; i < foundVerts.length; i++){
            if(foundVerts[i][0] === dst[0] &&
                foundVerts[i][1] === dst[1]
            ){
                cutOff = i
                break;
            }
        }
        const knightPath = foundVerts.slice(0, cutOff+1);
     
        this.vertex = knightPath;

    }

    addVertex(ogp, dst){
        this.findTrail(ogp, dst);
        let index = 0;
        let vertPairs = this.vertex;
        vertPairs.forEach((pair) => {
            this.adjacentList[[pair]] = [];
            index++
        })
    }

    addEdge(vert1, vert2){
        this.adjacentList[vert1].push(vert2);
        // this.adjacentList[vert2].push(vert1);
            // /\ uncommenting to produce a directed graph;
    }

    makeEdge(){
           
        const verts = this.vertex;
       for(let i = 0; i < verts.length; i++){
     
        let v = this.findVertex(verts[i], verts[verts.length-1]);
       
        v.forEach((p) => {
            let has = this.findDup(p, verts)
      
                if(has === true){
                    this.addEdge(verts[i], p)
                }
            })
        } 
    }

    edgePairHlp(ver1, ver2){//creates array pairs from adjList
        let hlpArr = [ver1];

        hlpArr.push(ver2);
        return hlpArr;

    }

    edgePairsArr(){ //creates array pairs form adjList
     
        const adj = this.adjacentList;
        const vrt = this.vertex;
        const v = Object.keys(adj).length
        let adjEdge = [];
        let index = 0

        while(index < v){
            let node = vrt[index];
            let nextNode = adj[vrt[index]];
            let tempArr = [];
            tempArr.push(node);
            nextNode.forEach((pair) => {
                let nodePair = this.edgePairHlp(node, pair)
                adjEdge.push(nodePair)
            })
            index++
        }

        this.neighbors = adjEdge;
    }

    printGraph(){
        
        for(const vertex in this.adjacentList){
       
            console.log(`${vertex} -> ${this.adjacentList[vertex].join(', ')}`)       
        }       
    }  

    looseBranch(dst){ //finds loose branches that's not the destination
        const adjKey = this.adjacentList;
        const adjVerts = this.vertex
        adjVerts.forEach((x) => {
            if(adjKey[x].length === 0 && x[0] !== dst[0] && x[1] !== dst[1]){
                this.loose = (x);
            }
        })
    }

    removeLoose(dst){
        const adjList = this.adjacentList;
        const adjVert = this.vertex

        this.looseBranch(dst) //callback

        const lse = this.loose      
            function match(v1, v2){
                return (v1[0] === v2[0] && v1[1] === v2[1]);
            }
        adjVert.forEach((k) => {

            adjList[[k]].forEach((a) => {
                
                console.log(match(a, lse))

              
                if(a[0] === lse[0] && a[1] === lse[1]){
    
                    let tempfil = adjList[[k]].filter((x) => !match(x, lse))
                    console.log("temp", tempfil)
                    adjList[[k]] = [];
                    adjList[[k]] = tempfil;
                }               
            })  
        })
        delete adjList[lse]
    }

    makeList(ogp, dst){
        this.addVertex(ogp, dst);
        this.makeEdge();
        this.edgePairsArr();
        this.removeLoose(dst);
        this.printGraph();
    }

   
}

const depthFirstPath = function(graph, source){

    const stack = [source];
    let stored = [];
    let allPaths = [];

    while(stack.length > 0){

        const current = stack.pop();
        stored.push(current)

        if(graph[current].length === 0){
            allPaths.push([...stored]) 
  
            stored = []    
        }
        for(let neighbor of graph[current]){
            stack.push(neighbor); 
        }
  
    }
  
    return allPaths;
}

const dfsPrint = function(graph, source, dst){
    let path = [];
    let allPaths = [];
    let knightPath = [];

    let dfs = depthFirstPath(graph, source, dst);

    for(const pair of dfs){
        path.push(pair);
    }

    allPaths.push(path[0]);

    for(let i = 0; i < path.length-1; i++){  
        let A = allPaths[i].slice(0, allPaths[i].length - path[i+1].length)
            .concat(path[i+1]);

        allPaths.push(A)
    }
  
    for(const set of allPaths){
        if(set[set.length-1][0] === dst[0] && set[set.length-1][1] === dst[1]){
            knightPath.push(set);
        }
    }
   
   return knightPath;

}

const knightMoves = function(source, destination){
    let graph = new KnightGraph();
    graph.makeList(source, destination)
    let graphList = graph.adjacentList
 
    depthFirstPath(graphList, source, destination);

    const knight = dfsPrint(graphList, source, destination);

    console.log(` > KnightMoves([${source}], [${destination}]) `)
    console.log(knight)
    // knight.forEach((path) => {
    //     // console.log(path)
       
    //     console.log(` =>You made it in ${path.length} moves! Here's your path:`)
    //     for(const pair of path){
    //         console.log(` [${pair}] \n` )
    //     }
    // })
    
}

// knightMoves([0,0], [3,3])


// knightMoves([3,3], [0,0])


// knightMoves([7,7], [0,0])
knightMoves([6,7], [0,1])
//break