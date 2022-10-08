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
import { useAuthContext } from '../context';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { login } from '../api/api';
import { LoginRequestData } from '../api/interfaces';
import { storage } from '../common';
import axios from 'axios';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const location = useLocation();
  const from = ((location.state as any)?.from.pathname as string) || '/';

  const authContext = useAuthContext();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const { mutate: loginUser, isLoading } = useMutation(
    (userData: LoginRequestData) => login(userData),
    {
      onSuccess: (data) => {
        authContext.dispatch({ type: 'SET_USER', payload: data || null });
        storage.setToken(data.accessToken);
        storage.setRefreshToken(data.refreshToken);
        storage.setLoggedIn();
        toast({
          title: 'Successful login.',
          description: 'You have successfully logged in',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        navigate(from);
      },
      onError: (error: any) => {
        let message = 'Your request to login has failed.';
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
        authContext.dispatch({ type: 'SET_USER', payload: null });
      },
    },
  );


  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    loginUser({ email, password });
  }

  return (
    <form onSubmit={handleLogin}>
      <Flex height='90vh' alignItems='center' justifyContent='center'>
        <Flex
          flexDirection='column'
          bg={formBackground}
          p={12}
          borderRadius={8}
          boxShadow='lg'
          style={{
            minWidth:'450px'
          }}
        >
          <Heading mb={6}>Log In</Heading>
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

          <Button colorScheme='teal' mb={8} type='submit'>
            Log In
          </Button>
          <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='dark_mode' mb='0'>
              Not a user ?
            </FormLabel>

            <Link to='/register'>
              <Text textColor='teal' style={{ textDecoration: 'underline' }}>
                Register
              </Text>
            </Link>
          </FormControl>
        </Flex>
      </Flex>
    </form>
  );
};

export default Login;
