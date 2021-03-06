const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const verify = require("../verifyToken");

//create post
router.post("/", verify, async (req, res) => {
    const newPost = new Post(req.body)
    try{
 const savedPost = await newPost.save();
 res.status(200).json(savedPost);
    }catch(err){
        res.send(500).json(err);
    }

})

//update post
router.put("/:id",verify, async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
        await post.updateOne({$set: req.body});
        res.status(200).json("Post has been updated");
    }else{
        res.status(403).json("you can update only your post")
    } 
}catch(err){
    res.status(500).json(err);
}
    
})
//delete post
router.delete("/:id", verify, async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("Post has been deleted");
    }else{
        res.status(403).json("you can delete only your post")
    } 
}catch(err){
    res.status(500).json(err);
}
   
})
//like a post
router.put("/:id/like", verify, async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
       if(!post.likes.includes(req.body.userId) && !post.credit.includes(req.body.userId)){
         await post.updateOne({$push: { likes: req.body.userId }});
         await post.updateOne({$push: { credit: req.body.userId }});
         res.status(200).json("The post has been liked")
      }else if(!post.likes.includes(req.body.userId) && post.credit.includes(req.body.userId)){
          await post.updateOne({$push: { likes: req.body.userId }});
          res.status(200).json("The post has been liked")
      }
      else{
         await post.updateOne({$pull: { likes: req.body.userId }})
         res.status(200).json("The post has been disliked");
    }
    }catch(err){
        res.send(500).json(err); 
    }
    
})
//comment a post
router.put("/:id/comments", verify, async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
       if(!post.comments.includes(req.body.userId) || post.comments.includes(req.body.userId)){
         await post.updateOne({$push: { comments: req.body }});
         res.status(200).json("commented successfully")
      }
    }catch(err){
        res.send(500).json(err); 
    }
    
})



//get a post
router.get("/:id", verify, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})
//get timeline all post
router.get("/timeline/:userId", verify, async (req, res) => {
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id })
        const friendPost = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            }));
            res.status(200).json(userPosts.concat(...friendPost));
    }catch(err){
        res.status(500).json(err)
    }
})

//get all a users post
router.get("/profile/:username", verify, async (req, res) => {
    try{
        const user = await User.findOne({username:req.params.username})
        const posts = await Post.find({userId:user._id})
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router;