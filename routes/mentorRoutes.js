import express from "express"

const router = express.Router()

router.post("/create", (req, res) => {
    res.send("Route to create mentor")
})

export const mentorRoutes = router