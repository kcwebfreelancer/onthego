const Post = require('../models/postModel');
const User = require('../models/userModel');

const getPosts = async (req, res) => {
    const posts = await Post.find({ user: req.user.id });
    const output = {};
    output.posts = posts;
    return res.status(200).json(output)
}

const createPost = async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title field should not be empty' })
    }
    if (!description) {
        return res.status(400).json({ message: 'Description field should not be empty' })
    }

    await Post.create({
        title,
        description,
        user: req.user.id
    });

    return res.status(200).json({ message: 'New post created successfully!!!' })
}

const updatePost = async (req, res) => {
    const getPostId = await Post.findById(req.params.postId);
    const { title, description } = req.body;
    const user = await User.findById(req.user.id);

    if (!title) {
        return res.status(400).json({ message: 'Title field is required' })
    }
    if (!description) {
        return res.status(400).json({ message: 'Description field is required' })
    }
    //Check if user found
    if(!user){
        return res.status(400).json({ message: 'User not found' })
    }
    
    //Check if the post matches the loggedin user
    if(getPostId.user.toString() !== user._id.toString()){
        return res.status(400).json({ message: 'User not authorized' })
    }

    await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });

    return res.status(200).json({ message: 'Post updated successfully' })
}

const deletePost = async (req, res) => {
    const postId = req.params.postId;
    const user = await User.findById(req.user.id);
    const post = await Post.findById(postId);


    console.log('user....', user);
    console.log('post....', post);
    //check if user found
    if(!user){
        return res.status(400).json({message: 'User not found'})
    }
    //check if the delete post id matches logged in user id
    console.log("user id....", user.id)
    if(post.user.toString() !== user.id){
        return res.status(400).json({message: 'User not authorized'})
    }
    await Post.deleteOne({ "_id": postId });
    return res.status(200).json({ message: `Post ${postId} deleted successfully` })
}

module.exports = {
    getPosts,
    updatePost,
    createPost,
    deletePost
}