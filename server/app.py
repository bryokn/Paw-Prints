#import necessary modules
from flask import Flask, jsonify, request, abort
from flask_migrate import Migrate
from models import db, Pet, Adoption #import db models
from datetime import datetime
import logging

app = Flask(__name__) #Flask app instance
#configure app db settings
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pets.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key_here'

#logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

#initialize db and migrate
db.init_app(app)
migrate = Migrate(app, db)

#add CORS headers to the response
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

#retrieve all pets endpoint
@app.route('/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.all()
    return jsonify([pet.to_dict() for pet in pets])

#retrieve single pet by ID endpoint
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
    #update pet attributes based on provided info
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

#endpoint to delete pet by ID
@app.route('/pets/<int:pet_id>', methods=['DELETE'])
def delete_pet(pet_id):
    pet = Pet.query.get(pet_id)
    if not pet:
        abort(404, 'Pet not found')
    #DELETE ALL ADOPTIONS ASSOCIATED WITH THE PET
    adoptions = Adoption.query.filter_by(pet_id=pet_id).all()
    for adoption in adoptions:
        db.session.delete(adoption)
    #delete the pet
    db.session.delete(pet)
    db.session.commit()
    return jsonify({'message': 'Pet deleted successfully'})
#create new adoption endpoint
@app.route('/adoptions', methods=['POST'])
def create_adoption():
    data = request.get_json()
    pet_id = data.get('pet_id')
    adopter_name = data.get('adopter_name')

    if not pet_id or not adopter_name:
        abort(400, 'Both pet_id and adopter_name are required.')

    pet = Pet.query.get(pet_id)
    if pet and pet.available:  # Check if pet is available for adoption
        adoption = Adoption(pet_id=pet_id, adopter_name=adopter_name, adoption_date=datetime.now())
        pet.available = False  # Set pet availability to False
        db.session.add(adoption)
        db.session.commit()
        return jsonify(adoption.to_dict()), 201
    else:
        return jsonify({'error': 'Pet not found or not available for adoption'}), 404
#Run flask app
if __name__ == '__main__':
    app.run(debug=True)