// App.js

import React, { useState, useEffect } from 'react';
import PetCard from './components/PetCard';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from backend API when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/pets');
      const data = await response.json();
      setPets(data);
      setFilteredPets(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredPets(pets);
    } else {
      const filtered = pets.filter((pet) =>
        pet.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPets(filtered);
    }
  };

  return (
    <div className="App">
      <h1>Welcome To Pet Adoption Center</h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <div className="pet-grid">
        {filteredPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}

export default App;
