const sql = require("../config/db.config")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

var SignUp = function(signupData){
    this.name = signupData.name
    this.email = signupData.email
    this.password = signupData.password
}

SignUp.addSignup = (registerData)=>{

    try{

        let result = new Promise((resolve,reject)=>{
            sql.query("INSERT INTO sign_up SET ?",registerData,(err,res)=>{
                // console.log(registerData.password)
                if(err){
                    if (err.code === 'ER_DUP_ENTRY' && err.sqlMessage.includes('email')) {
                        // Handle duplicate email error
                        reject(new Error('Email already exists'));
                    } else {
                    console.log("Error executing sql query:",err.sql)
                    console.log("Error Message:",err.message)
                    reject(err)
                    }
                }else{
                    const userId = res.insertId;
                    const token = jwt.sign({userId: userId},"your_secret_key")

                    const updateSignup = "UPDATE sign_up SET token = ? WHERE id = ?"
                    sql.query(updateSignup,[token,userId],(err,res)=>{
                        if(err){
                            console.error("error updating token",err)
                            reject(err)
                        }else{
                            resolve({id:userId,token:token})
                        }
                    })
                }
            })
        })
        return result;

    }catch(err){
        console.log(err);
    }
}

SignUp.getLogin = (loginData)=>{

    try{

        let result = new Promise((resolve,reject)=>{
            const q = "SELECT * FROM sign_up WHERE email = ?"
            sql.query(q,[loginData.email],async(err,res)=>{
                if(err){
                    console.log("Error executing sql query:",err.sql)
                    console.log("Error Message:",err.message)
                    reject(err)
                }else{
                    if(res.length > 0){
                        
                        const ismatch = await bcrypt.compare(loginData.password,res[0].password)
                        if(!ismatch){

                            reject({error : "invalid password"})
                            
                        }else{
                            const id = res[0].id
                            const token = jwt.sign({userId : id},"your_secret_key")
                            const updateLogin = "UPDATE sign_up SET token = ? WHERE id = ?"
                            sql.query(updateLogin,[token,id],(err,result)=>{
                               if(err){
                                    console.log("error updating token",err)
                                    reject(err)
                               }else{
                                    resolve({id : id,token : token})
                               }
                            })
                           
                        }
                    }else{
                        reject({error : "invalid email address"})
                    }
                }
            })
        })
        return result;
    }catch(err){
        console.log(err);
    }
}

module.exports = SignUp;