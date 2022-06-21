<h1>
	<p align="center">
	Syntax Tree Visualizer
	</p>
</h1>

Syntax tree visualizer provides interactive environment for exploration
of AST[^1] (abstract
syntax tree) and SA[^2] (syntax array).

## Features

-   [x] Code editor with syntax checker
-   [ ] AST representation that updates as you type
    -   [ ] Additional information about node on hover
-   [ ] SA representation that updates as you type
-   [ ] Highlighting of corresponding elements
-   [ ] Sharing your projects with others
-   [ ] Exporting to various formats
    -   [ ] SVG
    -   [ ] [LaTeX](https://www.latex-project.org/)
    -   [ ] [GraphViz](https://graphviz.org/)

## Supported languages

-   [x] JavaScript

## Development

Following these instructions you will get you a copy of the project up
and running on your local machine for development and testing purposes.

**Clone the repo**

    git clone https://github.com/InnoSWP/syntax-tree-visualization

**Initiate and download all submodules**

```

git submodule init
git submodule update
```

### Using docker

    docker run -p 8080:8080 -d --rm --name devast --mount src=/path/to/syntax-tree-visualization,dst=/app,type=bind skril/devast:archlinux

**Important:** change "path/to/syntax-tree-visualization" to the root directory of the project

Alternatively on UNIX operating systems:

```sh
docker run -p 8080:8080 -d --rm --name devast --mount src=$(pwd),dst=/app,type=bind skril/devast:archlinux
```

### Local setup

Requirements:

-   [Node.js](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com/getting-started/install)
-   [Git](https://git-scm.com/downloads)

**Install dependencies**

```shell
yarn
```

**Start server without building it** on http://localhost:8080/

```shell
yarn start
```

## Links

[^1]: https://en.wikipedia.org/wiki/Abstract_syntax_tree
[^2]: https://dl.acm.org/doi/10.1145/2935323.2935331
