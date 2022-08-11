from app.models import db, Item


def seed_items():
    froggy_chair = Item(
        title='Froggy Chair', price=1200, description="Part of the Froggy Furniture Set, Froggy Chair has long been a Nookazon best-seller. With its comfortable, cushioned seat and its wonderfully cheerful smiling froggy face, Froggy Chair would make a gorgeous addition to any villager's home!", image='https://64.media.tumblr.com/ba1c1d9c01ddb1db1772decc15937c31/57f68ffbeff1ecfe-db/s540x810/07693557b203d413363ff95528f4ec9f55567116.pnj'
    )
    aloha_shirt = Item(
        title='Nook Inc. Aloha Shirt', price=3000, description="Get ready for the summer-time sun in our brand-new new Aloha Shirt! Made from a fresh and breathable material and adorned with the Nook Inc. logo, the Aloha Shirt is sure to be the perfect addition to any summer day.", image='https://dodo.ac/np/images/b/b9/Nook_Inc._Aloha_Shirt_NH_Icon.png'
    )
    log_bed = Item(
        title='Log Bed', price=3600, description="Give your island home a rustic, cabin-in-the-woods feel with our Log Bed! Part of our popular Log Furniture Set, the Log bed comes complete with a bed frame, mattress, pillows, and comforter.", image='https://img.gamewith.net/article_tools/animal-crossing-new-horizons/gacha/Log%20bed.png'
    )
    acoustic_guitar = Item(
        title='Acoustic Guitar', price=3210, description='Live out your rockstar dreams with the Nook Inc. Acoustic Guitar! Made from the finest softwood, Acoustic Guitar will allow you to kickstart your dream musical career.', image='https://img.gamewith.net/article_tools/animal-crossing-new-horizons/gacha/Acoustic%20guitar.png'
    )
    brick_oven = Item(
        title='Brick Oven', price=3820, description="With the Nook Inc. Brick Oven, you'll be able to make delicious homemade pizzas whenever your heart desires!", image='https://img.gamewith.net/article_tools/animal-crossing-new-horizons/gacha/Brick%20oven.png'
    )
    log_decorative_shelves = Item(
        title='Log Decorative Shelves', price=1560, description='Part of the popular Log Furniture Set, give your home a cabin-in-the-woods feel with our Log Decorative Shelves!', image='https://img.gamewith.net/article_tools/animal-crossing-new-horizons/gacha/Log%20decorative%20shelves.png'
    )
    bonsai_shelf = Item(
        title='Bonsai Shelf', price=8460, description='Give your home some greenery with our Bonsai Shelf! Complete with three beautiful bonsai trees, Bonsai Shelf if the perfect fit for any plant lover.', image='https://img.gamewith.net/article_tools/animal-crossing-new-horizons/gacha/Bonsai%20shelf.png'
    )

    db.session.add(froggy_chair)
    db.session.add(aloha_shirt)
    db.session.add(log_bed)
    db.session.add(acoustic_guitar)
    db.session.add(brick_oven)
    db.session.add(log_decorative_shelves)

    db.session.commit()


def undo_items():
    db.session.execute('TRUNCATE items RESTART IDENTITY CASCADE;')
    db.session.commit()
