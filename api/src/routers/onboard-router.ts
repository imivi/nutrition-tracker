import Express from "express"
import { userService } from "../services/user-service"


const router = Express.Router()


router.get("/", async (req, res) => {
    const users = await userService.countUsers()
    res.json(users === 0)
})


export const onboardRouter = router