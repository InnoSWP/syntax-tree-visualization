Back: [Index](Index.md)

# Using Docker for development

## Some notes

You don't need to know anything about Docker to use it. Just use the instructions below.

Root directory of the project is mounted to the container, so your changes will affect application in it.

**Important:** sometimes web application does not respond to changes in files, if this happens simply restart the container.

## Instructions

### Installation

Firstly, you need to install [Docker Desktop](https://www.docker.com/products/docker-desktop/) application and make sure that it is running.

Pull our dev image from the DockerHub
```sh
docker pull skril/devast:latest
```

### Running container

Run docker container:
```sh
docker run -p 8080:8080 -d --rm --name devast --mount src=/path/to/syntax-tree-visualization,dst=/app,type=bind skril/devast
```

**Important:** change "path/to/syntax-tree-visualization" to the root directory of the project

Alternatively on UNIX operating systems:

```sh
docker run -p 8080:8080 -d --rm --name devast --mount src=$(pwd),dst=/app,type=bind skril/devast
```

**Important:** make sure that you are in the directory of the project

### Stopping container

Stop docker container(it will be automatically deleted)
```sh
docker stop devast
```