import { fuseSearch } from "../fuse-search"
import { parseTextarea } from "../parser/textarea-parser"
import type { ParsedLineWithMacros } from "../types"
import { getFoodNames, calculateMacros } from "../utils"
import { fetchFoodsByName } from "./fetchFoodsByName"


export function processTextareaValue(textareaValue: string) {

    // Parse lines
    const parsedLines = parseTextarea(textareaValue)

    // Extract food names
    const foodNames = getFoodNames(parsedLines)

    // Fetch foods
    const allFoods = fetchFoodsByName(foodNames, fuseSearch)

    // Add fetched foods to each line
    const parsedLinesWithFoods = parsedLines.map(line => {
        const foods = line.foodName ? allFoods[line.foodName] : []
        return {
            ...line,
            foods,
            currentFood: foods?.length > 0 ? foods[0] : null,
        }
    })

    // Calculate missing values
    const linesWithMacros: ParsedLineWithMacros[] = parsedLinesWithFoods.map(line => ({ ...line, macros: calculateMacros(line) }))

    // const { allFoods: foods } = useFoods()
    // console.log("all foods:", foods)
    // console.log("foodNames:", foodNames)
    // console.log("matching foods:", allFoods)
    // console.log("linesWithMacros:", linesWithMacros)

    return {
        parsedLines,
        foodNames,
        allFoods,
        linesWithMacros,
    }
}

