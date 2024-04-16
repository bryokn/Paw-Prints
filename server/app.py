from flask import Flask, jsonify, request, abort
from models import db, Pet, Adoption
from datetime import datetime
import logging

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pets.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key_here'

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

db.init_app(app)

@app.route('/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.all()
    return jsonify([pet.to_dict() for pet in pets])

@app.route('/pets/<int:pet_id>', methods=['GET'])
def get_pet(pet_id):
    pet = Pet.query.get(pet_id)
    if pet:
        return jsonify(pet.to_dict())
    else:
        abort(404, 'Pet not found')

@app.route('/pets/<int:pet_id>', methods=['PATCH'])
def update_pet(pet_id):
    pet = Pet.query.get(pet_id)
    if not pet:
        abort(404, 'Pet not found')

    data = request.get_json()
    if 'name' in data:
        pet.name = data['name']
    if 'species' in data:
        pet.species = data['species']
    if 'breed' in data:
        pet.breed = data['breed']
    if 'age' in data:
        pet.age = data['age']
    if 'gender' in data:
        pet.gender = data['gender']
    if 'size' in data:
        pet.size = data['size']
    if 'image_url' in data:
        pet.image_url = data['image_url']
    db.session.commit()
    return jsonify(pet.to_dict())

@app.route('/pets/<int:pet_id>', methods=['DELETE'])
def delete_pet(pet_id):
    pet = Pet.query.get(pet_id)
    if not pet:
        abort(404, 'Pet not found')
    
    adoptions = Adoption.query.filter_by(pet_id=pet_id).all()
    for adoption in adoptions:
        db.session.delete(adoption)

    db.session.delete(pet)
    db.session.commit()
    return jsonify({'message': 'Pet deleted successfully'})


@app.route('/adoptions', methods=['POST'])
def create_adoption():
    data = request.get_json()
    pet_id = data.get('pet_id')
    adopter_name = data.get('adopter_name')

    if not pet_id or not adopter_name:
        abort(400, 'Both pet_id and adopter_name are required.')

    pet = Pet.query.get(pet_id)
    if not pet:
        abort(404, 'Pet not found.')

    adoption = Adoption(pet_id=pet_id, adopter_name=adopter_name, adoption_date=datetime.now())
    db.session.add(adoption)
    db.session.commit()
    logger.info(f'Adoption created: {adoption.to_dict()}')
    return jsonify(adoption.to_dict()), 201

if __name__ == '__main__':
    app.run(debug=True)
