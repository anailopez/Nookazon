from sqlalchemy import Integer
from .db import db

order_items = db.Table(
    'order_items',
    db.Model.metadata,
    db.Column('order_id', db.Integer, db.ForeignKey(
        'orders.id', ondelete='CASCADE'), primary_key=True),
    db.Column('item_id', db.Integer, db.ForeignKey(
        'items.id', ondelete='CASCADE'), primary_key=True),
    db.Column('orderItem_quantity', db.Integer, nullable=False)
)
