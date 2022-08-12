from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Optional, URL, EqualTo, Length
from app.models import User
import re


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
    if not icon.length > 0:
        icon == 'https://i.pinimg.com/originals/b7/2e/f2/b72ef278f70bd20a7345ad297a380274.png'


def validate_password(form, field):
    password = field.data
    if(not re.fullmatch('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$', password)):
        raise ValidationError(
            'Password must be a minimum of 8 characters and contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")')


def validate_email(form, field):
    email = field.data
    if (not re.fullmatch('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}', email)):
        raise ValidationError('Please enter a valid email')


def validate_payment(form, field):
    payment_method = field.data
    if(not re.fullmatch('[0-9]{4}', payment_method)):
        raise ValidationError(
            'Please enter the last 4 digits of your payment method')


def validate_address(form, field):
    street_address = field.data
    if(not re.fullmatch('[0-9]+\s+[A-Z, a-z]+', street_address)):
        raise ValidationError('Please enter a valid street address')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(min=1, max=50, message='Username must not exceed 50 characters'), username_exists])
    icon = StringField('icon', [Optional(), URL(
        message='Please enter a valid URL'), icon_validate])
    email = StringField('email', validators=[
                        DataRequired(), user_exists, validate_email])
    street_address = StringField('address', validators=[DataRequired(), Length(
        min=1, max=50, message="Street Address must not exceed 50 characters"), validate_address])
    town_name = StringField('town name', validators=[DataRequired(), Length(
        min=1, max=50, message='Town Name cannot exceed 50 characters')])
    payment_method = StringField('payment method', validators=[DataRequired(), Length(
        min=1, max=4, message='Please include only the last 4 digits of your payment method'), validate_payment])
    password = StringField('password', validators=[
                           DataRequired(), validate_password, EqualTo('confirm_password', message='Password and Confirm Password must match')])
    confirm_password = StringField('confirm_password', validators=[
                                   DataRequired(), validate_password])
