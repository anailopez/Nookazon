from .db import db
# from .cart_items import cart_items
# from .order_items import order_items
from .order_items import OrderItem


class Item(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.Text, nullable=False)

    # relationships
    reviews = db.relationship(
        "Review", back_populates="item", cascade="all, delete-orphan")
    # cart_items
    # users = db.relationship(
    #     "User", secondary=cart_items, back_populates="items", passive_deletes=True)
    # order_items
    orders = db.relationship(OrderItem, back_populates='item')

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
            # 'users': self.get_users(),
            'orders': self.get_orders()
        }
