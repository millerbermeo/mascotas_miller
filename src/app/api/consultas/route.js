import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const mascotasPorRaza = await prisma.mascota.groupBy({
            by: ['race_id'],
            _count: {
                id: true,
            },
            orderBy: {
                race_id: 'asc'
            }
        });


        const razas = await prisma.race.findMany({
            where: {
                id: {
                    in: mascotasPorRaza.map(grupo => grupo.race_id)
                }
            },
            select: {
                id: true,
                name: true,
            },
        });


        const razaMap = razas.reduce((acc, raza) => {
            acc[raza.id] = raza.name;
            return acc;
        }, {});


        const datos = mascotasPorRaza.map(grupo => ({
            race_id: grupo.race_id,
            race_name: razaMap[grupo.race_id],
            count: grupo._count.id,
        }));

        return NextResponse.json({ datos }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}
