//var Col =[];
/*Col.push([4,8,7,3]);
Col.push([2,5,9,3]);
Col.push([6,3,2,5]);
Col.push([4,4,1,6]);*/

//console.log(Col);
/*
Code Submitted Srinjoy Sengupta
Logic
Create Tree and find dept
Find leaf node by BFS
Print out put
contact : srinjoy1990@gmail.com
*/
process.stdin.resume();
process.stdin.setEncoding('utf8');

var Col =[];

var count = 0;
var row;
var coloumn;

process.stdin.on('data', function(chunk){

    
 //console.log(chunk);
 var r = chunk.split(' ');
    switch(count){
        case 0:
            if(r.length > 2){
                console.log('Invalid Input!');
                process.abort();
            }else{
                //console.log('Here!');
                coloumn=parseInt(r[0],10);
                row=parseInt(r[1],10);
                //console.log(row);
                count++;
                //console.log(count);
                }
            break;
    
        default:
            //console.log(row);
            //console.log(r.length);
            //console.log(coloumn);
            //console.log(count);
            
            if((count)>coloumn){
                console.log('Coloumn Count Exceeded!');
                console.log(Col);
                process.abort();
            }else if(r.length > row){
                console.log('Row Count Exceeded!');
                process.abort();
            }else{
                var n =[];
                r.forEach(function(items){
                n.push(parseInt(items,10));
                });
                if(Col.length <= coloumn){
                    Col.push(n);
                    if(Col.length === coloumn){
                     process.exit(0);
                    }
                }
                
                count++;
            }
           break; 
    
            
    }
        
 
});

process.on('exit', function() {
  _main();
});










function Element(data,x, y){
  this.data = data;
  this.north = [];
  this.south =[];
  this.east =[];
  this.west =[];
  this.parent = null;
  this.x = x;
  this.y = y;
  this.path = (function(data){
      var path =[];
      path.push(data);
      return path;
  })(this.data);
 this.response =[];
}

Element.prototype.breadthFirstSearch = function(){
    
    var tree = this;
    var queue=[];
    var res =[];
    var output = BFS(this);
    function BFS(elem){
        
        if(queue.length === 0 && elem === undefined){
            return 0;
        }else{
            
            if(elem.north.length !==0){
                queue.push(elem.north[0]);
            }
            
            if(elem.south.length !== 0){
                queue.push(elem.south[0]);
            }
            
            if(elem.east.length !== 0){
                queue.push(elem.east[0]);
            }
            
            if(elem.west.length !== 0){
                queue.push(elem.west[0]);
            }
            
            var _current = queue[0];
            //console.log(_current);
            tree.response.push(_current);
            //console.log('Element to be dequeued '+_current.data);
            //console.log('The response pushed +'+res.length);
            //console.log(res.length);
            queue.shift();
            
            //console.log('The queue  dequeued +'+queue.length);
            //console.log('+++++++++++++++++++++++++++++++++');
            BFS(_current);
            
        }
        
    }
    
    //console.log('The Output is '+output);
    
    //return output;
    
}

    



function findLongestPath(Element,path){
        //console.log('My Element!');
        //console.log(Element);
        if(Element === undefined){
            //implies leaf node
            return 0;
            
        }
        else {
            
            //TerminalNode = Element;
            var n = findLongestPath(Element.north[0]);
            var s = findLongestPath(Element.south[0]);
            var e = findLongestPath(Element.east[0]);
            var w = findLongestPath(Element.west[0]);
            
            var max = Math.max(n,s,e,w);
            //console.log('Max'+max);
            
            return (max+1);
            
        }
    
    
    
    //console.log('Extreme north leaf '+northleaf.data);
    //console.log('The path to the North '+path);
    
}



function Node(val,leaf_node,maxDepth){
    this.value =val;
    this.leaf_node = leaf_node;
    this.depth = maxDepth;
}

function createNorhSubTree(i, j, Array, element){
   var y=i;
   var x=j;
   var _current = element;
    if(y>0 && Array[y][j] > Array[y-1][j]){
        //console.log('Co Ordinate Values '+y+x);
        var createChild = new Element(Array[y-1][j],j,y-1);
        createChild.parent = _current;
        _current.north.push(createChild);
        _current = createChild;
        y--;
        createEastSubTree(y, j, Array, _current);
        createWestSubTree(y, j, Array, _current);
        createSouthSubTree(y, j, Array, _current);
        createNorhSubTree(y, j, Array, _current);
    }
    
}

