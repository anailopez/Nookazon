from datetime import datetime, timedelta
from app.models import db, Order

date = datetime.utcnow()
print("***DATE", date)
future_date = date + timedelta(days=2)


def seed_orders():
    order1 = Order(
        user_id=1, total=1200, delivery_info='Please leave package on the front porch!', order_date=date, delivery_date=future_date
    )

    db.session.add(order1)

    db.session.commit()


def undo_orders():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
