"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/pets");
    } else {
      setLoading(false); 
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token } = res.data;

      Cookies.set("token", token, { expires: 30, secure: true, sameSite: "strict" });
      router.push("/pets");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  if (loading) {
    return null; 
  }

  return (
    <div className="flex justify-center items-center p-5">
      <div className="bg-custom-image w-[400px] bg-no-repeat h-[90vh] relative m-auto flex justify-center items-end">


        <form onSubmit={handleSubmit} className="w-full relative flex flex-col gap-2 p-2 pb-28">
          {error && <p className="text-red-500">{error}</p>}
          <input
            className="bg-[#ffffff8d] rounded-[30px] p-3"
            type="text"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-[#ffffff8d] rounded-[30px] p-3"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#394b7d] p-3 rounded-[30px] text-white text-xl" type="submit">
            Ingresar
          </button>
        </form>


        
      </div>
    </div>
  );
}
