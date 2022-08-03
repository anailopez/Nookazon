from flask import Blueprint
from app.models import Review, Item

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/<int:id>')
def get_reviews(id):
    item = Item.query.get(id)
    reviews = item.reviews
    data = [review.to_dict() for review in reviews]
    return {'reviews': data}
