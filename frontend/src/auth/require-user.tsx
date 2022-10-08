import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAuthContext } from './context';
import { getProfile } from './api/api';
import Loader from '../shared/loader';
import { checkTokens, storage } from './common';

const RequireUser = ({ children }: any) => {
  const location = useLocation();
  const authContext = useAuthContext();
  if (!checkTokens()) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  const {
    isLoading,
    isFetching,
    data: user,
  } = useQuery(['authUser'], getProfile, {
    retry: 1,
    select: (data) => data,
    onSuccess: (data) => {
      authContext.dispatch({
        type: 'SET_USER',
        payload: { ...data, accessToken: storage.getToken() || '', refreshToken: storage.getRefreshToken() || '' },
      });
    },
  });

  const loading = isLoading || isFetching;

  if (loading) {
    return <Loader />;
  }

  return (storage.getLoggedIn() || user) ? (
    <>
      {children}
    </>
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireUser;
