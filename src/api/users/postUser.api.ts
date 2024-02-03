import { Elysia, t } from "elysia";
import { useDB } from "../../db";


const body = t.Object({
    first_name: t.String({
        maxLength: 400,
    }),
    last_name: t.String({
        maxLength: 400,
    }),
    email: t.String({
        maxLength: 400
    }),
    about: t.String({
        maxLength: 2000
    })
})

export const postUserApi = new Elysia()
    .use(useDB)
    .post('/users', ({db, body}) => {
        console.log(body)

        const insertUserQuery = db.prepare(/*sql*/`
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
        `)

            return insertUserQuery.run({
                $first_name: body.first_name,
                $last_name: body.last_name,
                $email: body.email,
                $about: body.about,
            })
    }, { body })