import { useEffect } from 'react';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import AdminLayout from './layout';

const AdminHome = () => {
  const router = useRouter();

  useEffect(() => {
    const token = cookie.get('auth');
    console.log('Token from cookie:', token);

    if (!token) {
      console.log('No token found, redirecting to login');
      router.push('/admin/login');
    } else {
      console.log('Token found, staying on admin page');
    }
  }, []);

  return (
    <AdminLayout>
      <h1>Welcome to Admin Dashboard</h1>
    </AdminLayout>
  );
};

export default AdminHome;
