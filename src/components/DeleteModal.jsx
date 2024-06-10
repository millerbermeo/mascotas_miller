"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';
import btnDelete from "../../src/app/img/btn-delete.svg";

const DeleteModal = ({ petId, getMascotas }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const token = Cookies.get('token');
      await axios.delete(`http://localhost:3000/api/mascotas/${petId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      getMascotas()
      // Llama a la función de éxito de eliminación proporcionada
      setIsModalOpen(false); // Cierra el modal después de eliminar
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        <Image src={btnDelete} alt='btn-delete' />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">¿Desea eliminar esta mascota?</h2>
            <div className="flex justify-between">
              <button 
                onClick={handleDelete} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Sí, eliminar
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

export default DeleteModal;
