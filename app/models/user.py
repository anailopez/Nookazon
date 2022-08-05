from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
# from .cart_items import cart_items


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    icon = db.Column(db.Text(), nullable=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    address = db.Column(db.String(300), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    # relationships :)
    reviews = db.relationship(
        "Review", back_populates="user", cascade="all, delete-orphan")
    orders = db.relationship(
        "Order", back_populates="user", cascade="all, delete-orphan")
    # items = db.relationship(
    #     "Item", secondary=cart_items, back_populates="users", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def get_reviews(self):
        data = [review.to_dict() for review in self.reviews]
        return data

    def get_orders(self):
        data = [order.to_dict() for order in self.orders]
        return data

    def get_items(self):
        data = [item.to_dict() for item in self.items]
        return data

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'icon': self.icon,
            'email': self.email,
            'address': self.address,
            'reviews': self.get_items(),
            'orders': self.get_orders(),
            'items': self.get_items()
        }
