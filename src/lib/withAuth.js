"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/'); // Redirige al inicio de sesión si no hay token
      } else {
        setLoading(false); // Token encontrado, permite mostrar el componente
      }
    }, [router]);

    if (loading) {
      return <p>Loading...</p>; // Mostrar un mensaje de carga mientras se verifica el token
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
