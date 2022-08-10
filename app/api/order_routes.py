from flask import Blueprint, request
from app.models import db, Order, OrderItem
import datetime

order_routes = Blueprint('orders', __name__)


@order_routes.route('/<int:id>')
def get_all_orders(id):
    orders = db.session.query(Order).filter(Order.user_id == id).all()
    data = [order.to_dict() for order in orders]
    return {'orders': data}


@order_routes.route('/<int:id>/details')
def get_single_order(id):
    order = Order.query.get(id)
    return order.to_dict()


@order_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_order(id):
    order = Order.query.get(id)
    order_items = db.session.query(OrderItem).filter(
        OrderItem.order_id == id).all()

    for item in order_items:
        db.session.delete(item)
        db.session.commit()

    db.session.delete(order)
    db.session.commit()
    return order.to_dict()


@order_routes.route('/create', methods=['POST'])
def create_order():
    data = request.json
    # print("***DATA", data)
    now = datetime.datetime.now()
    formatted_now = f"{now.strftime('%B')}, {now.day} {now.year}"
    future = datetime.timedelta(days=2)
    delivery = now + future
    formatted_delivery = f"{delivery.strftime('%B')}, {delivery.day} {delivery.year}"

    new_order = Order(
        user_id=data[0],
        total=data[1],
        delivery_info=data[2],
        order_date=formatted_now,
        delivery_date=formatted_delivery
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


@order_routes.route('/<int:id>/edit', methods=["PUT"])
def edit_order(id):
    data = request.json
    order = Order.query.get(id)
    order.delivery_info = data

    db.session.commit()
    return order.to_dict()
