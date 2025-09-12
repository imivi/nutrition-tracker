import { z } from "zod"
import { Day } from "./db/schema"

export type DayDTO = Omit<Day, "complete"> & {
    complete: boolean
}

// export const ANSWER_MODE = {
//     NO_ANSWERS: "NO_ANSWERS",
//     AUTO_SCORE: "AUTO_SCORE",
//     SELF_SCORE: "SELF_SCORE",
// } as const

// export const SORT_CARDS_BY = {
//     answers: "answers",
//     index: "index",
//     created_on: "created_on",
//     views: "views",
// } as const

// export type SORT_KEY = keyof typeof SORT_CARDS_BY