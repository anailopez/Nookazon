
from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextAreaField
from wtforms.validators import DataRequired, Length


class ReviewForm(FlaskForm):
    item_id = IntegerField('item_id')
    user_id = IntegerField('user_id')
    title = StringField('title', validators=[DataRequired(message="Review headline cannot be empty"), Length(
        min=1, max=200, message='Title cannot exceed 200 characters')])
    body = TextAreaField('body', validators=[DataRequired(message='Written review cannot be empty'), Length(
        min=1, max=500, message="Review body cannot exceed 500 characters")])
    rating = IntegerField('rating', validators=[DataRequired()])
