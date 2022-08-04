from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def icon_validate(form, field):
    icon = field.data
    if icon == '':
        icon == 'https://i.pinimg.com/originals/b7/2e/f2/b72ef278f70bd20a7345ad297a380274.png'


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    icon = StringField('icon', [DataRequired(), icon_validate])
    email = StringField('email', validators=[DataRequired(), user_exists])
    address = StringField('address', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
