'use client'

import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
//import React from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  Input,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';


export default function WithSubnavigation({ handleLogin, handleLogout, user }) {
  const { isOpen, onToggle } = useDisclosure();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

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
        const data = await response.json();
        console.log('Login successful:', data);

        const { user } = data;
        localStorage.setItem('user', JSON.stringify(user));
        setShowSignInModal(false); // Close the modal
        setSuccessMessage('Successful sign in!');
        //onSignInSuccess(); // Call the onSignInSuccess callback
        navigate('/user');
      } else {
        setErrorMessage('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setErrorMessage('An error occurred during login');
    }
  };

  /**const handleSignIn = async (e) => {
    e.preventDefault();

    setErrorMessage(''); // Reset error message before submitting
    setSuccessMessage('');

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
        setShowSignInModal(false); // Close the modal
        
        setSuccessMessage('Successful sign in!');
        navigate('/user');
      } else {
        // Handle login error
        setErrorMessage('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setErrorMessage('An error occurred during login');
    }
  };**/


  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
  <Link to="/">
    <Text
      textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
      fontFamily={'Verdana'}
      fontWeight={'bold'}
      fontStyle={'italic'}
      fontSize={'xl'}
      color={useColorModeValue('gray.800', 'white')}
      _hover={{ color: 'blue' }}
    >
      Paw-Prints
    </Text>
  </Link>

  <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
    <DesktopNav />
  </Flex>
</Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={900}
            color={'white'}
            bg={'green.400'}
            href={'#'}
            _hover={{
              bg: 'blue.300',
            }} variant={''}
            onClick= {() => setShowSignInModal(true)}
            >
            Sign In
          </Button>

          <Modal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Sign In</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSignIn}>
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
      <Button colorScheme="blue" mr={3} onClick={handleSignIn}>
        Sign In
      </Button>
      <Button variant="ghost" onClick={() => setShowSignInModal(false)}>
        Cancel
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

          {/**<Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            href={'#'}
            _hover={{
              bg: 'pink.300',
            }}>
            Sign Up
          </Button>*/}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );

}

const DesktopNav = ({handleLogin, handleLogout, user}) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    //login logic here
    const userData = { username, password };
    handleLogin(userData);
    setIsOpen(false);
  };

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'md'}
                fontWeight={800}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: 'blue',
                }}>
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = (navItem) => {
  const { label, href, subLabel } = navItem;
  return (
    <Box
      as="a"
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = (navItem) => {
  const { label, children, href } = navItem;
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? '#'}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}>
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: 'About Paw Prints',
    href: '/about',
  },
  {
    label: 'Contact Us',
    href: '/contact',
  },
]