import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import MainLayout from './layouts/MainLayout';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import ExploreRooms from './pages/rooms/ExploreRooms';
import CreateRoom from './pages/rooms/CreateRoom';
import PeopleSearch from './pages/people/PeopleSearch';
import Profile from './pages/profile/Profile';
import Search from './pages/Search';
import TailwindTest from './pages/TailwindTest';
import App from './App';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<ExploreRooms />} />
          <Route path="/rooms/create" element={<CreateRoom />} />
          <Route path="/people" element={<PeopleSearch />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Route>

        <Route path="/workspace/:id" element={<ProtectedRoute><App /></ProtectedRoute>} />
        <Route path="/test" element={<TailwindTest />} />
      </Routes>
    </BrowserRouter>
  );
}
