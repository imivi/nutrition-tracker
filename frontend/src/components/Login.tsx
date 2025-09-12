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
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const { setUser } = useUserStore()

    async function onSubmit() {
        setError("")
        const { user, error } = await api.loginWithCredentials(username, password)
        if (user) {
            // Reset form
            setUsername("")
            setPassword("")

            setUser(user)
            navigate("/")
        }
        else {
            console.log("Error logging in, check the network tab")
            console.error(error)
            setError(error)
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

                {error && <div>{error}</div>}

            </form>

        </div>
    )
}