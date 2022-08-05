from flask import Blueprint, request
from app.models import db, Order, OrderItem

order_routes = Blueprint('orders', __name__)


@order_routes.route('/<int:id>')
def get_all_orders(id):
    orders = db.session.query(Order).filter(Order.user_id == id).all()
    data = [order.to_dict() for order in orders]
    return {'orders': data}


@order_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_order(id):
    order = Order.query.get(id)
    order_item = db.session.query(OrderItem).filter(
        OrderItem.order_id == id).one()

    db.session.delete(order_item)
    db.session.commit()

    db.session.delete(order)
    db.session.commit()
    return order.to_dict()


@order_routes.route('/create', methods=['POST'])
def create_order():
    data = request.json
    print("***DATA", data)

    new_order = Order(
        user_id=data[0],
        total=data[1],
        delivery_info=data[2]
    )
    db.session.add(new_order)
    db.session.commit()
    items = data[3]
    print("**ITEMS", items[0])

    for item in items:
        item = OrderItem(
            order_id=new_order.id,
            item_id=item['item']['id'],
            quantity=int(item['quantity'])
        )
        db.session.add(item)
        db.session.commit()

    return new_order.to_dict()
