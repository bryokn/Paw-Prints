// components/PetCard.js

import React from 'react';

function PetCard({ pet }) {
  return (
    <div className="pet-card">
      <img src={pet.image_url} alt={pet.name} className="pet-image" />
      <div className="pet-name">{pet.name}</div>
      <div className="pet-info">
        <div>Species: {pet.species}</div>
        <div>Breed: {pet.breed}</div>
        <div>Age: {pet.age}</div>
        <div>Size: {pet.size}</div>
        <div>Gender: {pet.gender}</div>
      </div>
    </div>
  );
}

export default PetCard;
