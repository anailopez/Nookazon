from flask import Blueprint
from app.models import Item

item_routes = Blueprint('items', __name__)


@item_routes.route('/')
def get_all_items():
    items = Item.query.all()
    data = [item.to_dict() for item in items]
    return {'items': data}


@item_routes.route('/<int:id>')
def get_one_item(id):
    item = Item.query.get(id)
    return item.to_dict()
