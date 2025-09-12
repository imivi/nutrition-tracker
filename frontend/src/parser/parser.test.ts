import { test } from "vitest"
import { tokenizeLine } from "./tokenizer"


test("test", () => {
    const examples = [
        "30 dark chocolate 300c",
        "30 chocolate 400",
        "120 banana",
        "50c nuts",
    ]

    for (const text of examples) {
        const tokens = tokenizeLine(text)
        console.log(text, "-->", tokens)
    }

    // expect().toBe(1)
})

/*
30 dark chocolate 300c

find amount -> 30
chocolate 300c

find name -> "dark chocolate"

*/