function createSouthSubTree(i, j, Array, element){
   var y=i;
   var x=j;
   var _current = element;
    if(y<Array.length && Array[y+1] !== undefined && Array[y][j] > Array[y+1][j]){
        //console.log('Co Ordinate Values '+y+x);
        var createChild = new Element(Array[y+1][j],j,y+1);
        createChild.parent = _current;
        _current.south.push(createChild);
        _current = createChild;
        y++;
         //console.log('Array.length'+Array.length);
         //console.log('The Value of Y'+y);
        createEastSubTree(y, j, Array, _current);
        createWestSubTree(y, j, Array, _current);
        createNorhSubTree(y, j, Array, _current);
        createSouthSubTree(y, j, Array, _current);
        
        
    }
    
}

function createEastSubTree(i, j, Array, element){
   var y=i;
   var x=j;
   var _current = element;
    if(x>0 && Array[i][x] > Array[i][x-1]){
        //console.log('Co Ordinate Values '+y+x);
        var createChild = new Element(Array[i][x-1],x-1,i);
        createChild.parent = _current;
        _current.east.push(createChild);
        _current = createChild;
        x--;
        createSouthSubTree(i, x, Array, _current);
        createNorhSubTree(i, x, Array, _current);
        createWestSubTree(i, x, Array, _current);
        createEastSubTree(i, x, Array, _current);
    }
    
}

function createWestSubTree(i, j, Array, element){
   var y=i;
   var x=j;
   var _current = element;
    if(x<Array[i].length && Array[i][x+1] !== undefined && Array[i][x] > Array[i][x+1]){
        //console.log('Co Ordinate Values '+y+x);
        var createChild = new Element(Array[i][x+1],x+1,i);
        createChild.parent = _current;
        _current.west.push(createChild);
        _current = createChild;
        x++;
        //console.log('The Value of X'+x);
        createSouthSubTree(i, x, Array, _current);
        createNorhSubTree(i, x, Array, _current);
        createEastSubTree(i, x, Array, _current);    
        createWestSubTree(i, x, Array, _current);
        

    }
    
}

function _main(){
    
var finalArray =[];
var referencePoint;
var hop;
var drop=0;
var i =0;
//console.log('1,2 '+(getValuesByCordinates(1,2,Col)));
while(i<Col.length){
    var Row = Col[i];
    //i refers to coloumns j to rows
    for(var j=0; j<Row.length;j++){
     referencePoint = Col[i][j];
     //console.log(Col[i][j]);
     var el = new Element(referencePoint,j,i);
     createNorhSubTree(i,j, Col, el);
     createSouthSubTree(i,j, Col, el);
     createEastSubTree(i,j, Col, el);
     createWestSubTree(i,j, Col, el);
     //console.log(el);
     //_maxDepth(el);
    
    //path.push(el.data);
     var longestpath = findLongestPath(el);
     //console.log('The Longest Path '+longestpath);
     el.breadthFirstSearch();
     //console.log('BFS');
     el.response.pop();
     var val = el.response.length === 0? el.data:el.response[el.response.length-1].data;
     //console.log('Value of the farthest element '+val);
     var node = new Node(el.data,val,longestpath);
     finalArray.push(node);
    }
    i++;
}

var pathLengths = [];
var fall = [];
var diff =[];

finalArray.forEach(function(items){
    pathLengths.push(items.depth);
});

var max = (function(){
   return Math.max.apply(null,pathLengths); 
})();
console.log(max);

finalArray.forEach(function(items){
    if(items.depth === max){
        fall.push(items);
    }
});

if(fall.length === 1){
    console.log(Math.abs(fall[0].value - fall[0].leaf_node));
}else{
    fall.forEach(function(items){
        diff.push(Math.abs(items.value - items.leaf_node));
    });
    
    console.log(Math.abs(fall[diff.indexOf((function(){
   return Math.max.apply(null,diff); 
    })())].value -    fall[diff.indexOf((function(){
   return Math.max.apply(null,diff); 
    })())].leaf_node));
}
    
    
    
}






