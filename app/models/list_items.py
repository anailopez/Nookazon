from .db import db

list_items = db.Table(
    'list_items',
    db.Model.metadata,
    db.Column('list_id', db.Integer, db.ForeignKey(
        'lists.id', ondelete='CASCADE'), primary_key=True),
    db.Column('item_id', db.Integer, db.ForeignKey(
        'items.id', ondelete='CASCADE'), primary_key=True)
)
