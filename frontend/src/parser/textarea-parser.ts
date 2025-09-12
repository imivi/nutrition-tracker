import { type ParsedLine, parseLine } from "./line-parser"

type ParsedLineSorted = ParsedLine & {
    sort: number
}

/*
Example:
30 chocolate 400 -> { foodName: "chocolate", grams: 30, override_cal_100g: 400 }
120 banana -> { foodName: "banana", grams: 120, override_cal_100g: null }
50c nuts -> { foodName: "nuts", grams: null, override_cal: 50 }
*/
export function parseTextarea(text: string) {

    if (!text)
        return []

    const lines = text.split("\n")
    const parsedLines: ParsedLineSorted[] = lines.map((line, i) => ({
        ...parseLine(line),
        sort: i,
    }))

    return parsedLines
}
