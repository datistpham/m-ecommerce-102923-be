import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        state: {
            type: Number,
            required: false
        },
        appview: {
            type: String,
            required: false
        },
        webview: {
            type: String,
            required: false
        },
        state1: {
            type: Number,
            required: false
        },
        appview1: {
            type: String,
            required: false
        },
        webview1: {
            type: String,
            required: false
        },
        logo1: {
            type: Number,
            require: false
        }
    },
    {
        timestamps: true,
    }
)

const Category = mongoose.model('Category', categorySchema)

export default Category