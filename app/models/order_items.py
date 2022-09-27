from sqlalchemy import ForeignKey
from .db import db


class OrderItem(db.Model):
    __tablename__ = 'order_items'
    order_id = db.Column(ForeignKey('orders.id'), primary_key=True)
    item_id = db.Column(ForeignKey('items.id'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)

    order = db.relationship(
        'Order', back_populates='items', lazy='subquery')
    item = db.relationship(
        'Item', back_populates='orders', lazy='subquery')

    def to_dict(self):
        return{
            'order_id': self.order_id,
            'item_id': self.item_id,
            'quantity': self.quantity,
            'item': self.item.to_dict(),
            # 'order': self.order.to_dict()
        }
