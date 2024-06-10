"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import axios from 'axios';
import camera from "../img/photo-lg-0.svg";
import btnSave from "../img/btn-save.svg";
import btnClose from "../img/btn-close.svg";
import btnBack from "../img/btn-back.svg";
import LogoutModal from '@/components/LogoutModal';
import { useRouter } from "next/navigation";

function Page() {
  const [razas, setRazas] = useState([]);
  const [category, setCategory] = useState([]);
  const [genders, setGenders] = useState([]);
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [pet, setPet] = useState({
    name: "",
    race_id: "",
    category_id: "",
    gender_id: "",
  });

  const getRazas = async () => {
    try {
      const token = Cookies.get('token');
      const razas = await axios.get("/api/razas", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const respuesta = razas.data.datos;
      setRazas(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      const token = Cookies.get('token');
      const categorias = await axios.get("/api/categorias", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const respuesta = categorias.data.datos;
      setCategory(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenders = async () => {
    try {
      const token = Cookies.get('token');
      const generos = await axios.get("/api/generos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const respuesta = generos.data.datos;
      setGenders(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  const inputValue = (event) => {
    setPet({
      ...pet,
      [event.target.name]: event.target.value
    });
  };

  const postMascota = async (event) => {
    event.preventDefault();
    try {
      const token = Cookies.get('token');
      const formData = new FormData();
      formData.append('name', pet.name);
      formData.append('race_id', parseInt(pet.race_id, 10));
      formData.append('category_id', parseInt(pet.category_id, 10));
      formData.append('gender_id', parseInt(pet.gender_id, 10));
      formData.append('photo', file);

      const registro = await axios.post("/api/mascotas", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      router.push("/pets");
      console.log(registro);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getRazas();
    getCategory();
    getGenders();
  }, []);

  return (
    <div className='flex justify-center items-center p-5'>
      <div className='bg-back-image w-[400px] bg-no-repeat h-[90vh] flex flex-col p-3 gap-3'>
        <div className='flex h-12 w-full justify-center items-center gap-4 py-8'>
          <Link href="/pets">
            <Image src={btnBack} alt='btn-back' />
          </Link>
          <h1 className='text-white text-center w-full'>Adicionar mascotas</h1>
          <div>
            <LogoutModal />
          </div>
        </div>
        <div className='h-64 flex justify-center items-center'>
          <div className='rounded-full overflow-hidden w-32 h-32 bg-green-100 border-2 border-gray-500 flex justify-center items-center'>
            {file ? (
              <Image
                className='w-full h-full'
                src={URL.createObjectURL(file)}
                alt='img'
                width={100}
                height={100}
              />
            ) : (
              <Image src={camera} alt='camera' />
            )}
          </div>
        </div>
        <div className="">
          <form className='flex flex-col items-center gap-3 px-2' onSubmit={postMascota}>
            <input
              name='name'
              onChange={inputValue}
              className='p-3 w-full bg-[#ffffffa5] outline-none placeholder:text-[#252f7c] rounded-[30px]'
              type="text"
              placeholder='Nombre'
            />
            <select
              name='race_id'
              onChange={inputValue}
              className='p-3 w-full bg-[#ffffffa5] outline-none rounded-[30px]'
            >
              <option value="">Seleccione Raza...</option>
              {razas.map(raza => (
                <option key={raza.id} value={raza.id}>
                  {raza.name}
                </option>
              ))}
            </select>
            <select
              name='category_id'
              onChange={inputValue}
              className='p-3 w-full bg-[#ffffffa5] outline-none rounded-[30px]'
            >
              <option value="">Seleccione Categoría...</option>
              {category.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              name='photo'
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              className='p-3 w-full bg-[#ffffffa5] outline-none placeholder:text-[#252f7c] rounded-[30px]'
              type="file"
              placeholder='Subir Foto'
            />
            <select
              name='gender_id'
              onChange={inputValue}
              className='p-3 w-full bg-[#ffffffa5] outline-none rounded-[30px]'
            >
              <option value="">Seleccione Género...</option>
              {genders.map(gender => (
                <option key={gender.id} value={gender.id}>
                  {gender.name}
                </option>
              ))}
            </select>
            <div>
              <button className='w-full' type='submit'>
                <Image src={btnSave} className='wfull' alt='btn save' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
