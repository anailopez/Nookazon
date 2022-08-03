from .db import db

cart_items = db.Table(
    'cart_items',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(
        'users.id'), primary_key=True),
    db.Column('item_id', db.Integer, db.ForeignKey(
        'items.id'), primary_key=True),
    db.Column('cartItem_quantity', db.Integer, nullable=False)
)
