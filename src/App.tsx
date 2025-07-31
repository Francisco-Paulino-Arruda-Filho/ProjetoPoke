import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './components/Layout/Layout';
import AuthLayout from './components/AuthLayout/AuthLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout com TopBar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* outras páginas protegidas */}
        </Route>

        {/* Layout sem TopBar */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
