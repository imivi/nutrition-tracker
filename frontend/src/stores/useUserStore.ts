import { create } from "zustand"
import type { User } from "../types"


type Store = {
    user: User | null
    setUser: (user: User | null) => void
}


export const useUserStore = create<Store>(set => ({
    user: null,
    setUser: (user) => set({ user }),
}))
