import mongoose, { mongo } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

mongoose.pluralize(null)

const collection = 'users'

const schema = new mongoose.Schema({
    name: { type: String, require: true},
    lastName: { type: String, require: true},
    email: { type: String, require: true, unique: true, index: true},
    username: { type: String, require: true, unique: true, index: true},
    password: { type: String, require: true},
    age: { type: Number, require: true, index: true},
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" }
    },
    {
    versionKey: false
    
})

schema.plugin(mongoosePaginate)

const model = mongoose.model(collection, schema)

export default model