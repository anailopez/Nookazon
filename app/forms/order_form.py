from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length


class OrderForm(FlaskForm):
    delivery_info = StringField('delivery_info', validators=[Length(
        max=300, message='Delivery instructions must not exceed 300 characters')])
