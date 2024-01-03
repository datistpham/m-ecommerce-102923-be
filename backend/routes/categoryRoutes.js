import express from "express"
import { addCategory, deleteCategory, getCategory, getCategoryById, getState, getState1, updateCategory, updateState, updateState1 } from "../controllers/categoryControllers.js"

const routes= express.Router()

routes.route("/").get(getCategory)
routes.route("/:id/get").get(getCategoryById)
routes.route("/add").post(addCategory)
routes.route("/:id/update").put(updateCategory)
routes.route("/:id/delete").delete(deleteCategory)
routes.route("/state").get(getState)
routes.route("/state").post(updateState)

routes.route("/state1").get(getState1)
routes.route("/state1").post(updateState1)


export default routes