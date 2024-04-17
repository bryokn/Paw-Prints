from app import app
from models import db, Pet, Adoption
from datetime import datetime, timedelta

with app.app_context():
    db.create_all()

    # Add sample pet data
    pet1 = Pet(name='Bosco', species='Dog', breed='Labrador', age=3, gender='Male', size='Medium', image_url='https://cdn.britannica.com/82/232782-050-8062ACFA/Black-labrador-retriever-dog.jpg')
    pet2 = Pet(name='Luna', species='Cat', breed='Persian', age=2, gender='Female', size='Small', image_url='https://thecatsite.com/c/wp-content/uploads/2011/11/modern-persian-cat-768x529.jpg')
    pet3 = Pet(name='Max', species='Dog', breed='Poodle', age=4, gender='Male', size='Medium', image_url='https://www.pawtracks.com/wp-content/uploads/sites/2/2022/02/brown-poodle-sitting-by-window.jpg')
    pet4 = Pet(name='Bella', species='Cat', breed='Maine Coon', age=5, gender='Female', size='Large', image_url='https://www.zooplus.ie/magazine/wp-content/uploads/2019/04/maine-coon-cat-breed-768x658.jpg')
    pet5 = Pet(name='Charlie', species='Dog', breed='Beagle', age=2, gender='Male', size='Small', image_url='https://espree.com/sites/default/files/2019-10/Beagle.png')
    pet6 = Pet(name='Cleo', species='Cat', breed='Siamese', age=3, gender='Female', size='Medium', image_url='https://assets.elanco.com/8e0bf1c2-1ae4-001f-9257-f2be3c683fb1/fca42f04-2474-4302-a238-990c8aebfe8c/Siamese_cat_1110x740.jpg')
    pet7 = Pet(name='Daisy', species='Dog', breed='Golden Retriever', age=4, gender='Female', size='Large', image_url='https://slatercreekgoldenretrievers.com/wp-content/uploads/2023/05/golden-retriever.jpeg')
    pet8 = Pet(name='Oreo', species='Cat', breed='Domestic Shorthair', age=2, gender='Male', size='Small', image_url='https://tvmdl.tamu.edu/wp-content/uploads/2020/06/AdobeStock_80494269-300x200.jpeg')
    pet9 = Pet(name='Milo', species='Dog', breed='Corgi', age=3, gender='Male', size='Medium', image_url='https://hips.hearstapps.com/hmg-prod/images/corgi-dog-breed-surge-1666015298.jpg')
    pet10 = Pet(name='Zoey', species='Cat', breed='Bengal', age=1, gender='Female', size='Medium', image_url='https://www.zooplus.ie/magazine/wp-content/uploads/2018/05/bengalkatze-768x512.jpg')

    db.session.add_all([pet1, pet2, pet3, pet4, pet5, pet6, pet7, pet8, pet9, pet10])
#    db.session.commit()


    # Add sample adoption data
    today = datetime.now()
    adoption1 = Adoption(pet_id=pet1.id, adopter_name='John Mwangi', adoption_date=today - timedelta(days=30))
    adoption2 = Adoption(pet_id=pet2.id, adopter_name='Jane Chebet', adoption_date=today - timedelta(days=45))
    adoption3 = Adoption(pet_id=pet3.id, adopter_name='Bob Muthui', adoption_date=today - timedelta(days=60))
    adoption4 = Adoption(pet_id=pet4.id, adopter_name='Sarah Leso', adoption_date=today - timedelta(days=75))
    adoption5 = Adoption(pet_id=pet5.id, adopter_name='Tom Ojong', adoption_date=today - timedelta(days=90))
    adoption6 = Adoption(pet_id=pet6.id, adopter_name='Emily Kibet', adoption_date=today - timedelta(days=105))
    adoption7 = Adoption(pet_id=pet7.id, adopter_name='Alex Garcia', adoption_date=today - timedelta(days=120))
    adoption8 = Adoption(pet_id=pet8.id, adopter_name='Olivia Maina', adoption_date=today - timedelta(days=135))
    adoption9 = Adoption(pet_id=pet9.id, adopter_name='Michael Kijana', adoption_date=today - timedelta(days=150))
    adoption10 = Adoption(pet_id=pet10.id, adopter_name='Sophia Masai', adoption_date=today - timedelta(days=165))

    db.session.add_all([adoption1, adoption2, adoption3, adoption4, adoption5, adoption6, adoption7, adoption8, adoption9, adoption10])

    db.session.commit()
    print('Database seeded with sample data.')