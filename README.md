# Products

"Producrs" is tutorial of microservice with Python + React + Docker + RabbitMQ.

# Requirement

* Python: 3.9
* Node: 14.15.4
* Docker

# Usage

If you can use make command, you only run Makefile.

Run "Makefile"
```bash
make up
```

```bash
cd admin
touch .env
vim .env
```

```
DEBUG=True
SECRET_KEY=YOUR_SECRET_KEY
ALLOWED_HOSTS=localhost, 172.26.0.2
DATABASE_URL=mysql://root:root@db:3306/admin
```

```bash
cd admin
docker-compose exec backend bash
python manage.py makemigrations
python manage.py migrate
```

```bash
cd main
docker-compose exec backend bash
python manage.py db init
python manage.py db migrate
```

# Note

I don't test environments under Linux and Windows.