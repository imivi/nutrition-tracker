
type Unit = "g" | "c"

type Token = {
    raw_text: string
    value: number | null
    nosuffix: string | null
    suffix: string | null
    unit: null | Unit
    type: "text" | "number"
}

export function tokenizeLine(text: string): Token[] {
    const words = text.split(" ").filter(text => text.length > 0)
    let tokens = words.map(word => tokenize(word))
    // console.log(tokens)
    tokens = mergeTextTokens(tokens)
    return tokens
}

function mergeTextTokens(tokens: Token[]): Token[] {

    if (tokens.length < 2)
        return tokens

    const output: Token[] = []

    function getLastToken() {
        if (output.length > 0)
            return output[output.length - 1]
        return null
    }

    for (const token of tokens) {
        const lastToken = getLastToken()
        if (token.type === "text" && lastToken?.type === "text")
            lastToken.raw_text += " " + token.raw_text
        else
            output.push(token)
    }

    return output
}


export function tokenize(word: string): Token {
    const wordLower = word.toLowerCase()
    const chars = wordLower.split("")
    // const letters = chars.filter(char => !isDigit(char))
    const digits = chars.filter(char => isDigit(char))

    const wordIsTextOnly = digits.length === 0
    // console.log({ wordIsTextOnly, chars, digits })
    if (wordIsTextOnly) {
        return {
            raw_text: word,
            nosuffix: null,
            suffix: null,
            value: null,
            unit: null,
            type: "text",
        }
    }

    // const digits = chars.filter(char => isDigit(char))

    const wordIsNumber = digits.length === word.length
    if (wordIsNumber) {
        return {
            raw_text: word,
            value: Number(digits.join("")),
            nosuffix: null,
            suffix: null,
            unit: null,
            type: "number",
        }
    }

    const [nosuffix, suffix] = getSuffix(word)
    // const noSuffix = suffix ? word.slice(0, word.length - suffix.length) : word
    const value = Number(nosuffix) || null

    let unit: Unit | null = null
    if (suffix === "g")
        unit = "g"
    if (suffix === "c" || suffix === "kcal")
        unit = "c"

    return {
        raw_text: word,
        nosuffix,
        value,
        suffix,
        unit,
        type: value === null ? "text" : "number"
    }
}


const digits = "0123456789"
function isDigit(char: string): boolean {
    return digits.includes(char)
}

/*
30g -> g
15kcal -> kcal
u83j8i -> i
fjij294 -> null
*/
function getSuffix(word: string): [string | null, string | null] {

    let nosuffix = ""
    let suffix = ""

    for (const char of word) {
        if (isDigit(char) && suffix === "")
            nosuffix += char
        else
            suffix += char
    }

    if (suffix.length === word.length)
        return [word, null]

    return [nosuffix || null, suffix || null]

    /*
    const lastchar = word[word.length - 1]
    if (isDigit(lastchar))
        return null

    let suffix = ""
    for (const char of reverse(word)) {
        if (isDigit(char))
            break
        else
            suffix += char
    }
    return reverse(suffix)
    */
}
