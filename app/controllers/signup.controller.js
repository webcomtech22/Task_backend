const SignUp = require('../models/signup.model')
const bycrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')


const saveSignup = async(req,res)=>{

    const hashedPassword = await bycrypt.hash(req.body.password,10)
    try{
        let signupData = {
            name : req.body.name,
            email: req.body.email,
            password: hashedPassword
        }
         
    const saveData = await SignUp.addSignup(signupData);
    const {id, token} = saveData;

    if(saveData){
        res.status(200).send({message:"signUp Data added",token:token,id:id})
    }else{
        res.status(400).send({error:"something went wrong"})
    }

    }catch(err){
        if (err.message === 'Email already exists') {
            res.status(400).send({ error: 'Email already exists' });
        } else {
            console.log(err);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }
}

const loginData = async(req,res)=>{
    
    try{
        const loginData = {
            email : req.body.email,
            password: req.body.password
        }
// console.log(req.body.email)
        const checkData = await SignUp.getLogin(loginData)
        const {id, token} = checkData;
                // console.log(checkData)

        if(checkData){
            res.status(200).send({message : "login successful",id : id,token : token})
        }else{
            res.status(400).send({error : "something went wrong"})
        }

    }catch(err){
        res.status(500).send({error: "Internal Server Error"})
    }

}




module.exports = {
    saveSignup,
    loginData
}