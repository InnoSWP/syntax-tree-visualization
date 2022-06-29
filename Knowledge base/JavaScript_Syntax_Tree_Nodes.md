# Node types in JavaScript

## Known bugs

- [ ] Fix "%" symbols
- [ ] Fix "1 & 2" that gives "1"
- [ ] Fix "a = 1 % 2" that gives "a%20=%201%20%%202"
- [ ] Fix "a = 1 + 2" that gives "a = 1 2"

## Operators

### Unary operators

[Source](https://www.digitalocean.com/community/tutorials/javascript-unary-operators-simple-and-useful)

Node name "unary_expression" change to "Unary operation"\
Node meta information "Operator '\<operator\>'"
- [ ] !
- [ ] -
- [ ] +
- [ ] ~
- [ ] typeof
- [ ] delete
- [ ] void

Node name "update_expression" change to "Unary operation"\
Node meta information "Update operator '\<operator\>'"
- [ ] ++
- [ ] --

Node name "spread_element" change to "Unary operation"\
Node meta information "Spread element operator '\<operator\>'"
- [ ] ... 

### Binary operators

Node name "binary_expression" change to "Binary operation"\
Node meta information "Operator '\<operator\>'"
- [ ] !=
- [ ] !==
- [ ] %
- [ ] %=
- [ ] &
- [ ] &&
- [ ] -
- [ ] /
- [ ] <
- [ ] <<
- [ ] <=
- [ ] ==
- [ ] ===
- [ ] >
- [ ] >=
- [ ] >>
- [ ] >>>
- [ ] ??
- [ ] \*
- [ ] \*\*
- [ ] ^
- [ ] |
- [ ] ||

Node name "sequence_expression", change to "Binary operation"\
Node meta information "Sequence operator ','"
- [ ] ,

## Member expression

Node name "member_expression", change to "Binary operation"\
Node meta information "Member operator '\<operator\>'"
- [ ] . 
- [ ] ?. 

## Assignment

Node name "augmented_assignment_expression", change to "Assignment"\
Node meta information "Augmented assignment operator '\<operator\>'"
- [ ] &&=
- [ ] &=
- [ ] +
- [ ] +=
- [ ] -=
- [ ] /=
- [ ] <<=
- [ ] >>=
- [ ] >>>=
- [ ] ??=
- [ ] \*=
- [ ] \*\*=
- [ ] ^=
- [ ] |=
- [ ] ||=

Node name "pair" change to "Assignment operation"\
Node meta information "Assignment pair operator ':'"
- [ ] : 

Node name "assignment_expression" change to "Assignment"\
Node meta information "Assignment operator '='"
"=",

## Brackets, quotes and so on for removal

Node name "string" change to "String"\
Node meta information ""
- [ ] '
- [ ] "

Node name "template_string" change to "String"\
Node meta information ""
- [ ] \`

Node name "parenthesized_expression" remove this node and move all children up
- [ ] \(
- [ ] \)

Node name "array" change to "String"\
Node meta information "Elements: \<elements\>"
- [ ] \[
- [ ] \]

Remove nodes with these names
- [ ] \{
- [ ] \}
- [ ] ;


---

# Unsorted elements

## Functions

Node name "arrow_function" change to "Function"\
Node meta information "Arrow function"
"=>",

# Other

"${", -- template literal (code inside strings)
"?", -- Used in ternary expressions

# Constructs


"array", -- Move all the elements of the array to the metadata so for [1,2,3] json has "text" : "Elements: [1,2,3]"
"import_statement" remove other import related things and put text so for import component from "component" "text" is this string
- "import",
- "import_clause",
- "import_specifier",
	- "as",

"function_declaration",
- "function", remove
- "async", - add to metadata of function

"await_expression",
- "await", - remove keyword



"@", - decorator [Source](https://www.sitepoint.com/javascript-decorators-what-they-are/)
"arguments", - ???
"array_pattern", - ???
"assignment_pattern",
"break",
"break_statement",
"call_expression",
"case",
"catch",
"catch_clause",
"class",
"class_body",
"class_declaration",
"class_heritage",
"comment",
"computed_property_name",
"const",
"continue",
"continue_statement",
"debugger",
"debugger_statement",
"declaration",
"decorator",
"default",
"delete",
"do",
"do_statement",
"else",
"else_clause",
"empty_statement",
"escape_sequence",
"export",
"export_clause",
"export_specifier",
"export_statement",
"expression",
"expression_statement",
"extends",
"false",
"field_definition",
"finally",
"finally_clause",
"for",
"for_in_statement",
"for_statement",
"formal_parameters",
"from",
"generator_function",
"generator_function_declaration",
"get",
"hash_bang_line",
"identifier",
"if",
"if_statement",
"in",
"instanceof",
"jsx_attribute",
"jsx_closing_element",
"jsx_element",
"jsx_expression",
"jsx_fragment",
"jsx_namespace_name",
"jsx_opening_element",
"jsx_self_closing_element",
"jsx_text",
"labeled_statement",
"let",
"lexical_declaration",
"meta_property",
"method_definition",
"named_imports",
"namespace_export",
"namespace_import",
"nested_identifier",
"new",
"new_expression",
"null",
"number",
"object",
"object_assignment_pattern",
"object_pattern",
"of",
"pair_pattern",
"parenthesized_expression",
"pattern",
"primary_expression",
"private_property_identifier",
"program",
"property_identifier",
"regex",
"regex_flags",
"regex_pattern",
"rest_pattern",
"return",
"return_statement",
"set",
"shorthand_property_identifier",
"shorthand_property_identifier_pattern",
"statement",
"statement_block",
"statement_identifier",
"static",
"string_fragment",
"subscript_expression",
"super",
"switch",
"switch_body",
"switch_case",
"switch_default",
"switch_statement",
"target",
"template_string",
"template_substitution",
"ternary_expression",
"this",
"throw",
"throw_statement",
"true",
"try",
"try_statement",
"typeof",
"undefined",
"var",
"variable_declaration",
"variable_declarator",
"void",
"while",
"while_statement",
"with",
"with_statement",
"yield",
"yield_expression",

