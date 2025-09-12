import "react-calendar/dist/Calendar.css"
import s from "./DatePicker.module.scss"

import dayjs, { Dayjs } from "dayjs"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import Calendar from "react-calendar"
import { useState } from "react"
import { useCurrentDate } from "../hooks/useCurrentDate"
import Button from "./Button"


type CalendarDate = Date | null
type DateOrRange = CalendarDate | [CalendarDate, CalendarDate]


type Props = {
    onDateChange?: (newDate: Dayjs) => void
    enabled: boolean
}

export default function DatePicker({ onDateChange, enabled }: Props) {

    const { currentDate, currentDateString, setCurrentDate } = useCurrentDate()

    function onDateSelect(dateOrRange: DateOrRange) {

        const date = Array.isArray(dateOrRange) ? dateOrRange[0] : dateOrRange

        if (!date)
            return

        // const dateString = dayjs(date).format("YYYY-MM-DD")
        const newDate = dayjs(date)
        setCurrentDate(newDate)
        setShowPicker(false)
        if (onDateChange)
            onDateChange(newDate)
    }

    function prevDay() {
        setCurrentDate(currentDate.subtract(1, "day"))
    }

    function nextDay() {
        setCurrentDate(currentDate.add(1, "day"))
    }

    function today() {
        setCurrentDate(dayjs())
    }

    const [showPicker, setShowPicker] = useState(false)

    return (
        <div className={s.DatePicker}>
            <Button onClick={prevDay} disabled={!enabled}><FaArrowLeft fontSize="large" /></Button>

            <Button
                onClick={() => setShowPicker(!showPicker)}
                disabled={!enabled}
                className={s.btn_date}
            >
                {currentDateString}
            </Button>

            <div style={{ position: "relative" }}>
                {
                    showPicker &&
                    <div className={s.picker_container}>
                        <Calendar
                            value={currentDateString}
                            onChange={onDateSelect}
                        />
                    </div>
                }
            </div>

            <Button disabled={!enabled} onClick={nextDay}><FaArrowRight fontSize="large" /></Button>
            <Button onClick={today} disabled={!enabled}>today</Button>

            {/* <Button onClick={() => setShowSidebar(!showSidebar)} variant="text" size="small">
                {!showSidebar && <IconLayoutSidebarRightExpand size={24} />}
                {showSidebar && <IconLayoutSidebarRightCollapse size={24} />}
            </Button> */}
        </div>
    )
}