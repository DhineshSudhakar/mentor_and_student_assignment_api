import express from "express"

const router = express.Router()

router.post("/create", (req, res) => {
    res.send("Route to create student")
})

export const studentRoutes = router