from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Length


class ListForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message='Please provide a name for your new list'), Length(
        min=1, max=300, message=('List name cannot exceed 300 characters'))])
    user_id = IntegerField('user_id')
