import Parser from 'tree-sitter'
//@ts-ignore
import JavaScript from 'tree-sitter-javascript'

let parser = new Parser()
parser.setLanguage(JavaScript)

export class SyntaxTreeService {
    #ind = 0;

    getTreeAndArrayFrom(code: string) {
        let tree = parser.parse(code);
        let node = tree.rootNode
        return this.#getTree(node)
    }

    #getTree(node: Parser.SyntaxNode) {
        let tree = {}
        let arr: any = [];
        this.#ind = 0;
        this.#dfsTree(node, arr, tree)
        return {tree, arr};
    }

    #dfsTree(node: Parser.SyntaxNode, arr: any, tree: any, depth = 0) {
        if (node == null || node.isMissing())
            return;
        tree.type = node.type;
        tree.text = node.text;
        tree.position = {start: node.startPosition, end: node.endPosition};
        tree.children = [];
        arr.push([]);
        let i = 0, prevCount = 0;
        if (this.#ind > 0) prevCount = arr[this.#ind - 1].length;

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