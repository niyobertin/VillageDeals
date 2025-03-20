// src/hooks/useAppNavigation.ts
import { useNavigate } from 'react-router-dom';

export const useAppNavigation = () => {
  const navigate = useNavigate();

  return {
    goToHome: () => navigate('/'),
    goToLogin: () => navigate('/login'),
    goToRegister: () => navigate('/register'),
    goToProducts: () => navigate('/products'),
    goToProductDetail: (id: string) => navigate(`/products/${id}`),
    goToDashboard: () => navigate('/dashboard'),
    goToProfile: () => navigate('/profile'),
    goToCart: () => navigate('/cart'),
    goToCheckout: () => navigate('/checkout'),
    goBack: () => navigate(-1),
  };
};
