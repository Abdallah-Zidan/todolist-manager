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
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/api';
import { LoginRequestData } from '../api/interfaces';
import { storage } from '../common';
import axios from 'axios';
import { useAuthContext } from '../auth-context';
import { useForm } from 'react-hook-form';
import Loader from '../../shared/loader';

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

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const { mutate: loginUser, isLoading, isError } = useMutation(
    (userData: LoginRequestData) => login(userData),
    {
      onSuccess: (data) => {
        storage.setToken(data.accessToken);
        storage.setRefreshToken(data.refreshToken);
        authContext.setLoggedIn(true);
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

          if (error.response?.status == 422) {
            message = error.response?.data?.message || message;
          }
        }
        toast({
          title: 'Login failed.',
          description: message,
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
        authContext.setLoggedIn(false);
      },
    },
  );

  if (isLoading) {
    return <Loader />;
  }

  async function onSubmit(data: any) {
    loginUser(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex height='90vh' alignItems='center' justifyContent='center'>
        <Flex
          flexDirection='column'
          bg={formBackground}
          p={12}
          borderRadius={8}
          boxShadow='lg'
          style={{
            minWidth: '450px',
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
                mb={errors.email ? 1 : 3}
                defaultValue=''
                borderColor={errors['email'] ? 'red.300' : 'transparent'}
                {...register('email', { required: 'Email is required', pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
              />
            </InputGroup>
            {errors.email && <div style={{
              color: 'red',
              marginBottom: '5px',
            }}>{errors.email?.type === 'pattern' ? 'Invalid Email' : errors?.email?.message?.toString() || 'invalid input'}</div>}
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
                mb={errors.password ? 1 : 6}
                defaultValue=''
                borderColor={errors['password'] ? 'red.300' : 'transparent'}
                {...register('password', { required: 'Password is required' })}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password &&
              <p style={{
                color: 'red',
                marginBottom: '5px',
              }}>{errors.password?.message?.toString() || 'invalid input'}</p>}
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
