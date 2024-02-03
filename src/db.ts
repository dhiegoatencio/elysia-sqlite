import { migrate, getMigrations } from "bun-sqlite-migrations"
import Database from "bun:sqlite"
import { Elysia } from "elysia"

const createDB = () => {

    console.log("creating database")

    const db = new Database("elysia-rest-api.sqlite")
    migrate(db, getMigrations("./migrations"))

    return db
}

export const useDB = new Elysia()
    .decorate('db', createDB())
