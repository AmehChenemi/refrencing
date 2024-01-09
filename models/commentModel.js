const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({

    comment:{
        type:String
    },

   posts:{
    type: mongoose.SchemaTypes.ObjectId,
    ref:'blog'
   },
},{timestamps:true})

const comment = mongoose.model('comments', commentSchema)
module.exports = comment