from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    species = db.Column(db.String(30), nullable=False)
    breed = db.Column(db.String(30), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    size = db.Column(db.String(10), nullable=False)
    image_url = db.Column(db.String(200))
    available = db.Column(db.Boolean, default=True)
    adoptions = db.relationship('Adoption', backref='pet', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'species': self.species,
            'breed': self.breed,
            'age': self.age,
            'gender': self.gender,
            'size': self.size,
            'image_url': self.image_url,
            'available': self.available
        }

class Adoption(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'), nullable=False)
    adopter_name = db.Column(db.String(50), nullable=False)
    adoption_date = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def to_dict(self):
        return {
            'id': self.id,
            'pet_id': self.pet_id,
            'adopter_name': self.adopter_name,
            'adoption_date': self.adoption_date.isoformat()
        }
