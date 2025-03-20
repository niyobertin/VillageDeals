// src/App.tsx
// import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/Router';
import MainLayout from './components/common/MainLayout';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/common/ErrorFallback';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {/* <BrowserRouter> */}
      <MainLayout>
        <AppRoutes />
      </MainLayout>
      {/* </BrowserRouter> */}
    </ErrorBoundary>
  );
}

export default App;
