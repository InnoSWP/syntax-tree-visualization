import Parser from "tree-sitter"
// @ts-ignore
import JavaScript from "tree-sitter-javascript"
import {Tree} from 'main/model/Tree'

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


export class SyntaxTreeService {
    public getTreeFrom(code: string) {
        let parser = new Parser()
        parser.setLanguage(JavaScript)

        const sourceCode = code//'let x = 1; console.log(x);';
        const tree = parser.parse(sourceCode);
        var ansTree = ""
        var ansArray = ""
        let node: Parser.SyntaxNode | null = tree.rootNode


        let arr: number[][] = [];
        let ind = 0;
        dfs(node, arr);

        function dfs(node: Parser.SyntaxNode | null, arr: number[][],
                     depth: number = 0) {
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
            // console.log(arr[ind], depth);
            ansArray += '\n' + arr[ind]


            for (let i = 0; i < node.childCount; ++i) {
                ++ind;
                dfs(node.child(i), arr, depth + 1);
            }
        }

        return {ansTree, ansArray}
    }
}