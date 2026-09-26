class Node{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class chessGraph{
    constructor(){ //x y pair from 8 * 8 tile set [0,0] ... [7, 7]
        this.vertex = []; 
        this.adjList = {};
    }

    makeVertex(){
        const index = 7;
        let vertArr = [];
       
        for(let i = 0; i <= index; i++){
            for(let j = 0; j <= index; j++){
                vertArr.push([i, j]);
            }            
        }
        this.vertex = vertArr;
    }

    addVertex(){//already callbacks makeVertex() to create tile nodes
        this.makeVertex();
        const vertArr = this.vertex;

        vertArr.forEach((ver) => {
            this.adjList[ver] = [];
        })
        return this.adjList  
    }

    addEdge(ver1, ver2){
        this.adjList[ver1].push(ver2);
        // this.adjList[ver2].push(ver1);
            
        //for tiles with four directions
        // adjList[currTile].push[nextTile];
        // adjList[nextTile].push[currTile]; <--- using backwards tiles
        //uncommenting second push line, since the pairs/neighbors of each vertex includes the backwards vertices, making it function the same as pushing to the previous vertex
        //using the second line duplicates neighbor list of each vertex;
    }

            makePairs(arr){

                let pairArr = [];
                let x = arr[0];
                let y = arr[1];
                         
                    pairArr.push([x, y+1]); //up
                    pairArr.push([x+1, y]); //right
                    pairArr.push([x, y-1]); //bottom
                    pairArr.push([x-1, y]); //left
                    
              
                let filX = pairArr.filter((value) => 
                    value[0] >= 0 && value[0] <=7
                );

                let filY = filX.filter((value) => 
                    value[1] >= 0 && value[1] <=7
                );
               return filY;
            }
           

    makeEdge(){
        const adjVert = this.vertex;
    
        for(let i = 0;i < adjVert.length; i++){
            let getPairs = this.makePairs(adjVert[i]);
            
            for(const pair in getPairs){
           
                this.addEdge(adjVert[i], getPairs[pair])              
            }
        } 
    }

    printGraph(){
        // console.log(this.adjList[0,1])
        console.log(this.vertex)
        this.addVertex();
        this.makeEdge();
        
        for(const vertex in this.adjList){
       
            console.log(`${vertex} -> ${this.adjList[vertex].join(', ')}`)       
        }       
    }
}

const board = new chessGraph();
console.log(board)
board.printGraph();


//break
