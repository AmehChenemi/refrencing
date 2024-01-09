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
           return res.status(200).json({
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



// exports.deleteOne = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const deletedPost = await blogModel.findByIdAndDelete(id);
        


//         if (!deletedPost) {
//             return res.status(404).json({
//                 message: 'Cannot find post for deletion',
//             });
//         } else {
//             // Delete associated comments
//             await commentModel.deleteMany({ _id: { $in: deletedPost.comments } });

//             res.status(200).json({
//                 message: 'Successfully deleted post and its comments',
//                 data: deletedPost,
//             });
//         }
//     } catch (err) {
//         res.status(500).json({
//             error: err.message,
//         });
//     }
// };



// exports.deletePostAndComments = async (req, res) => {
//     try {
//         // const postId = new mongoose.Types.ObjectId(req.params.id);
//         const postId = req.params.id;
//          console.log('postId:', postId);


//         // Find the blog post
//         const blog = await blogModel.findById(postId);
//         if (!blog) {
//             return res.status(404).json({
//                 message: 'Blog post not found'
//             });
//         }

//         // Find and delete associated comments
//         const commentIds = blog.comments;
//         await commentModel.deleteMany({ _id: { $in: commentIds } });

//         // Delete the blog post
//         await blogModel.findByIdAndRemove(postId);

//         res.status(200).json({
//             message: 'Post and associated comments deleted successfully'
//         });
//     } catch (err) {
//         // Log the error for debugging if needed
//         console.error(err);

//         res.status(500).json({
//             error: err.message
//         });
//     }
// };
