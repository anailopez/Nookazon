from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length, DataRequired


class OrderForm(FlaskForm):
    delivery_info = StringField('delivery_info', validators=[DataRequired(),
                                                             Length(min=1, max=200, message='Delivery instructions must not exceed 300 characters')])
