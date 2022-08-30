from flask import Blueprint, request
from app.models import db, Item

search_routes = Blueprint('search', __name__)


@search_routes.route('/<id>')
def search_items(id):
    items = db.session.query(Item).filter(Item.title.ilike(f'%{id}%')).all()
    data = [item.to_dict() for item in items]
    return {'items': data}
