import { sql } from "kysely";
import { db } from "../db/db";
import { hashPassword, unixNow, uuid } from "../utils";
import { Session, User } from "../db/schema";


function nowPlusNHours(hours: number): number {
    const ms = 1000 * 60 * 60 * hours
    return unixNow() + ms
}


async function getSession(sessionId: string): Promise<Session | undefined> {
    const session = await db
        .selectFrom("session")
        .where("session.id", "=", sessionId)
        .selectAll()
        .executeTakeFirst()

    return session
}

async function createSession(userId: string): Promise<Session | undefined> {

    const session: Session = {
        id: uuid(),
        expires_on: nowPlusNHours(1),
        user_id: userId,
    }

    const result = await db
        .insertInto("session")
        .values(session)
        .execute()

    return result.length > 0 ? session : undefined
}

async function refreshSession(sessionId: string): Promise<boolean> {

    const results = await db
        .updateTable("session")
        .where("session.id", "=", sessionId)
        .set({
            expires_on: nowPlusNHours(1),
        })
        .execute()

    return results.length > 0
}

async function deleteSession(sessionId: string): Promise<boolean> {

    const results = await db
        .deleteFrom("session")
        .where("session.id", "=", sessionId)
        .execute()

    return results.length > 0
}

export const sessionService = {
    getSession,
    refreshSession,
    deleteSession,
    createSession,
}