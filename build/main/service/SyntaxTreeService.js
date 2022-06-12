"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxTreeService = void 0;
const tree_sitter_1 = __importDefault(require("tree-sitter"));
// @ts-ignore
const tree_sitter_javascript_1 = __importDefault(require("tree-sitter-javascript"));
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
class SyntaxTreeService {
    getTreeFrom(code) {
        let parser = new tree_sitter_1.default();
        parser.setLanguage(tree_sitter_javascript_1.default);
        const sourceCode = code; //'let x = 1; console.log(x);';
        const tree = parser.parse(sourceCode);
        var ans = "";
        let node = tree.rootNode;
        let arr = [];
        let ind = 0;
        dfs(node, arr);
        function dfs(node, arr, depth = 0) {
            if (node == null || node.isMissing())
                return;
            // console.log(node.text);
            ans += node.text;
            arr.push([]);
            let i = 0, prevCount = 0;
            if (ind > 0)
                prevCount = arr[ind - 1].length;
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
            ans += arr[ind];
            for (let i = 0; i < node.childCount; ++i) {
                ++ind;
                dfs(node.child(i), arr, depth + 1);
            }
        }
        return ans;
    }
}
exports.SyntaxTreeService = SyntaxTreeService;
