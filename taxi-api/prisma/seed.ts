import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const drivers = [
    {
      name: 'Homer Simpson',
      description:
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
      vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
      rating: {
        rating: 2,
        comment:
          'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
      },
      fee: 2.5,
      minDistance: 1,
    },
    {
      name: 'Dominic Toretto',
      description:
        'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
      vehicle: 'Dodge Charger R/T 1970 modificado',
      rating: {
        rating: 4,
        comment:
          'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
      },
      fee: 5.0,
      minDistance: 5,
    },
    {
      name: 'James Bond',
      description:
        'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
      vehicle: 'Aston Martin DB5 clássico',
      rating: {
        rating: 5,
        comment:
          'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
      },
      fee: 10.0,
      minDistance: 10,
    },
  ];

  for (const driver of drivers) {
    const { rating, ...driverData } = driver;
    const createdDriver = await prisma.driver.create({
      data: driverData,
    });

    if (rating) {
      await prisma.rating.create({
        data: {
          ...rating,
          driver_id: createdDriver.id,
        },
      });
    }
  }

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
