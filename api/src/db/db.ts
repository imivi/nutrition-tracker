import SQLite from 'better-sqlite3'
import { Kysely, sql, SqliteDialect } from 'kysely'
import type { DB } from "./schema"
import { env } from '../env'

const database = new SQLite(env.DATABASE_URL)

database.pragma('journal_mode = WAL')
database.pragma('foreign_keys = ON') // Enable foreign key support

// console.log("db url:", env.DATABASE_URL)
const dialect = new SqliteDialect({
    database,
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = new Kysely<DB>({
    dialect,
})
