import express from "express"
import recommedations from "../controllers/recommendControllers.js"
import { protect } from "../middleware/authMiddleware.js"


const router= express.Router()

router.get("/", protect, recommedations)

export default router