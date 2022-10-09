import { createBrowserRouter, redirect } from 'react-router-dom';
import Todos from './todos/todos';
import Login from './auth/components/login';
import { throwRedirectIfUser } from './auth/common';
import Navbar from './navigation/navbar';
import { AuthContextProvider } from './auth/auth-context';
import RequireAuth from './auth/require-auth';
import Register from './auth/components/register';
import Notfound from './shared/notfound';

export const router = createBrowserRouter([{
  path: '/',
  errorElement: (<Notfound />),
  element: (
    <AuthContextProvider>
      <Navbar />
    </AuthContextProvider>
  ),
  children: [
    {
      path: '',
      loader: async () => {
        return redirect('/todos');
      },
    },
    {
      path: '/todos',
      element: (
        <RequireAuth>
          <Todos />
        </RequireAuth>
      ),
    },
    {
      path: '/login',
      loader: async () => {
        throwRedirectIfUser();
      },
      element: (<Login />),
    },
    {
      path: '/register',
      loader: async () => {
        throwRedirectIfUser();
      },
      element: (<Register />),
    },
  ],
}]);
