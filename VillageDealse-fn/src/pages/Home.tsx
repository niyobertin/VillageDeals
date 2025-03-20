// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { useAppNavigation } from '../hooks/useAppNavigation';

const Home = () => {
  const navigation = useAppNavigation();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Village Deals</h1>
      <p className="text-xl mb-2">Find the best deals for your village needs!</p>

      <div className="flex justify-center gap-4">
        <button
          onClick={navigation.goToProducts}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Products
        </button>
        <Link
          to="/register"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Home;
