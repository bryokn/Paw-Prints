import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/pets', {
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => {
        setPets(data);
      })
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  const handleSearch = (event) =>{
    setSearchTerm(event.target.value);
  }

  const filteredPets = pets.filter(pet => 
  pet.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="App">
      <h1>Pet Adoption</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="pet-container">
        {filteredPets.map(pet => (
          <div key={pet.id} className="pet-tile">
            <img src={pet.image_url} alt={pet.name} width="200" height="150" />
            <h2>{pet.name}</h2>
            <p>Species: {pet.species}</p>
            <p>Breed: {pet.breed}</p>
            <p>Age: {pet.age}</p>
            <p>Gender: {pet.gender}</p>
            <p>Size: {pet.size}</p>
            <p>Available: {pet.available ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default App;