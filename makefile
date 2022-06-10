REPOSITORY :=""
run:
	docker run -p 8080:8080 -d --rm --name devast --mount src=$(REPOSITORY),dst=/app,type=bind skril/devast
