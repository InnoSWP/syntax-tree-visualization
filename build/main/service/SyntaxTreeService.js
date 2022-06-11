"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxTreeService = void 0;
const tree_sitter_1 = __importDefault(require("tree-sitter"));
// @ts-ignore
const tree_sitter_javascript_1 = __importDefault(require("tree-sitter-javascript"));
let parser = new tree_sitter_1.default();
parser.setLanguage(tree_sitter_javascript_1.default);
const sourceCode = 'let x = 1; console.log(x);';
const tree = parser.parse(sourceCode);
var ans;
let node = tree.rootNode;
// while (node != null) {
//     for()
// }
// @ts-ignore
// tree.rootNode.child(0).child(0).;
// @ts-ignore
// console.log(tree.rootNode);
dfs(node);
function dfs(node) {
    if (node == null || node.isMissing())
        return;
    console.log(node);
    for (let i = 0; i < node.childCount; ++i) {
        dfs(node.child(i));
    }
}
function bfs(node) {
    let queue = [node];
    while (queue.length != 0) {
        let cur = queue.shift();
        if (cur == null || cur.isMissing()) {
            continue;
        }
        console.log(cur);
        for (let i = 0; i < cur.childCount; ++i) {
            queue.push(cur.child(i));
        }
    }
}
// (program
//   (lexical_declaration
//     (variable_declarator (identifier) (number)))
//   (expression_statement
//     (call_expression
//       (member_expression (identifier) (property_identifier))
//       (arguments (identifier)))))
// @ts-ignore
// const callExpression = tree.rootNode.child(1).firstChild;
// console.log(callExpression);
// { type: 'call_expression',
//   startPosition: {row: 0, column: 16},
//   endPosition: {row: 0, column: 30},
//   startIndex: 0,
//   endIndex: 30 }
class SyntaxTreeService {
    getTreeFrom(code) {
    }
}
exports.SyntaxTreeService = SyntaxTreeService;
