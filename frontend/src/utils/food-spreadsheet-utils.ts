import { type CellBase, type Matrix } from "react-spreadsheet"
import z from "zod"


export function createEmptyRow(columns: number): CellBase[] {
    const values = []
    for (let i = 0; i < columns; i++)
        values.push({ value: "", readOnly: i === 0 })
    return values
}

export function convertFoodsToRows(foods: Food[]) {

    if (foods.length === 0)
        return []

    const rows = foods.map(food => Object.values(food))
    const data: Matrix<CellBase> = rows.map(row => row.map((value, i) => ({ value, readOnly: i === 0 })))
    data.push(createEmptyRow(Object.keys(foods[0]).length))
    return data
}

function rowIsEmpty(row: (CellBase | undefined)[]): boolean {
    for (const cell of row) {
        if (cell?.value)
            return false
    }
    return true
}

function convertRowToObj(header: string[], row: (CellBase | undefined)[]) {

    if (rowIsEmpty(row))
        return null

    const values = row.map(cell => cell?.value)

    const food: Record<string, string> = {}
    values.forEach((value, i) => {
        const key = header[i]
        food[key] = value
    })

    return food
}

const foodSchema = z.object({
    // id: z.string().optional(),
    name: z.string(),
    calories: z.coerce.number(),
    carbs: z.coerce.number(),
    fiber: z.coerce.number(),
    fats: z.coerce.number(),
    protein: z.coerce.number(),
})

type Food = z.infer<typeof foodSchema>

function parseFoodFromRowObject(obj: Record<string, string>) {
    const result = foodSchema.safeParse(obj)
    return {
        food: result.data,
        error: result.error,
    }
}

export function convertRowsToFoods(header: string[], rows: Matrix<CellBase>): Food[] {
    const foods: Food[] = []
    for (const row of rows) {
        const rowObj = convertRowToObj(header, row)
        if (rowObj) {
            const { food } = parseFoodFromRowObject(rowObj)
            if (food)
                foods.push(food)
        }
    }
    return foods
}