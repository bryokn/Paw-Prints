import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSignInModal, setShowSignInModal] = useState(true); // Set the initial state to true
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage(''); // Reset error message before submitting

    // Form validation
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Handle successful login
        const data = await response.json();
        console.log('Login successful:', data);

        const { user } = data;
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      } else {
        // Handle login error
        setErrorMessage('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setErrorMessage('An error occurred during login');
    }
  };

  return (
    <div>
      <Modal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage('');
                  }}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                  }}
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Sign In
            </Button>
            <Button variant="ghost" onClick={() => setShowSignInModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SignInPage;