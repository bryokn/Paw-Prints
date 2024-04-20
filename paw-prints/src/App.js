import React, { useState, useEffect } from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import WithSubnavigation from './components/WithSubnavigation';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';

function App() {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);

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

  //handle viewing pet details
  const handleViewPet = (pet) => {
    setSelectedPet(pet);
  };

  // Handle closing the pet details
  const handleCloseDetails = () => {
    setSelectedPet(null);
  };

  // Handle adoption process
  const handleAdoption = () => {
    const confirmAdoption = window.confirm(
      'To adopt this pet, you need to log in or create an account. Do you want to proceed?'
    );

    if (confirmAdoption) {
      // Navigate to the login page
      window.location.href = '/login';
    }
  };

  // Handle closing modals
  const handleCloseModals = () => {
    setShowAdoptionModal(false);
  };

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
    <ChakraProvider>
      <Router>
        <WithSubnavigation />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <div className="App">
              {/**<h1>Paw-Prints</h1>*/}
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
                    {/**<p>Species: {pet.species}</p>
                    <p>Breed: {pet.breed}</p>
                    <p>Age: {pet.age}</p>*/}
                    <p>Gender: {pet.gender}</p>
                    <p>Available: {pet.available ? 'Yes' : 'No'}</p>
                    {pet.available && ( // Render adopt button if the pet is available
                      // <button className="adopt-button" onClick={() => handleAdopt(pet.id)}>Adopt</button>
                      <button className="view-button" onClick={() => handleViewPet(pet)}>View More about {pet.name}</button>
                    )}
                  </div>
                ))}
              </div>
              {selectedPet && (
                <div className="pet-details-modal">
                  <div className="pet-details-content">
                    <h2>Know more about {selectedPet.name}</h2>
                    <h3>{selectedPet.name} is a {selectedPet.age} year old {selectedPet.breed}.</h3>
                    <p><h4><i>Likes:</i></h4>{selectedPet.likes}</p>
                    <p><h4><i>About:</i></h4>{selectedPet.about}</p>
                    <p><h4><i>Size:</i></h4> {selectedPet.size}</p>
                    <button className="adopt-button" onClick={handleAdoption}>
                      Adopt {selectedPet.name}
                    </button>
                    <br />
                    <br />
                    <button className="cancel-button" onClick={handleCloseDetails}>Close</button>
                  </div>
                </div>
              )}
              {showAdoptionModal && (
                <div className="adoption-modal">
                  <div className="adoption-modal-content">
                    <h2>Adopt {selectedPet.name}</h2>
                    <p>Please log in or create an account to adopt {selectedPet.name}.</p>
                    <Link to="/login">
                      <button className="login-button">Login</button>
                    </Link>
                    <br />
                    <br />
                    <Link to="/create-account">
                      <button className="create-ac-button">Create Account</button>
                    </Link>
                    <br />
                    <br />
                    <button className="cancel-button" onClick={handleCloseModals}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          } />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;