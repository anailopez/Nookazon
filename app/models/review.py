from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    body = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    # relationships
    user = db.relationship("User", back_populates='reviews', lazy='subquery')
    item = db.relationship("Item", back_populates='reviews', lazy='subquery')

    def to_dict(self):
        return{
            'id': self.id,
            'item_id': self.item_id,
            'user_id': self.user_id,
            'title': self.title,
            'body': self.body,
            'rating': self.rating,
            'user': self.user.to_dict(),
            'item': self.item.to_dict()
        }
