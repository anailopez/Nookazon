from datetime import datetime, timedelta
from app.models import db, Order

now = datetime.now()
formatted_now = f"{now.strftime('%B')}, {now.day} {now.year}"
future = timedelta(days=2)
delivery = now + future
formatted_delivery = f"{delivery.strftime('%B')}, {delivery.day} {delivery.year}"


def seed_orders():
    order1 = Order(
        user_id=1, total=1200, delivery_info='Please leave package on the front porch!', order_date=formatted_now, delivery_date=formatted_delivery
    )

    db.session.add(order1)

    db.session.commit()


def undo_orders():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
