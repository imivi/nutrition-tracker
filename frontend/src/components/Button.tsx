import s from "./Button.module.scss"

import type { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    unstyled?: boolean
}

export default function Button(props: Props) {
    const { unstyled, ...btnProps } = props
    return (
        <button className={s.Button} {...btnProps} data-unstyled={!!unstyled} />
    )
}