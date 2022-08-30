from flask import Blueprint, request
from app.models import db, List
from app.forms import ListForm

list_routes = Blueprint('lists', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@list_routes.route('/create', methods=['POST'])
def create_list():
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_list = List(
            name=form.data['name'],
            user_id=form.data['user_id']
        )

        db.session.add(new_list)
        db.session.commit()
        return new_list.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@list_routes.route('/<int:id>')
def get_lists(id):
    lists = db.session.query(List).filter(List.user_id == id).all()
    data = [list.to_dict() for list in lists]
    print('**THE DATA', data)
    return {'lists': data}
