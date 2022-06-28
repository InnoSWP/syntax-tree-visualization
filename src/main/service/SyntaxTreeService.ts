import Parser from 'tree-sitter'
//@ts-ignore
import JavaScript from 'tree-sitter-javascript'

let parser = new Parser()
parser.setLanguage(JavaScript)

export class SyntaxTreeService {
    #ind:number = 0;
    #code:string = ""
    #tree = undefined
    #array = undefined
    #badTypes:string[] = [
        "variable_declarator",
        ";",
        "(",
        ")",
        "{",
        "}",
        "function",
        "return",
        "statement_block",
        "return_statement",
        "formal_parameters",
        "arguments"
    ];

    addBadType(type:string) {
        this.#badTypes.push(type);
    }

    
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
        this.#tailElimination(arr);

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
    #tailElimination(arr:any){
        let len = arr.length-1;
        for(let i = len; i > 0; --i){
            for(let j = arr[i].cur_arr.length-1; j > 0; --j){
                // if(arr[i-1].cur_arr[j] == 0)
                //     return;
                if(arr[i].cur_arr[j] == arr[i-1].cur_arr[j])
                    arr[i].cur_arr[j] = 0;
                else
                    break;
            }
        }
    }
    #addArray(node: Parser.SyntaxNode, arr: any, depth:number) {
        let i = 0, prevCount = (this.#ind > 0)? arr[this.#ind - 1].cur_arr.length: 0;
        arr.push({cur_arr:[], text:node.text, type:node.type});

        while (i < Math.max(depth + 1, prevCount)) {
            if (i < prevCount)
                arr[this.#ind].cur_arr.push(arr[this.#ind - 1].cur_arr[i]);
            else
                arr[this.#ind].cur_arr[i] = 0;
            if (depth == i){
                arr[this.#ind].cur_arr[i]++;
            }
            ++i;
        }

    }
    #dfsTree(node: Parser.SyntaxNode, arr: any, tree: any, depth:number = 0, childCount = 0) {
        if (node == null || node.isMissing())
            return;
        
        if(!this.#badTypes.includes(node.type)){
            tree.type = node.type;
            tree.text = node.text;
            tree.position = {start: node.startPosition, end: node.endPosition};
            tree.children = [];
        }

        if(!this.#badTypes.includes(node.type))
            this.#addArray(node, arr, depth);

        for (let i = 0; i < node.childCount; ++i) {
            
            // @ts-ignore
            if(!this.#badTypes.includes(node.child(i).type)){
                ++this.#ind;
                tree.children.push({});
                // @ts-ignore
                this.#dfsTree(node.child(i), arr, tree.children[childCount++], depth + 1);
            }
            else{
                // tree.children.push({});
                // @ts-ignore
                this.#dfsTree(node.child(i), arr, tree, depth, childCount);
                childCount = tree.children.length;
            }
        }
    }
}