from app.models import db, Order


def seed_orders():
    order1 = Order(
        user_id=1, total=1200, delivery_info='Please leave package on the front porch!'
    )

    db.session.add(order1)

    db.session.commit()


def undo_orders():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
