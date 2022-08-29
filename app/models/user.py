from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    icon = db.Column(db.Text(), nullable=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    street_address = db.Column(db.String(50), nullable=False)
    town_name = db.Column(db.String(50), nullable=False)
    payment_method = db.Column(db.String(4), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    # relationships :)
    reviews = db.relationship(
        "Review", back_populates="user", cascade="all, delete-orphan")
    orders = db.relationship(
        "Order", back_populates="user", cascade="all, delete-orphan")
    lists = db.relationship("List", back_populates="user")

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

    # def get_items(self):
    #     data = [item.to_dict() for item in self.items]
    #     return data

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'icon': self.icon,
            'email': self.email,
            'street_address': self.street_address,
            'town_name': self.town_name,
            'payment_method': self.payment_method
            # 'reviews': self.get_reviews(),
            # 'orders': self.get_orders(),
            # 'items': self.get_items()
        }
