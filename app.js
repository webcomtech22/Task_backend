const express = require('express')
const app = express();
const cors = require('cors')
const db = require("./app/config/db.config")
const PORT = process.env.PORT || 3200

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require("./routes/Api")(app)

// 



// app.get("/getData",middleware,(req,res)=>{
//     q= "select * from sign_up"
//     db.query(q,(err,rows)=>{
//         if(err) {console.log(err)}
//         res.json(rows)
//     })
// })

// app.post("/sign_up",(req,res)=>{
//     const {name,email,password} = req.body;
//     // console.log(req.body)
//     q= "insert into sign_up(name,email,password) values(?,?,?)"
//     db.query(q,[name,email,password],(err,rows)=>{
//         if(err) {console.log(err)}
//         res.json({message:"successfuly added"})
//     })
// })

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})