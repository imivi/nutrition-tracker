import { useCurrentDateStore } from "../stores/useCurrentDateStore"

export function useCurrentDate() {
    const { currentDate, setCurrentDate } = useCurrentDateStore()
    return {
        currentDate,
        currentDateString: currentDate.format("YYYY-MM-DD"),
        setCurrentDate,
        // setCurrentDate: (date: Date) => setCurrentDate(dayjs(date)),
    }
}