import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    destroyCookie(null, 'token', { path: '/' });
    router.push('/admin/login');
  }, [router]);

  return null;
}
