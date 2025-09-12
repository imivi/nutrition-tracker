import { db } from "../db/db"
import { DayEntry } from "../db/schema"
import { uuid } from "../utils"


async function getEntriesByDate(date: string): Promise<Omit<DayEntry, "date">[]> {
    const entries = await db
        .selectFrom("day_entry")
        .select([
            // "date",
            "id",
            "raw",
            "calories",
            "food_id",
            "grams",
            "foodname",
            "calories_100g",
            "override_calories_100g",
            "override_calories",
            "sort",
        ])
        .where("date", "=", date)
        .execute()

    return entries
}

async function replaceEntriesByDate(date: string, newEntries: Omit<DayEntry, "id" | "date">[]): Promise<DayEntry[]> {

    const newEntriesWithIds: DayEntry[] = newEntries.map(entry => ({
        ...entry,
        id: uuid(),
        date,
    }))

    const result = await db.transaction().execute(async (transaction) => {
        const deleteResult = await transaction.deleteFrom("day_entry").where("date", "=", date).execute()
        return await transaction.insertInto("day_entry").values(newEntriesWithIds).execute()
    })

    return newEntriesWithIds
}


export const dayEntryService = {
    getEntriesByDate,
    replaceEntriesByDate,
}