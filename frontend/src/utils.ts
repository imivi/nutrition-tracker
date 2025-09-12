import dayjs, { Dayjs } from "dayjs"
import type { Macros, ParsedLineWithFoods } from "./types"


export function getRandomItem<T extends { id: string }>(items: T[], current_id: string): T | null {
    if (items.length === 0)
        return null
    // Avoid getting the same item twice in a row
    const pool = items.filter(item => item.id !== current_id)
    const randomIndex = Math.floor(Math.random() * pool.length)
    return pool[randomIndex]
}


export function getFoodNames(lines: { foodName: string | null }[]): string[] {
    // return Array.from(new Set(lines.map(line => line.foodName)))

    const foodNames = new Set<string>()
    for (const line of lines) {
        if (line.foodName) {
            foodNames.add(line.foodName)
        }
    }

    return Array.from(foodNames)

    /*
    // const foodNames = []
    for (const line of lines) {
        if (line.foodName) {
            foodNames.push(line.foodName)
        }
    }
    return foodNames
    */
}

export function calculateMacros(line: ParsedLineWithFoods): Macros {
    const macros: Macros = {
        calories: 0,
        carbs: 0,
        protein: 0,
        fats: 0,
        fiber: 0,
    }

    const { grams, currentFood } = line

    if (line.override_cal) {
        macros.calories = line.override_cal
        return macros
    }

    if (line.grams && line.override_cal_100g) {
        macros.calories = line.override_cal_100g / 100 * line.grams
        return macros
    }

    if (grams && currentFood) {
        macros.calories = currentFood.calories / 100 * grams
        macros.carbs = currentFood.carbs / 100 * grams
        macros.protein = currentFood.protein / 100 * grams
        macros.fats = currentFood.fats / 100 * grams
        macros.fiber = currentFood.fiber / 100 * grams
        return macros
    }

    return macros
}

export function sumMacros(macros: Macros[]): Macros {
    let total: Macros = {
        calories: 0,
        carbs: 0,
        fats: 0,
        fiber: 0,
        protein: 0,
    }
    for (const m of macros) {
        total.calories += m.calories
        total.carbs += m.carbs
        total.fats += m.fats
        total.fiber += m.fiber
        total.protein += m.protein
    }
    return {
        calories: Math.round(total.calories),
        carbs: Math.round(total.carbs),
        fats: Math.round(total.fats),
        fiber: Math.round(total.fiber),
        protein: Math.round(total.protein),
    }
}


export function getCurrentDate(): Dayjs {
    // return (new Date()).toISOString().slice(0, 10)
    return dayjs()
}