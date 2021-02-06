import json, pika, os, django
from logging import getLogger

logger = getLogger(__name__)


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "admin.settings")
django.setup()

from products.models import Product

params = pika.URLParameters('amqp://guest:guest@172.26.0.5:5672/')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='admin')


def callback(ch, method, properties, body):
    logger.info('Recived in admin')
    id = json.loads(body)
    logger.info(id)
    product = Product.objects.get(id=id)
    product.likes = product.likes + 1
    product.save()
    logger.info('Product likes increased!')
    # print('Product likes increased!')


channel.basic_consume(queue='admin', on_message_callback=callback, auto_ack=True)

logger.info('Started Consuming')

channel.start_consuming()

channel.close()