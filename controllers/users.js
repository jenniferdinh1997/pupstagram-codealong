const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require('uuid');
// uuid, helps generate our unique ids
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initialize the S3 constructor

module.exports = {
  signup,
  login
};

async function signup(req, res) { //transport token string to the client within an object
  console.log(req.body, ' <- req.body is users signup', req.file, ' this is req.file')
  // Generate a file Path
  const filePath = `${uuidv4()}/${req.file.originalname}`
  const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};

  s3.upload(params, async function(err, data){
    const user = new User({...req.body, photoUrl: data.Location});
      try {
        await user.save();
        const token = createJWT(user);
        res.json({ token }); //sending the token back to the browser
      } catch (err) {
        // Probably a duplicate email
        res.status(400).json(err);
      }
    })
}

async function login(req, res) {
 
  try {
    const user = await User.findOne({email: req.body.email});
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign( //sign method creates JWTs
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
