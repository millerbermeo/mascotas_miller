const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Crear razas, categorías y géneros si no existen
  await prisma.race.createMany({
    data: [
      { name: 'Race 1' },
      { name: 'Race 2' },
      { name: 'Race 3' },
    ],
    skipDuplicates: true,
  });

  await prisma.category.createMany({
    data: [
      { name: 'Category 1' },
      { name: 'Category 2' },
      { name: 'Category 3' },
    ],
    skipDuplicates: true,
  });

  await prisma.gender.createMany({
    data: [
      { name: 'Gender 1' },
      { name: 'Gender 2' },
      { name: 'Gender 3' },
    ],
    skipDuplicates: true,
  });


   // Hashear la contraseña antes de guardarla
   const hashedPassword = await bcrypt.hash('123', 10);

   // Insertar datos por defecto para el modelo User
   await prisma.user.create({
     data: {
       name: 'miller',
       email: 'miller@gmail.com',
       password: hashedPassword,
     },
   });
 
   console.log('Datos insertados correctamente');
 

  // Obtener los IDs de las razas, categorías y géneros
  const race1 = await prisma.race.findFirst({ where: { name: 'Race 1' } });
  const race2 = await prisma.race.findFirst({ where: { name: 'Race 2' } });
  const category1 = await prisma.category.findFirst({ where: { name: 'Category 1' } });
  const category2 = await prisma.category.findFirst({ where: { name: 'Category 2' } });
  const gender1 = await prisma.gender.findFirst({ where: { name: 'Gender 1' } });
  const gender2 = await prisma.gender.findFirst({ where: { name: 'Gender 2' } });

  // Crear tres mascotas
  await prisma.mascota.createMany({
    data: [
      {
        name: 'Mascota 1',
        race_id: race1.id,
        category_id: category1.id,
        photo: 'photo-sm-1.svg',
        gender_id: gender1.id,
      },
      {
        name: 'Mascota 2',
        race_id: race2.id,
        category_id: category2.id,
        photo: 'photo-sm-2.svg',
        gender_id: gender2.id,
      },
      {
        name: 'Mascota 3',
        race_id: race1.id,
        category_id: category2.id,
        photo: 'photo-sm-3.svg',
        gender_id: gender1.id,
      },
    ],
  });

  console.log('Datos insertados correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
