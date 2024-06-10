import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || "secret"; // Usa una variable de entorno en producción

export async function verifyToken(request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  console.log("Token recibido:", token);

  if (!token) {
    console.log("Token no encontrado");
    return { error: "Missing token", status: 401 };
  }

  try {
    const decoded = verify(token, secret);
    console.log("Token decodificado:", decoded);
    return { decoded };
  } catch (error) {
    console.log("Error al verificar el token:", error);
    return { error: "Invalid token", status: 401 };
  }
}
