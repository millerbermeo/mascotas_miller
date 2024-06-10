import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"; // Ajusta la ruta según tu estructura de proyecto

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Busca el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && user.password === password) { // Asegúrate de usar un hash seguro en un entorno real
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          email: user.email,
          id: user.id,
          name: user.name,
        },
        "secret" // Cambia esto por una variable de entorno en producción
      );

      const response = NextResponse.json({
        token,
        email: user.email,
        id: user.id,
        name: user.name,
      });

      response.cookies.set({
        name: "myTokenName",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "secret",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/",
      });

      return response;
    } else {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
