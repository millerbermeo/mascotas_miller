"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';
import btnClose from "../../src/app/img/btn-close.svg";

const LogoutModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = Cookies.get('token');
      await axios.get("http://localhost:3000/api/auth/logout/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      Cookies.remove('myTokenName'); 
      router.push("/"); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        <Image src={btnClose} alt='btn-close' />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">¿Desea cerrar la aplicación?</h2>
            <div className="flex justify-between">
              <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Sí, cerrar sesión
              </button>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutModal;
