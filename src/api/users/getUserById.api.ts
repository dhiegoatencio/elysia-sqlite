import { Elysia, t } from "elysia";
import { useDB } from "../../db";

const params = t.Object({
  id: t.Numeric(),
});

export const getUserByIdApi = new Elysia()
  .use(useDB)
  .get("/users/:id", ({ db, params }) => {
    const $user_id = params.id;
    
    console.log("getting user by id", $user_id);

    return db.query(/*sql*/ `
        SELECT * FROM users
        WHERE user_id = $user_id
      `).get({ $user_id });
  }, { params });
