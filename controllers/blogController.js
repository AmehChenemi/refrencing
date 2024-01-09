const blogModel = require('../models/blogModel')
const commentModel =  require('../models/commentModel')


exports.createPost = async(req, res)=>{
    try{
        const {title, desc} =req.body
        const post = await blogModel.create({
            title,
            desc
        })
        res.status(201).json({
            message: 'Blog post uploaded successfully',
            data: post
        })

    }catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}

exports.getOne = async(req, res)=>{
    try{
          const id = req.params.id
          const post = await blogModel.findById(id).populate('comments')
          if(!post){
           return res.status(404).json({
                message: 'cannot find post'
            })
          } else{

           res.status(200).json({
            message: 'successfully found post',
            data:post
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
          const posts = await blogModel.find()
          const allPosts = posts.length
          if(allPosts=== 0){
           return res.status(204).json({
                message: 'There are no posts under this blog'
            })
          } else{

           res.status(200).json({
            message: `There are ${allPosts} Posts under this blog`,
            data:posts
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
     const { title, desc} = req.body
     const data = {
        title,
        desc
    };
     const update = await blogModel.findByIdAndUpdate(id, data, {new:true})
    
     if(!data){
       return res.status(400).json({
            message: 'Unable to update this post'
        })
     }else{
        res.status(200).json({
            message: 'updated post successfully',
            update
        })
     }
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}


exports.deletePost = async(req, res)=>{
    try{
        const id = req.params.id
    
        const deletePost = await blogModel.findByIdAndDelete(id)

        await commentModel.deleteMany({posts:id})

        if(!deletePost){
          return res.status(400).json({
            message:'unable to delete this post'
          })
        }else{
            res.status(200).json({
                message:'This post has been successfully delete',
            })
        }

    }catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}


