import express from "express"
import { addCategory, deleteCategory, getCategory, getCategoryById, getState, updateCategory, updateState } from "../controllers/categoryControllers.js"

const routes= express.Router()

routes.route("/").get(getCategory)
routes.route("/:id/get").get(getCategoryById)
routes.route("/add").post(addCategory)
routes.route("/:id/update").put(updateCategory)
routes.route("/:id/delete").delete(deleteCategory)
routes.route("/state").get(getState)
routes.route("/state").post(updateState)

export default routes