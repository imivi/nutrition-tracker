import { create } from "zustand"
import { getCurrentDate } from "../utils"
import type { Dayjs } from "dayjs"


type Store = {
    currentDate: Dayjs
    setCurrentDate: (date: Dayjs) => void
}


export const useCurrentDateStore = create<Store>(set => ({
    currentDate: getCurrentDate(),
    setCurrentDate: (currentDate) => set({ currentDate }),
}))
