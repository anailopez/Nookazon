from .db import db
# from .order_items import order_items
from .order_items import OrderItem


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total = db.Column(db.Integer, nullable=False)
    delivery_info = db.Column(db.Text, nullable=True)

    # relationships
    user = db.relationship("User", back_populates="orders", lazy='subquery')
    items = db.relationship(
        OrderItem, back_populates='order', cascade='all,delete')

    def get_items(self):
        data = [item.to_dict() for item in self.items]
        return data

    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'total': self.total,
            'delivery_info': self.delivery_info,
            'user': self.user.to_dict(),
            'items': self.get_items()
        }
