from app.models import db, OrderItem


def seed_order_items():
    order_item1 = OrderItem(
        order_id=1, item_id=1, quantity=2
    )

    db.session.add(order_item1)
    db.session.commit()


def undo_order_items():
    db.session.execute('TRUNCATE order_items RESTART IDENTITY CASCADE;')
    db.session.commit()
