from app.models import db, Review


def seed_reviews():
    review1 = Review(
        item_id=1, user_id=2, body="Froggy Chair is literally my favorite piece of furniture, I love it so much!", rating=5
    )
    review2 = Review(
        item_id=2, user_id=3, body="This shirt is perfect for a furry bear like me who tends to overheat in just about any clothes during summertime. This shirt is so comfy and it really keeps me fresh!", rating=5
    )
    review3 = Review(
        item_id=3, user_id=1, body="This bed just might be the best thing I've ever ordered from Nookazon! It's so comfortable and fits my home's aesthetic just right. I will definitely be purchasing the rest of the Log Furniture Set!", rating=5
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)

    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
