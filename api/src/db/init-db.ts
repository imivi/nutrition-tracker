import { schemaService } from "../services/schema-service";

export async function initDb() {
    console.log("Initializing database...")

    await schemaService.createUserTable()
    console.log("OK: createUserTable")

    await schemaService.createSessionTable()
    console.log("OK: createSessionTable")

    await schemaService.createFoodTable()
    console.log("OK: createFoodTable")

    await schemaService.createDayEntryTable()
    console.log("OK: createDayEntryTable")

    await schemaService.createDayTable()
    console.log("OK: createDayTable")

    console.info("[OK] initialize database")
}
