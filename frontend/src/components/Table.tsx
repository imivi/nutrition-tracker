import s from "./Table.module.scss"

import type { ReactNode } from "react"


type Props = {
    children: ReactNode
}

export default function Table({ children }: Props) {
    return (
        <table className={s.Table}>
            {children}
        </table>
    )
}