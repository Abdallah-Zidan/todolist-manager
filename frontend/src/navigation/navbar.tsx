import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Link,
  useColorModeValue,
  useBreakpointValue,
  useColorMode, useToast,
} from '@chakra-ui/react';

import { FaMoon, FaSun, FaTasks } from 'react-icons/fa';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../auth/api/api';
import { storage } from '../auth/common';
import { useAuthContext } from '../auth/auth-context';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  const toast = useToast();

  const authContext = useAuthContext();

  const { mutate: logoutUser } = useMutation(
    async () => await logout(),
    {
      onSuccess: () => {
        storage.clearTokens();
        window.location.href = '/login';
      },
      onError: () => {
        toast({
          title: 'Logout failure.',
          description: 'Failed to logout with backend.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      },
    },
  );

  const onLogoutHandler = async () => {
    logoutUser();
  };

  return (
    <>
      <Box>
        <Flex
          style={{ margin: 'auto', width: '92%' }}
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}
          alignItems={{ base: 'center' }}
        >

          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems={{ base: 'center' }}>

            <RouterLink to={'/todos'}>
              <Flex alignItems={{ base: 'center' }}>
                <FaTasks style={{ marginRight: '8px' }} />
                <Text
                  textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                  fontFamily={'heading'}
                  color={useColorModeValue('gray.800', 'white')}
                  cursor='pointer'
                >
                  {import.meta.env.VITE_APP_TITLE || 'TodoList'}
                </Text>
              </Flex>
            </RouterLink>

            <Flex ml={5} alignItems={{ base: 'center' }}>
              <Stack direction={'row'} spacing={4}>
                {!authContext.loggedIn &&
                  <><RouterLink to={'/login'}>
                    <Link
                      as='p'
                      p={2}
                      fontSize={'sm'}
                      fontWeight={500}
                      color={linkColor}
                      _hover={{
                        textDecoration: 'none',
                        color: linkHoverColor,
                      }}>
                      Login
                    </Link>
                  </RouterLink>
                    <RouterLink to={'/register'}>
                      <Link
                        as='p'
                        p={2}
                        fontSize={'sm'}
                        fontWeight={500}
                        color={linkColor}
                        _hover={{
                          textDecoration: 'none',
                          color: linkHoverColor,
                        }}>
                        Register
                      </Link>
                    </RouterLink>
                  </>
                }
                {authContext.loggedIn && <Link
                  onClick={onLogoutHandler}
                  as='p'
                  p={2}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  Logout
                </Link>}
              </Stack>
            </Flex>
          </Flex>
          <IconButton
            icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
            isRound={true}
            size='md'
            alignSelf='flex-end'
            onClick={toggleColorMode}
            aria-label='toogle-dark-mode'
          />
        </Flex>
      </Box>
      <Outlet />
    </>
  );
}

