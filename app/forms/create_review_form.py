from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextAreaField
from wtforms.validators import DataRequired


class CreateReviewForm(FlaskForm):
    item_id = IntegerField('item_id')
    user_id = IntegerField('user_id')
    title = StringField('title', validators=[DataRequired()])
    body = TextAreaField('body', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
