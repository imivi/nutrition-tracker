import s from "./Signup.module.scss"

import { useState } from "react"
import { api } from "../api"
import { Link, useNavigate } from "react-router"
import Button from "./Button"


type Props = {

}

export default function Signup({ }: Props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [errorMsg, setErrorMsg] = useState("")

    const navigate = useNavigate()
    // const { setUser } = useUserStore()

    async function onSubmit() {
        setErrorMsg("")

        try {
            const user = await api.signup(username, password)
            if (user) {
                // Reset form
                setUsername("")
                setPassword("")

                navigate("/login")
                // setUser(user)
                // navigate("/")
            }
        }
        catch (error) {
            console.error(error)
            console.log("Error signing up")
            setErrorMsg((error as any).response.data.message)
        }
    }

    return (
        <div className={s.Signup}>

            <form onSubmit={e => { e.preventDefault(); onSubmit() }}>
                <fieldset>
                    <label>
                        <span>Username</span>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                </fieldset>

                <footer>
                    <Button type="submit">Sign up</Button>
                    <Link to="/login">or login</Link>
                </footer>

                {errorMsg && <p className={s.error_msg}>Error: {errorMsg}</p>}

            </form>

        </div>
    )
}