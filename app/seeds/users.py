from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    Maple = User(
        username='Maple', icon='https://64.media.tumblr.com/34d598e1356bb69efc407c8eebc13ac4/facdf29a973759c9-02/s400x600/e7a4b09955f49b04b35651a798df8fbd08e2687e.png', email='maple@nookmail.com', street_address='123 Island Way', town_name='Nook Island', payment_method='1234', password='password')
    Puddles = User(
        username='Puddles', icon='data:image/png;base64,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', email='puddles@nookmail.com', street_address='222 Island Ave', town_name='Nook Island', payment_method='5678', password='password')
    Teddy = User(
        username='Teddy', icon='https://dodo.ac/np/images/b/bd/Teddy_NH_Villager_Icon.png', email='teddy@nookmail.com', street_address='456 Island Rd', town_name='Nook Island', payment_method='4321', password='password')

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
