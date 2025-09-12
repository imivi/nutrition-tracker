import { db } from "../db/db"
import { Food } from "../db/schema"
import { uuid } from "../utils"


async function getAllFoods(): Promise<Food[]> {
    const foods = await db
        .selectFrom("food")
        .selectAll()
        .execute()
    return foods
}

async function replaceAllFoods(foods: Omit<Food, "id">[]): Promise<Food[]> {

    const newFoods: Food[] = foods.map(food => ({
        ...food,
        id: uuid(),
    }))

    const result = await db.transaction().execute(async (transaction) => {
        const deleteResult = await transaction.deleteFrom("food").execute()
        return transaction.insertInto("food").values(newFoods).execute()
    })

    return newFoods
}

async function getFoodById(id: string): Promise<Food | undefined> {
    const food = await db
        .selectFrom("food")
        .selectAll()
        .where("food.id", "=", id)
        .executeTakeFirst()

    return food
}

async function addFoods(foods: Omit<Food, "id">[]) {
    const foodsInserted = await Promise.all(foods.map(food => addFood(food)))
    return foodsInserted.filter(food => food !== null)
}

async function addFood(food: Omit<Food, "id">, id?: string): Promise<Food | null> {

    const foodToInsert: Food = {
        ...food,
        id: id || uuid(),
    }

    const { numInsertedOrUpdatedRows } = await db
        .insertInto("food")
        .values(foodToInsert)
        .executeTakeFirst()

    const ok = numInsertedOrUpdatedRows && numInsertedOrUpdatedRows > 0

    return ok ? foodToInsert : null
}

async function updateFood(food: Food): Promise<boolean> {

    const { id, ...values } = food

    const { numUpdatedRows } = await db
        .updateTable("food")
        .set(values)
        .where("food.id", "=", id)
        .executeTakeFirst()

    const ok = numUpdatedRows > 0
    return ok
}

async function deleteFood(id: string): Promise<boolean> {
    const result = await db
        .deleteFrom("food")
        .where("food.id", "=", id)
        .executeTakeFirst()

    const ok = result.numDeletedRows > 0
    return ok
}

export const foodService = {
    deleteFood,
    getFoodById,
    getAllFoods,
    addFood,
    addFoods,
    updateFood,
    replaceAllFoods,
}