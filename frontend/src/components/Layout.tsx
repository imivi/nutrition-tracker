import s from "./Layout.module.scss"


import { Outlet, useNavigate } from "react-router"
import Header from "./Header"
import { useEffect } from "react"
import { api } from "../api"
import { useUserStore } from "../stores/useUserStore"
import { useFoods } from "../hooks/useFoods"
import { fuseSearch } from "../fuse-search"


type Props = {

}

export default function Layout({ }: Props) {

    const navigate = useNavigate()

    const { setUser } = useUserStore()

    // On page load, check if onboard:
    // If true, redirect to signup page.
    // Otherwise, try logging in with cookies
    // if they exist and have not expired yet.
    useEffect(() => {
        async function onboard() {
            const onboard = await api.checkOnboarding()
            if (onboard) {
                navigate("/signup")
                return
            }
            const user = await api.loginWithCookies()
            if (!user) {
                navigate("/login")
                return
            }
            setUser(user)
            navigate("/")
        }
        onboard()
    }, [])

    // On page load, fetch all custom foods and load them into Fuse
    const { allFoods } = useFoods()
    useEffect(() => {
        // console.info("user changed, refetching allFoods:", { user, allFoods })
        // console.info("fuseSearch.setCollection:", allFoods)
        if (allFoods.length > 0)
            fuseSearch.setCollection(allFoods)
    }, [allFoods])

    return (
        <div className={s.Layout}>
            <Header />
            <main><Outlet /></main>
        </div>
    )
}