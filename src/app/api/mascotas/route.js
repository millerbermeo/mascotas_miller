import prisma from "@/lib/prisma"; 
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth.js";
import { writeFile } from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  const { error, status, decoded } = await verifyToken(request);

  if (error) {
    return new NextResponse(error, { status });
  }

  const formData = await request.formData();
  const file = formData.get("photo"); // Suponiendo que el campo del archivo se llama "photo"
  const name = formData.get("name");
  const race_id = formData.get("race_id");
  const category_id = formData.get("category_id");
  const gender_id = formData.get("gender_id");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "public", "uploads", file.name);
  await writeFile(filePath, buffer);
  console.log(`open ${filePath} to see the uploaded file`);

  try {
    const petData = {
      name: name.toString(),
      race_id: parseInt(race_id, 10),
      category_id: parseInt(category_id, 10),
      gender_id: parseInt(gender_id, 10),
      photo: `${file.name}`,
    };

    const pet = await prisma.mascota.create({
      data: petData
    });

    return new NextResponse(JSON.stringify(pet), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function GET(request) {
  const { error, status, decoded } = await verifyToken(request);
  if (error) {
    return new NextResponse(error, { status });
  }

  try {
    const pets = await prisma.mascota.findMany({
      include: {
        fk_race: true,
        fk_category: true,
        fk_gender: true,
      },
    });

    const formattedPets = pets.map(pet => ({
      id: pet.id,
      race: pet.fk_race.name,
      category: pet.fk_category.name,
      photo: pet.photo,
      gender: pet.fk_gender.name,
      name: pet.name,
    }));

    return NextResponse.json({ datos: formattedPets }, { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
