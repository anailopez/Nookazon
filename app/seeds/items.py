from app.models import db, Item


def seed_items():
    froggy_chair = Item(
        title='Froggy Chair', price=1200, description="Part of the Froggy Furniture Set, Froggy Chair has long been a Nookazon best-seller. With its comfortable, cushioned seat and its wonderfully cheerful smiling froggy face, Froggy Chair would make a gorgeous addition to any villager's home!", image='https://www.gameshub.com/wp-content/uploads/sites/5/2022/05/froggy-chair.jpeg'
    )
    aloha_shirt = Item(
        title='Nook Inc. Aloha Shirt', price=3000, description="Get ready for the summer-time sun in our brand-new new Aloha Shirt! Made from a fresh and breathable material and adorned with the Nook Inc. logo, the Aloha Shirt is sure to be the perfect addition to any summer day.", image='https://dodo.ac/np/images/b/b9/Nook_Inc._Aloha_Shirt_NH_Icon.png'
    )
    log_bed = Item(
        title='Log Bed', price=3600, description="Give your island home a rustic, cabin-in-the-woods feel with our Log Bed! Part of our popular Log Furniture Set, the Log bed comes complete with a bed frame, mattress, pillows, and comforter.", image='https://mypotatogames.com/wp-content/uploads/2020/09/animal_crossing_new_horizons_interior_designs.jpg'
    )

    db.session.add(froggy_chair)
    db.session.add(aloha_shirt)
    db.session.add(log_bed)

    db.session.commit()


def undo_items():
    db.session.execute('TRUNCATE items RESTART IDENTITY CASCADE;')
    db.session.commit()
