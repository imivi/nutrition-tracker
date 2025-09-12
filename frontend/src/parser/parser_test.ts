import { parseLine } from "./line-parser"

function test() {

    // const words = [
    //     "30", "dark", "chocolate", "300c",
    //     "30", "chocolate", "400",
    //     "120", "banana",
    //     "50c", "nuts",
    // ]

    const examples = [
        // "30 dark chocolate 300c",
        // "30 chocolate 400",
        // "120 banana",
        "50c nuts",
        "200c 50g oats"
    ]

    // for (const word of words) {
    //     console.log(word, tokenize(word))
    // }

    for (const text of examples) {
        // const tokens = tokenizeLine(text)
        // console.log(text, "-->", tokens)

        const line = parseLine(text)
        console.log(text, "-->", line)
    }

    // expect().toBe(1)
}

test()

/*
30 dark chocolate 300c

find amount -> 30
chocolate 300c

find name -> "dark chocolate"

*/