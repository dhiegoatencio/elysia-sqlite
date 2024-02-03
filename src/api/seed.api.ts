import { Elysia } from "elysia";
import { useDB } from "../db";
import { faker } from "@faker-js/faker";

export const seedApi = new Elysia()
    .use(useDB)
    .post('/seed', ({db}) => {
        console.log('seeding database')

        const inserUserQuery = db.prepare(/*sql*/`
            INSERT INTO users (
                first_name,
                last_name,
                email,
                about
            ) VALUES (
                $first_name,
                $last_name,
                $email,
                $about
            ) RETURNING *
        `);

        for (let index = 0; index < 100; index++) {
            inserUserQuery.run({
                $first_name: faker.person.firstName(),
                $last_name: faker.person.lastName(),
                $email: faker.internet.email(),
                $about: faker.person.bio(),
            })
        }

        console.log('adicionado os itens no database')
    })