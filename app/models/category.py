from .db import db


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)

    items = db.relationship('Item', back_populates='category')

    def get_items(self):
        data = [item.to_dict() for item in self.items]
        return data

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'items': self.get_items()
        }
