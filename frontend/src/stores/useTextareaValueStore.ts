import { create } from "zustand"


type Store = {
    textareaValue: string
    setTextareaValue: (textareaValue: string) => void
}


export const useTextareaValueStore = create<Store>(set => ({
    textareaValue: "",
    setTextareaValue: (textareaValue) => set({ textareaValue }),
}))
