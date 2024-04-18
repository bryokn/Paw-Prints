// App.js

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPets(); // Fetch pets when component mounts
  }, []);

  // Fetch list of pets
  const fetchPets = () => {
    fetch('http://localhost:5000/pets', {
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => {
        setPets(data);
      })
      .catch(error => console.error('Error fetching pets:', error));
  };

  // Handle search input change
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  // Filter pets based on search term
  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adoption of a pet
  const handleAdopt = (petId) => {
    const adopterName = prompt('Enter your name:');
    if (adopterName) {
      fetch('http://localhost:5000/adoptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pet_id: petId,
          adopter_name: adopterName,
        }),
      })
      .then(response => {
        if (response.ok) {
          fetchPets(); // Refresh the list of pets after adoption
          alert('Adoption successful!');
        } else {
          throw new Error('Adoption failed.');
        }
      })
      .catch(error => {
        console.error('Error adopting pet:', error);
        alert('Error adopting pet. Please try again later.');
      });
    }
  };

  return (
    <div className="App">
      <h1>Paw-Prints</h1>
      <h2>Where Every Paw Finds Its Perfect Print</h2>
      <h3>
        <i>Your Path to Pet Adoption!</i>
      </h3>
      {/* Render search input */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      {/* Render the list of pets */}
      <div className="pet-container">
        {filteredPets.map(pet => (
          <div key={pet.id} className="pet-tile pet-card">
            {/* Render the pet's image, name, and other details */}
            <img src={pet.image_url} alt={pet.name} width="200" height="150" />
            <h2>{pet.name}</h2>
            <p>Species: {pet.species}</p>
            <p>Breed: {pet.breed}</p>
            <p>Age: {pet.age}</p>
            <p>Gender: {pet.gender}</p>
            <p>Size: {pet.size}</p>
            <p>Available: {pet.available ? 'Yes' : 'No'}</p>
            {pet.available && ( // Render adopt button if the pet is available
              <button className="adopt-button" onClick={() => handleAdopt(pet.id)}>Adopt</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

