from flask.cli import AppGroup
from .users import seed_users, undo_users
from .items import seed_items, undo_items
from .reviews import seed_reviews, undo_reviews
from .orders import seed_orders, undo_orders
from .order_items import seed_order_items, undo_order_items
from .categories import seed_categories, undo_categories

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_categories()
    seed_items()
    seed_reviews()
    seed_orders()
    seed_order_items()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_order_items()
    undo_orders()
    undo_reviews()
    undo_items()
    undo_users()
    undo_categories()
