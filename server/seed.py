from app import app
from models import db, Pet, Adoption, Users
from datetime import datetime, timedelta

with app.app_context():
    #delete all
    Adoption.query.delete()
    Pet.query.delete()
    Users.query.delete()
    db.session.commit()
    #db.create_all()
    
    #users data
    user1 = Users(username='mwangij', email='johnmwangi@gmail.com') 
    user1.set_password('password1')
    user2 = Users(username='janechebet', email='janechebet@gmail.com')
    user2.set_password('password2')
    user3 = Users(username='bmuthui', email='bmuthui@gmail.com')
    user3.set_password('password3')
    user4 = Users(username='lesos', email='saraleso@gmail.com')
    user4.set_password('password4')
    user5 = Users(username='tojong', email='tojong@gmail.com')
    user5.set_password('password5')
    user6 = Users(username='emmy', email='emmy@gmail.com')
    user6.set_password('password6')
    user7 = Users(username='garcia', email='garcia@gmail.com')
    user7.set_password('password7')
    user8 = Users(username='omaina', email='omaina@gmail.com')
    user8.set_password('password8')
    user9 = Users(username='kijana', email='kijana@gmail.com')
    user9.set_password('password9')
    user10 = Users(username='masai', email='masai@gmail.com')
    user10.set_password('password10')
    
    db.session.add_all([user1, user2, user3, user4, user5, user6, user7, user8, user9, user10])
    db.session.commit()

    # pet data
    pet1 = Pet(name='Bosco', species='Dog', breed='Labrador', age=3, gender='Male', size='Medium', image_url='https://cdn.britannica.com/82/232782-050-8062ACFA/Black-labrador-retriever-dog.jpg', likes='Playing fetch, going for walks, cuddling', about="""Bosco is a friendly and energetic Labrador who loves to play and explore. 
He's great with children and other pets, and would make a wonderful addition to any family.""")
    pet2 = Pet(name='Luna', species='Cat', breed='Persian', age=2, gender='Female', size='Small', image_url='https://thecatsite.com/c/wp-content/uploads/2011/11/modern-persian-cat-768x529.jpg', likes='Napping in sunny spots, chasing toys, being brushed', about="""Luna is a calm and affectionate Persian cat who loves nothing more than curling up in a cozy spot for a nap. 
She's gentle and patient, and would be a great companion for a family or individual.""")
    pet3 = Pet(name='Max', species='Dog', breed='Poodle', age=4, gender='Male', size='Medium', image_url='https://www.pawtracks.com/wp-content/uploads/sites/2/2022/02/brown-poodle-sitting-by-window.jpg', likes='Swimming, playing with squeaky toys, getting brushed', about="""Max is a playful and intelligent Poodle who loves to be the center of attention. 
He's highly trainable and would thrive in an active household that can provide him with plenty of mental and physical stimulation.""")
    pet4 = Pet(name='Bella', species='Cat', breed='Maine Coon', age=5, gender='Female', size='Large', image_url='https://www.zooplus.ie/magazine/wp-content/uploads/2019/04/maine-coon-cat-breed-768x658.jpg', likes='Watching birds, napping in high places, getting belly rubs', about="""Bella is a majestic Maine Coon who commands attention wherever she goes. 
She's a gentle giant with a curious nature and loves to explore her environment. Bella would make a loyal and loving companion for the right family.""")
    pet5 = Pet(name='Charlie', species='Dog', breed='Beagle', age=2, gender='Male', size='Small', image_url='https://espree.com/sites/default/files/2019-10/Beagle.png', likes='Sniffing out treats, going on hikes, cuddling up on the couch', about="""Charlie is a happy-go-lucky Beagle who is always ready for adventure. 
He's curious and energetic, and would thrive in a home with an active lifestyle. Charlie is great with kids and other pets, and would make a wonderful addition to any family.""")
    pet6 = Pet(name='Cleo', species='Cat', breed='Siamese', age=3, gender='Female', size='Medium', image_url='https://assets.elanco.com/8e0bf1c2-1ae4-001f-9257-f2be3c683fb1/fca42f04-2474-4302-a238-990c8aebfe8c/Siamese_cat_1110x740.jpg', likes='Chatting with her humans, playing with feather toys, snuggling in cozy spots', about="""Cleo is a chatty and affectionate Siamese cat who loves to be the center of attention. 
She's highly intelligent and curious, and enjoys interactive playtime with her humans. Cleo would do best in a home that can provide her with plenty of attention and stimulation.""")
    pet7 = Pet(name='Daisy', species='Dog', breed='Golden Retriever', age=4, gender='Female', size='Large', image_url='https://slatercreekgoldenretrievers.com/wp-content/uploads/2023/05/golden-retriever.jpeg', likes='Swimming, fetching balls, cuddling on the couch', about="""Daisy is a gentle and loyal Golden Retriever who loves nothing more than spending time with her humans. 
She's great with children and other pets, and would make an excellent family companion. Daisy is patient and eager to please, and would thrive in an active household.""")
    pet8 = Pet(name='Oreo', species='Cat', breed='Domestic Shorthair', age=2, gender='Male', size='Small', image_url='https://tvmdl.tamu.edu/wp-content/uploads/2020/06/AdobeStock_80494269-300x200.jpeg', likes='Chasing laser pointers, napping in sunny windows, playing with cat toys', about="""Oreo is a playful and energetic Domestic Shorthair cat who loves to keep his humans entertained. 
He's curious and adventurous, and enjoys exploring his environment. Oreo would thrive in a home with plenty of interactive toys and opportunities for playtime.""")
    pet9 = Pet(name='Milo', species='Dog', breed='Corgi', age=3, gender='Male', size='Medium', image_url='https://hips.hearstapps.com/hmg-prod/images/corgi-dog-breed-surge-1666015298.jpg', likes='Herding and chasing after moving objects, snuggling up for naps, getting belly rubs', about="""Milo is a lively and energetic Corgi who loves to keep his humans on their toes. 
He's highly intelligent and responds well to training, making him a great companion for active families. Milo enjoys playtime and would thrive in a home with plenty of opportunities to exercise and explore.""")
    pet10 = Pet(name='Zoey', species='Cat', breed='Bengal', age=1, gender='Female', size='Medium', image_url='https://www.zooplus.ie/magazine/wp-content/uploads/2018/05/bengalkatze-768x512.jpg', likes='Climbing to high perches, playing with interactive toys, getting brushed', about="""Zoey is a playful and curious Bengal cat who loves to keep her humans entertained. 
She's highly active and intelligent, and enjoys a challenge. Zoey would do best in a home with plenty of vertical space and interactive toys to keep her stimulated.""")

    db.session.add_all([pet1, pet2, pet3, pet4, pet5, pet6, pet7, pet8, pet9, pet10])
    db.session.commit()


    # adoption data
    today = datetime.now()
    adoption1 = Adoption(pet_id=pet1.id, user_id=user1.id, adoption_date=today - timedelta(days=30))
    adoption2 = Adoption(pet_id=pet2.id, user_id=user2.id, adoption_date=today - timedelta(days=45))
    adoption3 = Adoption(pet_id=pet3.id, user_id=user3.id, adoption_date=today - timedelta(days=60))
    adoption4 = Adoption(pet_id=pet4.id, user_id=user4.id, adoption_date=today - timedelta(days=75))
    adoption5 = Adoption(pet_id=pet5.id, user_id=user5.id, adoption_date=today - timedelta(days=90))
    adoption6 = Adoption(pet_id=pet6.id, user_id=user6.id, adoption_date=today - timedelta(days=105))
    adoption7 = Adoption(pet_id=pet7.id, user_id=user7.id, adoption_date=today - timedelta(days=120))
    adoption8 = Adoption(pet_id=pet8.id, user_id=user8.id, adoption_date=today - timedelta(days=135))
    adoption9 = Adoption(pet_id=pet9.id, user_id=user9.id, adoption_date=today - timedelta(days=150))
    adoption10 = Adoption(pet_id=pet10.id, user_id=user10.id, adoption_date=today - timedelta(days=165))

    db.session.add_all([adoption1, adoption2, adoption3, adoption4, adoption5, adoption6, adoption7, adoption8, adoption9, adoption10])

    db.session.commit()
    print('Database seeded with data.')