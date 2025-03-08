import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { RootState } from '@/redux/store';
import { AppDispatch } from '@/redux/store';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  return {
    currentUser,
    isLoading,
    error,
    isAuthenticated,
    isEmailVerified: currentUser?.emailVerified || false
  };
};
