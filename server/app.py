from flask import Flask, jsonify, request
from models import Pet, Adoption, db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pets.db'
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
        return jsonify({'error': 'Pet not found'}), 404

@app.route('/adoptions', methods=['POST'])
def create_adoption():
    data = request.get_json()
    pet = Pet.query.get(data['pet_id'])
    if pet:
        adoption = Adoption(pet_id=data['pet_id'], adopter_name=data['adopter_name'])
        db.session.add(adoption)
        db.session.commit()
        return jsonify(adoption.to_dict()), 201
    else:
        return jsonify({'error': 'Pet not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)