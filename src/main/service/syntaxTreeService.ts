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
        "as",
        "new",
        "await",
        "class",
        "return",
        "import",
        "class_body",
        "import_clause",
        "import_specifier",

        "variable_declarator",
        "function",
        "statement_block",
        "return_statement",
        "formal_parameters",
        "arguments",
        "parenthesized_expression",
        "expression_statement",
    ];
    #metaTypes = {
        unary_expression:[
            (arr:any, ind:number) => ind===0,
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Unary operator: ${node.child(ind)!.text}`);
            }
        ],
        update_expression:[
            (arr:any, ind:number) => arr[ind].text==="++"||arr[ind].text==="--",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Update operator: ${node.child(ind)!.text}`);
            }
        ],
        spread_element:[
            (arr:any, ind:number) => arr[ind].text==="...",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Spread operator: ${node.child(ind)!.text}`);
            }
        ],
        binary_expression:[
            (arr:any, ind:number) => ind===1,
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Binary operator: ${node.child(ind)!.text}`);
            }
        ],
        sequence_expression:[
            (arr:any, ind:number) => arr[ind].text===",",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Sequence operator: ${node.child(ind)!.text}`);
            }
        ],
        member_expression:[
            (arr:any, ind:number) => arr[ind].text==="." || arr[ind].text==="?.",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Member operator: ${node.child(ind)!.text}`);
            }
        ],
        augmented_assignment_expression:[
            (arr:any, ind:number) => ind===1,
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Augmented assignment operator: ${node.child(ind)!.text}`);
            }
        ],
        pair:[
            (arr:any, ind:number) => arr[ind].text===":",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Pair operator: ${node.child(ind)!.text}`);
            }
        ],
        assignment_expression:[
            (arr:any, ind:number) => arr[ind].text==="=",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Assignment operator: ${node.child(ind)!.text}`);
            }
        ],
        //array:(arr:any, ind:number) => arr[ind].text!=="[" && arr[ind].text!=="]",
        arrow_function:[
            (arr:any, ind:number) => arr[ind].text==="=>",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Arrow function operator: ${node.child(ind)!.text}`);
            }
        ],
        ternary_expression:[
            (arr:any, ind:number) => arr[ind].text==="?",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Ternary operator: ${node.child(ind)!.text}`);
            }
        ],
        template_substitution:[
            (arr:any, ind:number) => arr[ind].text==="${",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Template operator: ${node.child(ind)!.text}`);
            }
        ],

        variable_declarator:[
            (arr:any, ind:number) => arr[ind].text==="=" || arr[ind].type==="identifier",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                if(node.child(ind)!.type === "identifier")
                    tree.meta.push(`Name: ${node.child(ind)!.text}`);
                else
                    tree.meta.push(`Variable declarator operator: ${node.child(ind)!.text}`);
            }
        ],
        function_declaration:[
            (arr:any, ind:number) => arr[ind].type==="identifier",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                if(tree.meta.length == 0){
                        tree.meta.push(`Name: ${node.child(ind)!.text}`);
                } else{
                    tree.meta.push(`Arg: ${node.child(ind)!.text}`);
                }
            }
        ],
        formal_parameters:[
            (arr:any, ind:number) => arr[ind].type==="identifier",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Par: ${node.child(ind)!.text}`);
            }
        ],
        call_expression:[
            (arr:any, ind:number) => arr[ind].type==="identifier",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Called: ${node.child(ind)!.text}`);
            }
        ],
        class_declaration:[
            (arr:any, ind:number) => arr[ind].type==="identifier",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Name: ${node.child(ind)!.text}`);
            }
        ],
        method_definition:[
            (arr:any, ind:number) => arr[ind].type==="property_identifier",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Name: ${node.child(ind)!.text}`);
            }
        ],
        lexical_declaration:[
            (arr:any, ind:number) => arr[ind].type==="let" || arr[ind].type==="identifier",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Keyword: ${node.child(ind)!.text}`);
            }
        ],
        new_expression:[
            (arr:any, ind:number) => arr[ind].type==="identifier",
            (tree:any, node:Parser.SyntaxNode, ind:number) => {
                tree.meta.push(`Name: ${node.child(ind)!.text}`);
            }
        ]
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
        // console.log(JSON.stringify(tree));
        //console.log(JSON.stringify(arr));

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
            type:node.type, position:{start: node.startPosition, end: node.endPosition}, meta:[]});

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
    #addMeta(tree:any, arr:any, node:Parser.SyntaxNode, ind:number):boolean {
        let type:string = node.type;
        // @ts-ignore
        if(this.#metaTypes.hasOwnProperty(type) && this.#metaTypes[`${type}`][0](node.children, ind)){
            // @ts-ignore
            this.#metaTypes[`${type}`][1](tree, node, ind);
            arr[arr.length-1].meta = tree.meta;
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
            
            let meta:boolean = this.#addMeta(tree, arr, node, i);
            if(!this.#badTypes.includes(node.child(i)!.type)){
                if(!meta){
                    ++this.#ind;
                    tree.children.push({});
                    this.#dfsTree(node.child(i)!, arr, tree.children[childCount++], depth + 1);
                }
            }
            else{
                this.#dfsTree(node.child(i)!, arr, tree, depth, childCount);
                childCount = tree.children.length;
            }
        }
    }
}

export const syntaxTreeService = new SyntaxTreeService()
