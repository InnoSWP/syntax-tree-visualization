let Parser = require('./tree-sitter')
let JavaScript = require('./tree-sitter-javascript')
let parser = new Parser()
parser.setLanguage(JavaScript)

const sourceCode = 'let x = 1; console.log(x);';
const tree = parser.parse(sourceCode);
var ansTree = ""
var ansArray = ""
let node = tree.rootNode


let arr = [];
let ind = 0;
dfs(node, arr);

function dfs(node, arr,
             depth = 0) {
    if (node == null || node.isMissing())
        return;
    // console.log(node.text);
    ansTree += '\n' + node.text
    arr.push([]);
    let i = 0, prevCount = 0;
    if (ind > 0) prevCount = arr[ind - 1].length;

    while (i < Math.max(depth + 1, prevCount)) {
        if (i < prevCount)
            arr[ind].push(arr[ind - 1][i]);
        else
            arr[ind][i] = 0;
        if (depth == i)
            arr[ind][i]++;
        ++i;
    }

    for (let i = 0; i < node.childCount; ++i) {
        ++ind;
        dfs(node.child(i), arr, depth + 1);
    }
}

console.log(arr)
console.log(ansTree)
// return {ansTree, ansArray}



// function bfs(node: Parser.SyntaxNode | null) {
//     let queue = [node];
//     let arr = [[node]];
//     while (queue.length != 0) {
//         let cur = queue.shift();
//         if (cur == null || cur.isMissing()) {
//             continue;
//         }
//
//         for (let i = 0; i < cur.childCount; ++i) {
//             queue.push(cur.child(i));
//         }
//     }
//     return arr;
// }

//
// class SyntaxTreeService {
//     public getTreeFrom(code: string) {
//
//     }
// }