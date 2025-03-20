/* eslint-disable @typescript-eslint/no-explicit-any */
// src/routes/routes.ts
import { lazy } from 'react';

// Use lazy loading for better performance
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
// const Register = lazy(() => import('../pages/Register'));
// const Dashboard = lazy(() => import('../pages/Dashboard'));
// const ProductList = lazy(() => import('../pages/ProductList'));
// const ProductDetail = lazy(() => import('../pages/ProductDetail'));
// const Cart = lazy(() => import('../pages/Cart'));
// const Checkout = lazy(() => import('../pages/Checkout'));
// const NotFound = lazy(() => import('../pages/NotFound'));
// const Profile = lazy(() => import('../pages/Profile'));

// Define route types
export interface RouteConfig {
  path: string;

  element: React.LazyExoticComponent<React.ComponentType<any>>;
  children?: RouteConfig[];
  auth?: boolean;
}

// Public routes (no authentication required)
export const publicRoutes: RouteConfig[] = [
  {
    path: '/',
    element: Home,
  },
  {
    path: '/login',
    element: Login,
  },
  //   {
  //     path: '/register',
  //     element: Register,
  //   },
  //   {
  //     path: '/products',
  //     element: ProductList,
  //   },
  //   {
  //     path: '/products/:id',
  //     element: ProductDetail,
  //   },
  //   {
  //     path: '*',
  //     element: NotFound,
  //   },
];

// Protected routes (authentication required)
export const protectedRoutes: RouteConfig[] = [
  //   {
  //     path: '/dashboard',
  //     element: Dashboard,
  //     auth: true,
  //   },
  //   {
  //     path: '/profile',
  //     element: Profile,
  //     auth: true,
  //   },
  //   {
  //     path: '/cart',
  //     element: Cart,
  //     auth: true,
  //   },
  //   {
  //     path: '/checkout',
  //     element: Checkout,
  //     auth: true,
  //   },
];

// Combined routes
export const routes = [...publicRoutes, ...protectedRoutes];
