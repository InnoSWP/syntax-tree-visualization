"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxTreeService = void 0;
const tree_sitter_1 = __importDefault(require("tree-sitter"));
//@ts-ignore
const tree_sitter_javascript_1 = __importDefault(require("tree-sitter-javascript"));
let parser = new tree_sitter_1.default();
parser.setLanguage(tree_sitter_javascript_1.default);
class SyntaxTreeService {
    #ind = 0;
    getTreeAndArrayFrom(code) {
        let tree = parser.parse(code);
        let node = tree.rootNode;
        return this.#getTree(node);
    }
    #getTree(node) {
        let tree = {};
        let arr = [];
        this.#ind = 0;
        this.#dfsTree(node, arr, tree);
        return { tree, arr };
    }
    #dfsTree(node, arr, tree, depth = 0) {
        if (node == null || node.isMissing())
            return;
        tree.type = node.type;
        tree.text = node.text;
        tree.position = { start: node.startPosition, end: node.endPosition };
        tree.children = [];
        arr.push([]);
        let i = 0, prevCount = 0;
        if (this.#ind > 0)
            prevCount = arr[this.#ind - 1].length;
        while (i < Math.max(depth + 1, prevCount)) {
            if (i < prevCount)
                arr[this.#ind].push(arr[this.#ind - 1][i]);
            else
                arr[this.#ind][i] = 0;
            if (depth == i)
                arr[this.#ind][i]++;
            ++i;
        }
        for (let i = 0; i < node.childCount; ++i) {
            ++this.#ind;
            tree.children.push({});
            // @ts-ignore
            this.#dfsTree(node.child(i), arr, tree.children[i], depth + 1);
        }
    }
}
exports.SyntaxTreeService = SyntaxTreeService;
