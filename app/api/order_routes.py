from flask import Blueprint
from app.models import db, Order

order_routes = Blueprint('orders', __name__)


@order_routes.route('/<int:id>')
def get_all_orders(id):
    orders = db.session.query(Order).filter(Order.user_id == id).all()
    data = [order.to_dict() for order in orders]
    return {'orders': data}
