var SyntaxTreeService = require("../src/main/service/SyntaxTreeService.ts").SyntaxTreeService;

describe("AST builder", () => {
	test('console.log(1);', () => {
		var service = new SyntaxTreeService();
		var output: string = require("./ast_sum_functions.json");
		var code =
			`function sum(n){
					function sum2(x){
							return (x - n);
					}
				return sum2(sum(n-1));
				}`
		expect(service.getTreeFrom(code)).toBe(output);
	})
})
