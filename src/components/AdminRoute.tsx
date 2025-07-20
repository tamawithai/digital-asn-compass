import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Tampilkan loading indicator jika status auth masih diperiksa
    return <div>Loading...</div>;
  }

  // Jika sudah tidak loading dan user adalah admin, tampilkan konten halaman admin.
  // Jika tidak, arahkan ke halaman utama.
  return user?.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;