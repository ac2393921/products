NETWORK_NAME = blog-network

up:
	@if [ -z "`docker network ls | grep $(NETWORK_NAME)`" ]; then docker network create --gateway 172.26.0.1 --subnet 172.26.0.0/16 $(NETWORK_NAME); fi
	docker-compose -f queue/docker-compose.yml up -d --build
	docker-compose -f main/docker-compose.yml up -d --build
	docker-compose -f admin/docker-compose.yml up -d --build
	docker-compose -f front/docker-compose.yml up -d --build


down:
	docker-compose -f queue/docker-compose.yml down
	docker-compose -f main/docker-compose.yml down
	docker-compose -f admin/docker-compose.yml down
	docker-compose -f front/docker-compose.yml down
	@if [ -n "`docker network inspect $(NETWORK_NAME) | grep \"\\"Containers\\": {}\"`" ]; then docker network rm $(NETWORK_NAME); fi
