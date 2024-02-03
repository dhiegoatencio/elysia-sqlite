import { Elysia, t } from "elysia";
import { useDB } from "../../db";

const query = t.Object({
  limit: t.Numeric()
})

export const getUsersApi = new Elysia()
    .use(useDB)
    .get('/users', ({db, query}) => {
        console.log("getting all users")
        const $limit = query.limit
        return db.query(/*sql*/`
          SELECT * FROM users
          ORDER BY created_at desc
          LIMIT $limit
        `).all({ $limit })
    }, { query })
