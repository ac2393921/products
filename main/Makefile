NETWORK_NAME = blog-network

up:
	@if [ -z "`docker network ls | grep $(NETWORK_NAME)`" ]; then docker network create --gateway 172.26.0.1 --subnet 172.26.0.0/16 $(NETWORK_NAME); fi
	docker-compose up --build

down:
	docker-compose down
	@if [ -n "`docker network inspect $(NETWORK_NAME) | grep \"\\"Containers\\": {}\"`" ]; then docker network rm $(NETWORK_NAME); fi
