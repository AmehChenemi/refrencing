const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({

    title:{
        type:String
    },

    desc:{
        type:String
    },

   comments:[{
    type: mongoose.SchemaTypes.ObjectId,
    ref:'comments'
   }],
},{timestamps:true})

const blog = mongoose.model('blog', blogSchema)
module.exports = blog