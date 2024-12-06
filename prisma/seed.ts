import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { CreateToyDto } from '../src/toys/dto/create-toy.dto'

interface toy extends CreateToyDto{
    id: number
}

const materials = ["wood", "metal", "plastic", "other"]

const prisma = new PrismaClient();

async function main() {
    const toys: Array<toy> = [];
    for (let i = 0; i < 100; i++) {
        const toy = await prisma.toys.create({
            data: {
                name: faker.commerce.productName(),
                material: faker.helpers.arrayElement(materials),
                weight: faker.number.float({min: 1, max: 50})
            },
        });
        toys.push(toy);
    }

    for (let i = 0; i < 50; i++) {
        await prisma.children.create({
            data: {
                name: faker.person.fullName(),
                address: faker.location.streetAddress(),
                isGood: faker.datatype.boolean(),
                toys: {
                    connect: faker.helpers.arrayElements(
                        toys.map((toy) => ({ id: toy.id })),
                        faker.number.int({ min: 1, max: 3 })
                    ),
                },
            },
        });
    }

    console.log('Seeding kész!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });