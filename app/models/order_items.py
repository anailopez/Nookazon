from sqlalchemy import ForeignKey
from .db import db

class OrderItem(db.Model):
    __tablename__='order_items'
    # db.Column('order_id', db.Integer, db.ForeignKey(
    #     'orders.id', ondelete='CASCADE'), primary_key=True)
    # db.Column('item_id', db.Integer, db.ForeignKey(
    #     'items.id', ondelete='CASCADE'), primary_key=True)
    # db.Column('orderItem_quantity', db.Integer, nullable=False)
    order_id = db.Column(ForeignKey('orders.id'), primary_key=True)
    item_id = db.Column(ForeignKey('items.id'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)

    order = db.relationship('Order', back_populates='items')
    item = db.relationship('Item', back_populates='orders')
