import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs"; // Importa bcryptjs

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Busca el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Verifica la contraseña utilizando bcrypt.compare
    if (user && await bcrypt.compare(password, user.password)) {
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
        secure: process.env.NODE_ENV === "production",
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
