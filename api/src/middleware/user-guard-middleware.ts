import { NextFunction, Request, Response } from "express"
import { userService } from "../services/user-service"
import { sessionService } from "../services/session-service"
import { sessionIsValid } from "../utils"
import { env } from "../env"


/**
 * Middleware that checks if the cookies include the sessionId
 * and attaches the session's user info to the request object.
 */
export async function userGuardMiddleware(req: Request, res: Response, next: NextFunction) {

    if (!env.GUARD_ROUTES) {
        next()
        return
    }

    // Get the session id from cookies, for example "sid=jduft34r9i"
    const { sid } = req.cookies

    if (!sid) {
        res.status(401).json({ message: "Login required" })
        return
    }

    // check if cookie is valid
    const session = await sessionService.getSession(sid)
    const sessionExpired = session && !sessionIsValid(session)

    if (!session || sessionExpired) {
        res.status(401).json({
            message: "Session missing or expired, please log in again",
        })
        return
    }

    // If cookie is valid, get user
    const user = await userService.getUserById(session.user_id)

    if (!user) {
        res.status(404).json({ message: "User not found, please log in again" })
        return
    }

    // Session is still active, so refresh it
    await sessionService.refreshSession(session.id)

    const request = req as any
    request.user = user
    request.sid = sid

    next()
}