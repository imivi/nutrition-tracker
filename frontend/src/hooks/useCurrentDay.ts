import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../api"
import type { Day } from "../types"
// import { useCurrentDate } from "./useCurrentDate"


export function useCurrentDay(dateString: string) {

    // const { currentDateString } = useCurrentDate()
    const queryClient = useQueryClient()

    const getDayQuery = useQuery({
        queryKey: ["day", dateString],
        queryFn: async () => {
            const day = await api.getDay(dateString)
            return day
            // if (day) {
            //     setTextareaValue(day.raw)
            //     return day
            // }
            // else {
            //     setTextareaValue("")
            //     return null
            // }
        },
        retry: false,
    })

    const setDayMutation = useMutation({
        mutationKey: ["day", dateString],
        mutationFn: async (day: Day) => {
            const ok = await api.setDay(day)
            if (ok)
                queryClient.invalidateQueries({ queryKey: ["day", dateString] })
            return ok
        }
    })

    return {
        day: getDayQuery.data || null,
        uploadDay: setDayMutation.mutateAsync,
        loading: getDayQuery.isLoading,
    }
}