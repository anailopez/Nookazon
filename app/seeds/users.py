from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    Maple = User(
        username='Maple', icon='https://64.media.tumblr.com/34d598e1356bb69efc407c8eebc13ac4/facdf29a973759c9-02/s400x600/e7a4b09955f49b04b35651a798df8fbd08e2687e.png', email='maple@nookmail.com', street_address='123 Island Way', town_name='Nook Island', payment_method='1234', password='password')
    Puddles = User(
        username='Puddles', icon='https://i-ac.db0.company/u/villager/295Puddles-JK2lq4.png', email='puddles@nookmail.com', street_address='222 Island Ave', town_name='Nook Island', payment_method='5678', password='password')
    Teddy = User(
        username='Teddy', icon='https://oyster.ignimgs.com/mediawiki/apis.ign.com/animal-crossing-new-horizons/7/73/Teddy_NewLeaf.png', email='teddy@nookmail.com', street_address='456 Island Rd', town_name='Nook Island', payment_method='4321', password='password')

    db.session.add(Maple)
    db.session.add(Puddles)
    db.session.add(Teddy)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
