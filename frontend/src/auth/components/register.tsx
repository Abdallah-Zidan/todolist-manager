import React, { EventHandler, FormEvent, useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  useColorModeValue,
  Text, InputGroup, InputLeftElement, chakra, InputRightElement,
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { register } from '../api/api';
import { RegisterRequestData } from '../api/interfaces';
import axios from 'axios';
import Loader from '../../shared/loader';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Register = () => {
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const handleShowConfirmationClick = () => setShowPasswordConfirmation(!showPasswordConfirmation);

  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');


  const { mutate: registerUser, isLoading } = useMutation(
    (userData: RegisterRequestData) => register(userData),
    {
      onSuccess: (data) => {
        toast({
          title: 'Account created.',
          description: 'You have successfully created a new account you can login',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        navigate('/login');
      },
      onError: (error: any) => {
        let message = 'Your request to create an account has failed.';
        if (axios.isAxiosError(error)) {
          message = error.response?.statusText || message;
        }
        toast({
          title: 'Login failed.',
          description: message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      },
    },
  );

  if(isLoading){
    return  <Loader/>
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    registerUser({ email, password, passwordConfirmation, name });
  }

  return (
    <form onSubmit={handleRegister}>
      <Flex h='100vh' alignItems='center' justifyContent='center'>
        <Flex
          flexDirection='column'
          bg={formBackground}
          p={12}
          borderRadius={8}
          boxShadow='lg'
        >
          <Heading mb={6}>Create a new account</Heading>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<CFaUserAlt color='gray.300' />}
              />
              <Input
                type='name'
                placeholder='name'
                variant='filled'
                mb={3}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<CFaUserAlt color='gray.300' />}
              />
              <Input
                type='email'
                placeholder='email address'
                variant='filled'
                mb={3}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                children={<CFaLock color='gray.300' />}
              />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                variant='filled'
                mb={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                children={<CFaLock color='gray.300' />}
              />
              <Input
                type={showPasswordConfirmation ? 'text' : 'password'}
                placeholder='Password confirmation'
                variant='filled'
                mb={6}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleShowConfirmationClick}>
                  {showPasswordConfirmation ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button colorScheme='teal' mb={8} type='submit'>
            Create Account
          </Button>
          <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='dark_mode' mb='0'>
              Already a user ?
            </FormLabel>
            <Link to='/login'>
              <Text textColor='teal' style={{ textDecoration: 'underline' }}>
                Login
              </Text>
            </Link>
          </FormControl>
        </Flex>
      </Flex>
    </form>
  );
};

export default Register;
