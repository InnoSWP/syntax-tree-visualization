import Parser from 'tree-sitter'
//@ts-ignore
import JavaScript from 'tree-sitter-javascript'

let parser = new Parser()
parser.setLanguage(JavaScript)

export class SyntaxTreeService {
    #ind = 0;
    #code = ""
    #tree = undefined
    #array = undefined

    getTreeFrom(code: string) {
        if (code == this.#code)
            return this.#tree
        this.#generate(code)
        return this.#tree
    }

    getArrayFrom(code: string) {
        if (code == this.#code)
            return this.#array
        this.#generate(code)
        return this.#array
    }

    #generate(code: string) {
        let tree = parser.parse(code);
        let node = tree.rootNode
        let ans = this.#getTree(node)
        this.#code = code
        // @ts-ignore
        this.#tree = ans.tree
        this.#array = ans.arr
    }

    #getTree(node: Parser.SyntaxNode) {
        let tree = {};
        let arr: any = [];
        this.#ind = 0;

        this.#dfsTree(node, arr, tree);
        this.#fillZeroes(arr);

        return {tree, arr};
    }
    #fillZeroes(arr:any) {
        let n = arr.length;
        let len = arr[n-1].cur_arr.length;
        for(let i = 0; i < n; ++i) {
            for(let j = arr[i].cur_arr.length; j < len; ++j)
                arr[i].cur_arr.push(0);
        }
    }
    #dfsTree(node: Parser.SyntaxNode, arr: any, tree: any, depth = 0) {
        if (node == null || node.isMissing())
            return;
        tree.type = node.type;
        tree.text = node.text;
        tree.position = {start: node.startPosition, end: node.endPosition};
        tree.children = [];
        arr.push({cur_arr:[], text:node.text, type:node.type});
        let i = 0, prevCount = (this.#ind > 0)? arr[this.#ind - 1].cur_arr.length: 0;

        while (i < Math.max(depth + 1, prevCount)) {
            if (i < prevCount)
                arr[this.#ind].cur_arr.push(arr[this.#ind - 1].cur_arr[i]);
            else
                arr[this.#ind].cur_arr[i] = 0;
            if (depth == i)
                arr[this.#ind].cur_arr[i]++;
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