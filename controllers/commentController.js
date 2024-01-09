const commentModel =  require('../models/commentModel')
const blogModel = require('../models/blogModel')

exports.newComment = async (req, res)=>{
    try{
        const id = req.body.id
        const blog = await blogModel.findById(id)
        if(!blog){
            res.status(404).json({
                message: 'Blog not found'
            })
        }
        const comment = await commentModel(req.body)
    
        // post the comment into the comments field in the blog model
        blog.comments.push(comment._id)
        comment.posts = blog._id
        // save the changes into the database
        await blog.save();
        await comment.save();
       
        // send a success response
        res.status(201).json({
            message:'successfully posted a comment',
            data:comment
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            error: err.message
        })
    }
}



exports.getOne = async(req, res)=>{
    try{
          const id = req.params.id
          const comment = await commentModel.findById(id)
          if(!comment){
           return res.status(404).json({
                message: 'comment not found'
            })
          } else{

           res.status(200).json({
            message: 'viewing comment',
            data:comment
        })
    }
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}


exports.getAll = async(req, res)=>{
    try{
          const comments = await commentModel.find()
          const allComments = comments.length
          if(allComments === 0){
           return res.status(200).json({
                message: 'There are no comments under the post'
            })
          } else{

           res.status(200).json({
            message: `There are ${allComments} comments under this post`,
            data:comments
        })
    }
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

exports.update = async(req, res)=>{
    try{
        const id = req.params.id
        const comment = req.body
        const update = await commentModel.findByIdAndUpdate(id, comment, {new:true})

        if(!update){
          return res.status(400).json({
            message:'unable to edit this comment'
          })
        }else{
            res.status(200).json({
                message:'This comment has been successfully updated',
                update
            })
        }

    }catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}


exports.deleteComment = async(req, res)=>{
    try{
        const id = req.params.id
    
        const deleteComment = await commentModel.findByIdAndDelete(id)

        if(!deleteComment){
          return res.status(400).json({
            message:'unable to delete this comment'
          })
        }else{
            res.status(200).json({
                message:'This comment has been successfully delete',
                deleteComment
            })
        }

    }catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}