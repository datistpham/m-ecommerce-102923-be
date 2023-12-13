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
        }
    },
    {
        timestamps: true,
    }
)

const Category = mongoose.model('Category', categorySchema)

export default Category