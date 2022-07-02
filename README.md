[![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)](https://www.typescriptlang.org/)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=InnoSWP_syntax-tree-visualization&metric=bugs)](https://sonarcloud.io/project/issues?resolved=false&types=BUG&id=InnoSWP_syntax-tree-visualization)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=InnoSWP_syntax-tree-visualization&metric=vulnerabilities)](https://sonarcloud.io/project/issues?resolved=false&types=VULNERABILITY&id=InnoSWP_syntax-tree-visualization)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=InnoSWP_syntax-tree-visualization&metric=code_smells)](https://sonarcloud.io/project/issues?resolved=false&types=CODE_SMELL&id=InnoSWP_syntax-tree-visualization)
[![Lint Code Base](https://github.com/InnoSWP/syntax-tree-visualization/actions/workflows/liner.yml/badge.svg)](https://github.com/InnoSWP/syntax-tree-visualization/actions/workflows/liner.yml)

<h1>
	<p align="center">
	🌳 Syntax Tree Visualizer 
	</p>
</h1>

Syntax Tree Visualizer provides **interactive environment** for exploration of
AST[^1] (abstract syntax tree) and SA[^2] (syntax array).

## Features

-   [x] Code editor with syntax checker
-   [x] AST representation that updates as you type
    -   [x] Additional information about node on hover
    -   [ ] Reworked AST builder from ST generated by tree-sitter [List of reworked node types](/Knowledge%20base/JavaScript_Syntax_Tree_Nodes.md)
-   [x] SA representation that updates as you type
-   [ ] Highlighting of corresponding elements
-   [ ] Sharing your projects with others
-   [ ] Exporting to various formats
    -   [ ] SVG
    -   [ ] [LaTeX](https://www.latex-project.org/)
    -   [ ] [GraphViz](https://graphviz.org/)

## Supported languages

-   [x] JavaScript

## Demo

TBD

## How to use

Simply type code in code editor and see how AST and SA change.
For more information refer to documentation on the website.

## Installation

### All in one Docker container

```sh
docker run -p 8080:8080 -d --rm --name devast skril/stv:1.0-full
```

### Development

### Local setup

These instructions will get you a copy of the project up and running on
your local machine for development and testing purposes.

```sh
git clone https://github.com/InnoSWP/syntax-tree-visualization
```

For running the project you need the following requirements:
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Git](https://git-scm.com/downloads)

On macOS using Homebrew:

```shell
brew install git node
npm install yarn
```
On Arch Linux:

```shell
pacman -Suy nodejs npm git
npm install yarn
```
git submodule init
git submodule update
```

#### Using docker

```sh
docker run -p 8080:8080 -d --rm --name devast --mount src=/path/to/syntax-tree-visualization,dst=/app,type=bind skril/devast:archlinux
```

**Important:** change "path/to/syntax-tree-visualization" to the root directory of the project

Alternatively on UNIX operating systems:

```sh
docker run -p 8080:8080 -d --rm --name devast --mount src=$(pwd),dst=/app,type=bind skril/devast:archlinux
```

#### Local setup

Requirements:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Git](https://git-scm.com/downloads)
- [arm-none-eabi-newlib](https://archlinux.org/packages/community/any/arm-none-eabi-newlib/)
- [GNU Make](https://www.gnu.org/software/make/)
- [GCC](https://gcc.gnu.org/)

**Install dependencies**
```shell
yarn
 ```
**Build project**

```shell
yarn build
```
**Start server without building it** on http://localhost:8080/
```shell
yarn start
```

## Contribution

Pull requests are welcome. For major changes, please open an
[issue](https://github.com/InnoSWP/syntax-tree-visualization/issues/new) first
to discuss what you would like to change.

## Notable used tools

- [Tree-sitter node](https://github.com/tree-sitter/node-tree-sitter)
- [Docker](https://www.docker.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Ace Editor](https://ace.c9.io/)

