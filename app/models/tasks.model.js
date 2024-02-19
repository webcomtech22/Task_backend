const sql = require('../config/db.config')

var Tasks = function(tasks){
    this.title = tasks.title
    this.description = tasks.description
    this.state = tasks.state
}


Tasks.getTasks = (userId)=>{

    let result = new Promise((resolve,reject)=>{
        sql.query("SELECT * FROM tasks WHERE userId = ?",[userId],(err,rows)=>{
            if(err){
                console.log("Error executing sql query:",err.sql)
                console.log("Error Message:",err.message)
                reject(err)
            }else{
                resolve(rows)
            }
        })    
    })
    return result;
}

Tasks.getTask = (id)=>{
    let result = new Promise((resolve,reject)=>{
        sql.query("SELECT * FROM tasks WHERE id = ?",[id],(err,rows)=>{
            if(err){
                console.log("Error executing sql query:",err.sql)
                console.log("Error Message:",err.message)
                reject(err)
            }else{
                resolve(rows[0])
            }
        })    
    })
    return result;   
}

Tasks.deleteTask = (id)=>{
    let result = new Promise((resolve,reject)=>{
        sql.query("DELETE FROM tasks WHERE id = ?",[id],(err,rows)=>{
            if(err){
                console.log("Error executing sql query:",err.sql)
                console.log("Error Message:",err.message)
                reject(err)
            }else{
                resolve(rows)
            }
        })    
    })
    return result;   
}

Tasks.updateState = (editTask)=>{
    let result = new Promise((resolve,reject)=>{
        sql.query("UPDATE tasks SET state = ? WHERE id = ?",[editTask.state,editTask.id],(err,rows)=>{
            if(err){
                console.log("Error executing sql query:",err.sql)
                console.log("Error Message:",err.message)
                reject(err)
            }else{
                resolve(rows)
            }
        })    
    })
    return result;   
}

Tasks.addTask = (addTask)=>{
    let result = new Promise((resolve,reject)=>{
        sql.query("INSERT INTO tasks (title,description,userId) VALUES (?,?,?)",[addTask.title,addTask.description,addTask.userId],(err,rows)=>{
            if(err){
                console.log("Error executing sql query:",err.sql)
                console.log("Error Message:",err.message)
                reject(err)
            }else{
                resolve(rows)
            }
        })    
    })
    return result;   
}

Tasks.updateTask = (editTask)=>{
    let result = new Promise((resolve,reject)=>{
        sql.query("UPDATE tasks SET title = ?,description = ?, state = ?  WHERE id = ?",[editTask.title,editTask.description,editTask.state,editTask.id],(err,rows)=>{
            if(err){
                console.log("Error executing sql query:",err.sql)
                console.log("Error Message:",err.message)
                reject(err)
            }else{
                resolve(rows)
            }
        })    
    })
    return result;   
}

// Tasks.getTask = ()=>{
//     let result = new Promise((resolve,reject)=>{
//         sql.query("SELECT * FROM tasks WHERE state = 'completed",[id],(err,rows)=>{
//             if(err){
//                 console.log("Error executing sql query:",err.sql)
//                 console.log("Error Message:",err.message)
//                 reject(err)
//             }else{
//                 resolve(rows[0])
//             }
//         })    
//     })
//     return result;   
// }

module.exports = Tasks