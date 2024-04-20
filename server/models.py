#import necessary modules
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy() #SQLAlchemy instance creation

#define user model
class Users(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    adoptions = db.relationship('Adoption', backref='user', lazy='dynamic')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

#define pet model
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
    adoptions = db.relationship('Adoption', backref='pet', lazy='dynamic') #define relationship btw pet and adoption model
    likes =db.Column(db.String(200))
    about = db.Column(db.String(400))
    

    def to_dict(self):
        #define method to convert Pet object to a dictionary
        return {
            'id': self.id,
            'name': self.name,
            'species': self.species,
            'breed': self.breed,
            'age': self.age,
            'gender': self.gender,
            'size': self.size,
            'image_url': self.image_url,
            'available': self.available,
            'likes': self.likes,
            'about': self.about
        }

#define adoption model
class Adoption(db.Model):
    __tablename__ = 'adoptions'

    id = db.Column(db.Integer, primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    adoption_date = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def to_dict(self):
        return {
            'id': self.id,
            'pet_id': self.pet_id,
            'user_id': self.user_id,
            'adoption_date': self.adoption_date.isoformat()
        }