const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            res.json({error:"token missing"})
        }

        jwt.verify(token,"your_secret_key",(err,user)=>{
            if(err) throw err;
            // console.log("Decoded Token:", user);

            req.user = user;
            req.userId = user.userId
            console.log(req.userId);
            next();
        })
    }catch(err){
        res.send({error:"please authenticate"})
    }
}

module.exports = auth;