import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

const AdminLayout = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    cookie.remove('auth'); // Remove the authentication token
    router.push('/admin/login'); // Redirect to the login page
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <nav className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-6">
          <Link href="/admin">
            <Image src="/images/logo/logo.png" alt="Logo" width={150} height={150} className="mx-auto" />
          </Link>
        </div>
        <h2 className="text-xl font-semibold mb-6 text-center">
          <Link href="/admin">Admin Panel</Link>
        </h2>
        <ul>
          <li className="mb-4">
            <Link href="/admin/banner" legacyBehavior>
              <a className="hover:text-blue-300 transition-colors duration-300">Manage Banners</a>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/company-profile" legacyBehavior>
              <a className="hover:text-blue-300 transition-colors duration-300">Manage Company Profile</a>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/catalog" legacyBehavior>
              <a className="hover:text-blue-300 transition-colors duration-300">Manage Catalog</a>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/facilities" legacyBehavior>
              <a className="hover:text-blue-300 transition-colors duration-300">Manage Facilities</a>
            </Link>
          </li>
          <li className="mt-8">
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-400 hover:text-red-600 transition-colors duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
