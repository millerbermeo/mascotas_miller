import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(request, { params }) {
  const { error, status, decoded } = await verifyToken(request);
  if (error) {
    return new NextResponse(error, { status });
  }

  try {
    const id = parseInt(params.id);
    const result = await prisma.mascota.findFirst({
      where: { id: id },
      include: {
        fk_race: true,
        fk_category: true,
        fk_gender: true,
      },
    });
    if (!result) {
      return new NextResponse("Mascota not found", { status: 404 });
    }
    return NextResponse.json(result);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { error, status, decoded } = await verifyToken(request);
  if (error) {
    return new NextResponse(error, { status });
  }

  try {
    const id = parseInt(params.id);
    const result = await prisma.mascota.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { error, status, decoded } = await verifyToken(request);
  if (error) {
    return new NextResponse(error, { status });
  }

  try {
    const formData = await request.formData();
    const id = parseInt(params.id);
    const name = formData.get("name");
    const race_id = parseInt(formData.get("race_id"));
    const category_id = parseInt(formData.get("category_id"));
    const gender_id = parseInt(formData.get("gender_id"));
    const file = formData.get("photo");

    let photo = null;
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(process.cwd(), "public/uploads", file.name);
      await writeFile(filePath, buffer);
      photo = file.name;
    }

    const updatedData = {
      name,
      race_id,
      category_id,
      gender_id,
      ...(photo && { photo })
    };

    const result = await prisma.mascota.update({
      where: { id: id },
      data: updatedData,
    });

    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
