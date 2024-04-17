// components/PetCard.js

import React from 'react';

function PetCard({ pet }) {
  return (
    <div className="pet-card">
      <img src={pet.imageUrl} alt={pet.name} />
      <div className="pet-info">
        <h2>{pet.name}</h2>
        <p>Species: {pet.species}</p>
        <p>Breed: {pet.breed}</p>
        <p>Age: {pet.age}</p>
        <p>Location: {pet.location}</p>
      </div>
    </div>
  );
}

export default PetCard;
