from app import app
from models import db, Pet, Adoption
from datetime import datetime, timedelta

with app.app_context():
    db.create_all()

    # Add sample pet data
    pet1 = Pet(name='Bosco', species='Dog', breed='Labrador', age=3, gender='Male', size='Medium', image_url='https://example.com/buddy.jpg')
    pet2 = Pet(name='Luna', species='Cat', breed='Persian', age=2, gender='Female', size='Small', image_url='https://example.com/luna.jpg')
    pet3 = Pet(name='Max', species='Dog', breed='Poodle', age=4, gender='Male', size='Medium', image_url='https://example.com/max.jpg')
    pet4 = Pet(name='Bella', species='Cat', breed='Maine Coon', age=5, gender='Female', size='Large', image_url='https://example.com/bella.jpg')
    pet5 = Pet(name='Charlie', species='Dog', breed='Beagle', age=2, gender='Male', size='Small', image_url='https://example.com/charlie.jpg')
    pet6 = Pet(name='Cleo', species='Cat', breed='Siamese', age=3, gender='Female', size='Medium', image_url='https://example.com/cleo.jpg')
    pet7 = Pet(name='Daisy', species='Dog', breed='Golden Retriever', age=4, gender='Female', size='Large', image_url='https://example.com/daisy.jpg')
    pet8 = Pet(name='Oreo', species='Cat', breed='Domestic Shorthair', age=2, gender='Male', size='Small', image_url='https://example.com/oreo.jpg')
    pet9 = Pet(name='Milo', species='Dog', breed='Corgi', age=3, gender='Male', size='Medium', image_url='https://example.com/milo.jpg')
    pet10 = Pet(name='Zoey', species='Cat', breed='Bengal', age=1, gender='Female', size='Medium', image_url='https://example.com/zoey.jpg')

    db.session.add_all([pet1, pet2, pet3, pet4, pet5, pet6, pet7, pet8, pet9, pet10])

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