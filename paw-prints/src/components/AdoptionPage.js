// AdoptionPage.js
import React from 'react';
import '../App.css';
import { useLocation } from 'react-router-dom';

const AdoptionPage = () => {
  const location = useLocation();
  const { selectedPet, loggedInUser } = location.state || {};

  return (
    <div>
      {selectedPet && (
        <div>
          <h1>Adopt {selectedPet.name}</h1>
          {loggedInUser && <p>Welcome, {loggedInUser.username}!</p>}
          <img src={selectedPet.image_url} alt={selectedPet.name} />
          <h3>
            {selectedPet.name} is a {selectedPet.age} year old{' '}
            {selectedPet.breed}.
          </h3>
          <p><h4><i>Likes:</i></h4>{selectedPet.likes}</p>
          <p>
            <h4>
              <i>About:</i>
            </h4>
            {selectedPet.about}
          </p>
          <p>
            <h4>
              <i>Size:</i>
            </h4>{' '}
            {selectedPet.size}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdoptionPage;