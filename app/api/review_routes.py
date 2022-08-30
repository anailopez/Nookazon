from flask import Blueprint, request
from app.models import db, Review, Item
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@review_routes.route('/<int:id>')
def get_reviews(id):
    item = Item.query.get(id)
    reviews = item.reviews
    data = [review.to_dict() for review in reviews]
    return {'reviews': data}


@review_routes.route('/<int:id>/create', methods=['POST'])
def create_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            item_id=form.data['item_id'],
            user_id=form.data['user_id'],
            title=form.data['title'],
            body=form.data['body'],
            rating=form.data['rating']
        )

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@review_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return review.to_dict()


@review_routes.route('/<int:id>/update', methods=['PUT'])
def update_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    review = Review.query.get(id)

    if form.validate_on_submit():
        review.item_id = form.data['item_id']
        review.user_id = form.data['user_id']
        review.title = form.data['title']
        review.body = form.data['body']
        review.rating = form.data['rating']

        db.session.commit()
        return review.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
