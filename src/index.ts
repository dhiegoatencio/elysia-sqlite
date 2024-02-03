import { Elysia } from "elysia";
import { getUsersApi } from "./api/users/getUsers.api";
import { getUserByIdApi } from "./api/users/getUserById.api";
import { seedApi } from "./api/seed.api";
import { postUserApi } from "./api/users/postUser.api";

const app = new Elysia()
  .use(seedApi)
  .use(getUsersApi)
  .use(getUserByIdApi)
  .use(postUserApi)
  .listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
