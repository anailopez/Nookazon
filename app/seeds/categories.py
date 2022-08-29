from app.models import db, Category


def seed_categories():
    tools = Category(
        title='Tools'
    )
    home = Category(
        title='Home'
    )
    clothing = Category(
        title='Clothing & Shoes'
    )
    electronics = Category(
        title='Electronics'
    )
    garden = Category(
        title='Garden'
    )
    pet_supplies = Category(
        title='Pet Supplies'
    )
    appliances = Category(
        title='Appliances'
    )
    digital_music = Category(
        title='Digital Music'
    )

    db.session.add(tools)
    db.session.add(home)
    db.session.add(clothing)
    db.session.add(electronics)
    db.session.add(garden)
    db.session.add(pet_supplies)
    db.session.add(appliances)
    db.session.add(digital_music)

    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
