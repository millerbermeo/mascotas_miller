"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import axios from 'axios';
import btnAdd from "../img/btn-add.svg";
import btnClose from "../img/btn-close.svg";
import btnDelete from "../img/btn-delete.svg";
import btnEdit from "../img/btn-edit.svg";
import btnShow from "../img/btn-show.svg";
import btnBack from "../img/btn-back.svg";
import Image from 'next/image';
import withAuth from '@/lib/withAuth';
import LogoutModal from '@/components/LogoutModal';
import DeleteModal from '@/components/DeleteModal';

function Page() {
  const [mascotas, setMascotas] = useState([]);

  const getMascotas = async () => {
    const respuesta = await axios.get("/api/mascotas", {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    });
    const data = respuesta.data.datos;
    setMascotas(data);
  };

  useEffect(() => {
    getMascotas();
  }, []);

  return (
    <div className='flex justify-center items-center p-5'>
      <div className='bg-back-image w-[400px] bg-no-repeat h-[90vh] flex flex-col p-3 gap-3'>
        <div className='flex h-12 w-full justify-center items-center gap-4 '>
          <Link href="/">
            <Image className='' src={btnBack} alt='btn-back' />
          </Link>
          <h1 className='text-white text-center w-full'>Administrar mascotas</h1>
          <div>
            <LogoutModal />
          </div>
        </div>
        <div>
          <Link href="/registrar">
            <Image className='w-full' src={btnAdd} alt='btn-register' />
          </Link>
        </div>
        <div className='h-[75%]  overflow-y-auto pb-20'>
          {
            mascotas.map(mascota => (
              <div key={mascota.id} className='bg-white bg-opacity-50 hover:bg-opacity-70 cursor-pointer rounded-[25px] p-2 flex mb-3'>
                <div className='flex w-full justify-start items-center gap-2'>
                  <div className='h-20 w-20 bg-white  border-blue-500 border-[2px] rounded-full flex justify-center items-center'>
                    <img src={`uploads/${mascota.photo}`} alt={mascota.name} className="rounded-full h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col w-2/3">
                    <h1 className='font-normal text-blue-800'>{mascota.name}</h1>
                    <h2 className='text-gray-700'>{mascota.race}</h2>
                  </div>
                </div>
                <div className='flex w-1/3 justify-center items-center gap-2'>
                  <div className='cursor-pointer flex justify-center items-center'>
                    <Link href={`/mostrar/${mascota.id}`}>
                      <Image src={btnShow} alt='mostrar' />
                    </Link>
                  </div>
                  <div className='cursor-pointer flex justify-center items-center'>
                    <Link href={`/update/${mascota.id}`}>
                      <Image src={btnEdit} alt='editar' />
                    </Link>
                  </div>
                  <div className='cursor-pointer flex justify-center items-center pt-1.5'>
                  <DeleteModal petId={mascota.id} getMascotas={getMascotas} />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default withAuth(Page);
