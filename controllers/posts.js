const Post = require('../models/post');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid'); //import uuid to generate random ID's

const s3 = new S3();

module.exports = {
    create,
    index
}

function create(req, res){
    console.log(req.file, req.body, 'this is create method', req.user)
    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
            console.log(err, ' from aws')
            const post = await Post.create({caption: req.body.caption, user: req.user, photoUrl: data.Location});
            console.log(post)
            await post.populate('user'); //make sure the post we're sending back has the user populated
            res.status(201).json({post: post})
        })

    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}

async function index(req, res){
    try {
        // this populates the user when you find the posts so you'll have access to the users information when you fetch the posts
        const posts = await Post.find({}).populate('user').exec() //'user' is referring to a property on the model schema
        //populate takes the object id that exists in the model and replaces it with the actual user object
        res.status(200).json({posts})
    } catch(err){

    }
}