from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    Maple = User(
        username='Maple', icon='https://static.wikia.nocookie.net/animalcrossing/images/a/a2/Maple_NH.png/revision/latest?cb=20200720220654', email='maple@nookmail.com', address='123 Island Way', password='password')
    Puddles = User(
        username='Puddles', icon='https://static.wikia.nocookie.net/animalcrossing/images/f/f9/Puddles_NH.png/revision/latest?cb=20200802145129', email='puddles@nookmail.com', address='222 Island Ave', password='password')
    Teddy = User(
        username='Teddy', icon='https://static.wikia.nocookie.net/animalcrossing/images/b/b9/Teddy_NH.png/revision/latest?cb=20200802072530', email='teddy@nookmail.com', address='456 Island Rd', password='password')

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
