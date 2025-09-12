import s from "./Login.module.scss"

import { useState } from "react"
import { api } from "../api"
import { useUserStore } from "../stores/useUserStore"
import { Link, useNavigate } from "react-router"
import Button from "./Button"


type Props = {

}

export default function Login({ }: Props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [errorMsg, setErrorMsg] = useState("")

    const navigate = useNavigate()
    const { setUser } = useUserStore()

    async function onSubmit() {
        setErrorMsg("")
        try {
            const user = await api.loginWithCredentials(username, password)
            if (user) {
                // Reset form
                setUsername("")
                setPassword("")

                setUser(user)
                navigate("/")
            }
        }
        catch (error) {
            console.error(error)
            console.log("Error logging in")
            setErrorMsg((error as any).response.data.message)
        }
    }

    return (
        <div className={s.Login}>

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
                    <Button type="submit">Login</Button>
                    <Link to="/signup">or sign up</Link>
                </footer>

                {errorMsg && <p className={s.error_msg}>Error: {errorMsg}</p>}

            </form>

        </div>
    )
}