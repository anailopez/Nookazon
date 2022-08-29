from .db import db
from .order_items import OrderItem
from .list_items import list_items


class Item(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.Text, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(
        'categories.id'), nullable=False)

    # relationships
    reviews = db.relationship(
        "Review", back_populates="item", cascade="all, delete-orphan")
    orders = db.relationship(OrderItem, back_populates='item')
    category = db.relationship('Category', back_populates='items')
    lists = db.relationship('List', secondary=list_items, back_populates='items',
                            cascade='all, delete')

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
            'image': self.image
        }
