import Parser from 'tree-sitter'
//@ts-ignore
import JavaScript from 'tree-sitter-javascript'

let parser = new Parser()
parser.setLanguage(JavaScript)

class SyntaxTreeService {
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
        "[",
        "]",
        "\'",
        "\"",
        ",",
        "`",
        "function",
        "return",
        "statement_block",
        "return_statement",
        "formal_parameters",
        "arguments",
        "parenthesized_expression",
        "import",
        "import_clause",
        "import_specifier",
        "as",
        
    ];
    #metaTypes = {
        unary_expression:(arr:any, ind:number) => ind===0,
        update_expression:(arr:any, ind:number) => arr[ind].text==="++"||arr[ind].text==="--",
        spread_element:(arr:any, ind:number) => arr[ind].text==="...",
        binary_expression:(arr:any, ind:number) => ind===1,
        sequence_expression:(arr:any, ind:number) => arr[ind].text===",",
        member_expression: (arr:any, ind:number) => arr[ind].text==="." || arr[ind].text==="?.",
        augmented_assignment_expression:(arr:any, ind:number) => ind===1,
        pair:(arr:any, ind:number) => arr[ind].text===":",
        assignment_expression:(arr:any, ind:number) => arr[ind].text==="=",
        //array:(arr:any, ind:number) => arr[ind].text!=="[" && arr[ind].text!=="]",
        arrow_function:(arr:any, ind:number) => arr[ind].text==="=>",
        ternary_expression:(arr:any, ind:number) => arr[ind].text==="?",

        template_substitution:(arr:any, ind:number) => arr[ind].text==="${",
        
        
    }

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
        console.log(JSON.stringify(tree));

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
                if(arr[i].cur_arr[j] == arr[i-1].cur_arr[j])
                    arr[i].cur_arr[j] = 0;
                else
                    break;
            }
        }
    }
    #addArrayRow(node: Parser.SyntaxNode, arr: any, depth:number) {
        let i = 0, prevCount = (this.#ind > 0)? arr[this.#ind - 1].cur_arr.length: 0;
        arr.push({cur_arr:[], text:node.text,
            type:node.type, position:{start: node.startPosition, end: node.endPosition}});

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
    #addNodeData(node:Parser.SyntaxNode, tree:any){
        tree.type = node.type;
        tree.text = node.text;
        tree.position = {start: node.startPosition, end: node.endPosition};
        tree.children = [];
        tree.meta = []
    }
    #addMeta(tree:any, node:Parser.SyntaxNode, ind:number):boolean {
        let type:string = node.type;
        // @ts-ignore
        if(this.#metaTypes.hasOwnProperty(type) && this.#metaTypes[`${type}`](node.children, ind)){
            // @ts-ignore
            tree.meta.push(node.child(ind).text);
            return true;
        }
        return false;
    }
    #dfsTree(node: Parser.SyntaxNode, arr: any, tree: any, depth:number = 0, childCount = 0) {
        if (node == null || node.isMissing())
            return;
        
        if(!this.#badTypes.includes(node.type)){
            this.#addNodeData(node, tree);
            this.#addArrayRow(node, arr, depth);
        }

        for (let i = 0; i < node.childCount; ++i) {
            
            let meta:boolean = this.#addMeta(tree, node, i);
            // @ts-ignore
            if(!this.#badTypes.includes(node.child(i).type)){
                

                if(!meta){
                    ++this.#ind;
                    tree.children.push({});
                    // @ts-ignore
                    this.#dfsTree(node.child(i), arr, tree.children[childCount++], depth + 1);
                }
            }
            else{
                // @ts-ignore
                this.#dfsTree(node.child(i), arr, tree, depth, childCount);
                childCount = tree.children.length;
            }
        }
    }
}

export const syntaxTreeService = new SyntaxTreeService()
