"use client";

import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Cookies from 'js-cookie';
import btnBack from "../../img/btn-back.svg";
import btnClose from "../../img/btn-close.svg";
import Image from 'next/image';
import LogoutModal from '@/components/LogoutModal';

function Page() {
  const [mascota, setMascota] = useState({});
  const { id } = useParams();

  const getMascota = async () => {
    try {
      const token = Cookies.get('token');
      const respuesta = await axios.get(`http://localhost:3000/api/mascotas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMascota(respuesta.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    getMascota();
  }, [id]);

  return (
    <div className='flex justify-center items-center p-5'>
      <div className='bg-back-image w-[400px] bg-no-repeat h-[90vh] flex flex-col p-3 gap-3'>
        <div className='flex h-12 w-full justify-center items-center gap-4 py-8'>
          <Link href="/pets">
            <Image src={btnBack} alt='btn-back' />
          </Link>
          <h1 className='text-white text-center w-full'>Consultar mascota</h1>
          <div>
            <LogoutModal />
          </div>
        </div>
        <div className='h-64 flex justify-center items-center'>
          <div className='bg-gray-300 rounded-full border-2 border-gray-500 w-40 h-40 text-center'>
            {mascota.photo ? (
              <img src={`/uploads/${mascota.photo}`} alt={mascota.name} className="rounded-full h-full w-full object-cover" />
            ) : (
              <p>Sin imagen</p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className=' flex w-full overflow-hidden'>
            <div className=' bg-[#ffffff56] rounded-l-lg flex items-center justify-center p-2 w-[200px]'><h1 className='font-bold text-white'>Nombre:</h1></div>
            <input className='p-3 bg-[#ffffff82] placeholder:text-[#363360] w-full rounded-r-lg' type="text" value={mascota.name} readOnly />
          </div>
          <div className=' flex w-full'>
            <div className='  bg-[#ffffff56] rounded-l-lg  flex items-center justify-center p-2 w-[200px]'><h1 className='font-bold text-white'>Raza:</h1></div>
            <input className='p-3 w-full bg-[#ffffff82] placeholder:text-[#333a60] rounded-r-lg' type="text" value={mascota.fk_race?.name} readOnly />
          </div>
          <div className=' flex w-full'>
            <div className='  bg-[#ffffff56] rounded-l-lg  flex items-center justify-center p-2 w-[200px]'><h1 className='font-bold text-white'>Categoría:</h1></div>
            <input className='p-3 w-full bg-[#ffffff82] placeholder:text-[#333a60] rounded-r-lg' type="text" value={mascota.fk_category?.name} readOnly />
          </div>
          <div className=' flex w-full'>
            <div className='  bg-[#ffffff56] rounded-l-lg  flex items-center justify-center p-2 w-[200px]'><h1 className='font-bold text-white'>Género:</h1></div>
            <input className='p-3 w-full bg-[#ffffff82] placeholder:text-[#333a60] rounded-r-lg' type="text" value={mascota.fk_gender?.name} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
