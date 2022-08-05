from flask import Blueprint
from app.models import db, Order, order_items

order_routes = Blueprint('orders', __name__)


@order_routes.route('/<int:id>')
def get_all_orders(id):
    orders = db.session.query(Order).filter(Order.user_id == id).all()
    data = [order.to_dict() for order in orders]
    return {'orders': data}


@order_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_order(id):
    order = Order.query.get(id)
    
    db.session.delete(order)
    db.session.commit()
    return order.to_dict()
