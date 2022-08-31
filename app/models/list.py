from .db import db
from .list_items import list_items


class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='lists', lazy='subquery')
    items = db.relationship('Item', secondary=list_items, back_populates='lists',
                            passive_deletes=True, lazy='subquery')

    def get_items(self):
        data = [item.to_dict() for item in self.items]
        return data

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user': self.user.to_dict(),
            'items': self.get_items()
        }
