import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  //state variables for the list of pets and the search term
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  //fetch list of pets from the server whe component mounts
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

  // handle search input change
  const handleSearch = (event) =>{
    setSearchTerm(event.target.value);
  }

  //filter pets based on search term
  const filteredPets = pets.filter(pet => 
  pet.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="App">
      <h1>Paw-Prints</h1>
      <h2>Where Every Paw Finds Its Perfect Print</h2>
      <h3><i>Your Path to Pet Adoption!</i></h3>
      {/**Render search input */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      {/* Render the list of pets */}
      <div className="pet-container">
        {filteredPets.map(pet => (
          <div key={pet.id} className="pet-tile">
            {/* Render the pet's image, name, and other details */}
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