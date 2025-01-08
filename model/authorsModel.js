const mongoose = require('mongoose')
const schema = mongoose.schema

const authorSchema = new schema({
    author_id: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    social_media_links: {
        type: String,
        required: false
    }
})

const Author = mongoose.model('author', authorSchema)
module.exports = Author