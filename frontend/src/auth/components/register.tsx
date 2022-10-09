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
import { useForm } from 'react-hook-form';

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
  const { register: registerField, handleSubmit, watch, formState: { errors }, setError } = useForm();

  const { mutate: registerUser, isLoading } = useMutation(
    (userData: RegisterRequestData) => register(userData),
    {
      onSuccess: (data) => {
        toast({
          title: 'Account created.',
          description: 'You have successfully created a new account you can login',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
        navigate('/login');
      },
      onError: (error: any) => {
        let message = 'Your request to create an account has failed.';
        if (axios.isAxiosError(error)) {
          message = error.response?.statusText || message;
          if (error.response?.status === 422) {
            if (Array.isArray(error.response?.data)) {
              error.response.data.forEach(err => {
                if (err?.path?.[0]) {
                  setError(err.path[0], {
                    message: err.message,
                  }, {
                    shouldFocus: true,
                  });
                }
              });
            }

          }
        }
        toast({
          title: 'Login failed.',
          description: message,
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
      },
    },
  );

  if (isLoading) {
    return <Loader />;
  }

  async function onSubmit(data: any) {
    registerUser(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex h='90vh' alignItems='center' justifyContent='center'>
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
                mb={errors.name ? 1 : 3}
                borderColor={errors['name'] ? 'red.300' : 'transparent'}
                {...registerField('name', {
                  required: 'Name is required', maxLength: {
                    value: 155,
                    message: 'Name must not exceed 155 characters length',
                  }, minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters long',
                  },
                })}
              />
            </InputGroup>
            {errors.name &&
              <p style={{
                color: 'red',
                marginBottom: '5px',
              }}>{errors.name?.message?.toString() || 'invalid input'}</p>}

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
                mb={errors.email ? 1 : 3}
                borderColor={errors['email'] ? 'red.300' : 'transparent'}
                {...registerField('email', {
                  required: 'Email is required',
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
              />
            </InputGroup>
            {errors.email &&
              <p style={{
                color: 'red',
                marginBottom: '5px',
              }}>{errors.email?.message?.toString() || 'invalid input'}</p>}

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
                borderColor={errors['password'] ? 'red.300' : 'transparent'}
                {...registerField('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                  maxLength: {
                    value: 155,
                    message: 'Password must not exceed 150 characters length',
                  },
                })}
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
                mb={errors.passwordConfirmation ? 1 : 6}
                borderColor={errors['passwordConfirmation'] ? 'red.300' : 'transparent'}
                {...registerField('passwordConfirmation', {
                  required: 'Password Confirmation is required',
                  minLength: {
                    value: 6,
                    message: 'Password Confirmation must be at least 6 characters long',
                  },
                  maxLength: {
                    value: 155,
                    message: 'Password Confirmation must not exceed 150 characters length',
                  },
                  deps: 'password',
                })}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleShowConfirmationClick}>
                  {showPasswordConfirmation ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.passwordConfirmation &&
              <p style={{
                color: 'red',
                marginBottom: '5px',
              }}>{errors.passwordConfirmation?.message?.toString() || 'invalid input'}</p>}
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
