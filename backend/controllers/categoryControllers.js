import expressAsyncHandler from "express-async-handler"
import Category from "../models/categoryModel.js"
import mongoose from "mongoose"

const getCategory = expressAsyncHandler(async function (req, res) {
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1


    const count = await Category.countDocuments()
    const categories = await Category.find({})
    return res.json({ categories, page, pages: Math.ceil(count / pageSize) })
})

const getCategoryById = expressAsyncHandler(async (req, res) => {
    const categories = await Category.findById(req.params.id)
    return res.json({ categories })

})

// @desc    Get top rated products
// @route   GET /api/products/topRated
// @access  Public


const addCategory = expressAsyncHandler(async function (req, res) {
    const { name } = req.body

    const category = await Category.create({
        name
    })

    if (category) {
        res.json(category)
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

const deleteCategory = expressAsyncHandler(async function (req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404)
        throw new Error('Category not found')
    }
    const category = await Category.findById(req.params.id)

    if (category) {
        await category.remove()
        return res.json({ message: "User deleted successfully" })
    }
    else {
        res.status(404)
        throw new Error('Category not found')
    }
})

const updateCategory = expressAsyncHandler(async (req, res) => {
    const { name } = req.body

    const category = await Category.findById(req.params.id)

    if (category) {
        category.name = name

        category.save()
        res.json(category)
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})



const updateState = expressAsyncHandler(async (req, res) => {
    const {appview, webview, state} = req.body
    const result = await Category.updateMany({}, { $set: { appview, webview, state } });
    return res.json({ message: "ok", data: {appview, webview, state} })
})


const getState = expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({})
    return res.json({ categories })
})

const updateState1 = expressAsyncHandler(async (req, res) => {
    const {appview, webview, state} = req.body
    const result = await Category.updateMany({}, { $set: { appview1: appview, webview1: webview, state1: state } });
    return res.json({ message: "ok", data: {appview, webview, state} })
})

const getState1 = expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({})
    return res.json({ categories })
})

export { addCategory, deleteCategory, updateCategory, getCategory, getCategoryById, updateState, getState, getState1, updateState1 }