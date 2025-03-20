// src/routes/Router.tsx
import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { publicRoutes, protectedRoutes } from './routes';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AppRoutes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.element />} />
        ))}

        {/* Protected Routes */}
        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={isAuthenticated ? <route.element /> : <Navigate to="/login" />}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
