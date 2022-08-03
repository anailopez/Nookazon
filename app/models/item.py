from .db import db
from .cart_items import cart_items
from .order_items import order_items


class Item(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.Text, nullable=False)

    # relationships
    reviews = db.relationship("Item", back_populates="item")
    users = db.relationship(
        "User", secondary=cart_items, back_populates="items")
    orders = db.relationship(
        "Order", secondary=order_items, back_populates='items')

    def get_users(self):
        data = [user.to_dict() for user in self.users]
        return data

    def get_orders(self):
        data = [order.to_dict() for order in self.orders]
        return data

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'description': self.description,
            'image': self.image,
            'users': self.get_users(),
            'orders': self.get_orders()
        }
