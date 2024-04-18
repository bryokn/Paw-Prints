// PetCard.js

import React from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

function PetCard({ pet }) {
  const handleAdopt = () => {
    const adopterName = prompt('Enter your name:');
    if (adopterName) {
      axios.post('http://localhost:5000/adoptions', {
        pet_id: pet.id,
        adopter_name: adopterName
      })
      .then(response => {
        alert('Adoption successful!');
      })
      .catch(error => {
        console.error('Error adopting pet:', error);
        alert('Error adopting pet. Please try again later.');
      });
    }
  };

  return (
    <div className="pet-card">
      <img src={pet.image_url} alt={pet.name} className="pet-image" />
      <div className="pet-details">
        <div className="pet-name">{pet.name}</div>
        <div className="pet-info">
          <div>Species: {pet.species}</div>
          <div>Breed: {pet.breed}</div>
          <div>Age: {pet.age}</div>
          <div>Size: {pet.size}</div>
          <div>Gender: {pet.gender}</div>
        </div>
        {pet.available && (
          <button onClick={handleAdopt}>Adopt</button>
        )}
      </div>
    </div>
  );
}

export default PetCard;
