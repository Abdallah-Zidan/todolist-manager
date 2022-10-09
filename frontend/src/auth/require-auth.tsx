import { useQuery } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router-dom';
import { refreshAccessToken } from './api/api';
import Loader from '../shared/loader';
import { checkAccessToken, checkRefreshToken, storage } from './common';
import { useAuthContext } from './auth-context';

const RequireAuth = ({ children }: any) => {
  const location = useLocation();
  const authContext = useAuthContext();

  if (checkAccessToken()) {
    authContext.setLoggedIn(true);
    return <>
      {children}
    </>;
  }

  if (checkRefreshToken()) {
    const {
      isLoading,
      isFetching,
      data: user,
      isError,
    } = useQuery(['refreshToken'], refreshAccessToken, {
      retry: 1,
      onSuccess: (data) => {
        storage.setToken(data.accessToken);
        storage.setRefreshToken(data.refreshToken);
        authContext.setLoggedIn(true);
      },
    });
    const loading = isLoading || isFetching;

    if (loading) {
      return <Loader />;
    }
    if (isError) {
      authContext.setLoggedIn(false);
      return <Navigate to='/login' state={{ from: location }} replace />;
    }
  }
  authContext.setLoggedIn(false);
  return <Navigate to='/login' state={{ from: location }} replace />;
};

export default RequireAuth;
