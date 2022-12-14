"""create_tables

Revision ID: ffdc0a98111c
Revises:
Create Date: 2020-11-20 15:06:02.230689

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ffdc0a98111c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('username', sa.String(
                        length=50), nullable=False),
                    sa.Column('icon', sa.Text(), nullable=True),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('street_address', sa.String(
                        length=50), nullable=False),
                    sa.Column('town_name', sa.String(
                        length=50), nullable=False),
                    sa.Column('payment_method', sa.String(4), nullable=False),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email', 'username')
                    )
    op.create_table('categories',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('title', sa.String(300), nullable=False),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('items',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('title', sa.String(length=300), nullable=False),
                    sa.Column('price', sa.Integer(), nullable=False),
                    sa.Column('description', sa.Text(), nullable=False),
                    sa.Column('image', sa.Text(), nullable=False),
                    sa.Column('category_id', sa.Integer(), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.ForeignKeyConstraint(['category_id'], ['categories.id'])
                    )
    op.create_table('reviews',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('item_id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('title', sa.String(length=300), nullable=False),
                    sa.Column('body', sa.Text(), nullable=False),
                    sa.Column('rating', sa.Integer(), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.ForeignKeyConstraint(['item_id'], ['items.id']),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'])
                    )
    op.create_table('orders',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('total', sa.Integer(), nullable=False),
                    sa.Column('delivery_info', sa.String(
                        length=300), nullable=True),
                    sa.Column('order_date', sa.String(
                        length=50), nullable=False),
                    sa.Column('delivery_date', sa.String(
                        length=50), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'])
                    )
    op.create_table('order_items',
                    sa.Column('order_id', sa.Integer(), nullable=False),
                    sa.Column('item_id', sa.Integer(), nullable=False),
                    sa.Column('quantity',
                              sa.Integer(), nullable=False),
                    sa.PrimaryKeyConstraint('order_id', 'item_id'),
                    sa.ForeignKeyConstraint(['order_id'], ['orders.id']),
                    sa.ForeignKeyConstraint(['item_id'], ['items.id'])
                    )
    op.create_table('lists',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(300), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'])
                    )
    op.create_table('list_items',
                    sa.Column('list_id', sa.Integer(), nullable=False),
                    sa.Column('item_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['list_id'], ['lists.id']),
                    sa.ForeignKeyConstraint(['item_id'], ['items.id'])
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('order_items')
    op.drop_table('list_items')
    op.drop_table('reviews')
    op.drop_table('orders')
    op.drop_table('items')
    op.drop_table('lists')
    op.drop_table('users')
    op.drop_table('categories')
    # ### end Alembic commands ###
