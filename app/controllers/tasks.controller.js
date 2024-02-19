const Tasks = require("../models/tasks.model")
const auth = require("../middleware/auth")

const getTasks = async(req,res)=>{
    const userId = req.userId
    const getTask = await Tasks.getTasks(userId)
    if(getTask){
        res.status(200).send(getTask)
    }else{
        res.status(404).send({error:"can not find tasks",errs})
    }
}

const getSingleTask = async(req,res)=>{
    const getSingleTask = await Tasks.getTask(req.params.id)
    if(getSingleTask){
        res.status(200).send(getSingleTask)
    }else{
        res.status(404).send({error:"can not find tasks",errs})
    }
}

const deleteTask = async(req,res)=>{
        const getSingleTask = await Tasks.deleteTask(req.params.id)
        if(getSingleTask){
            res.status(200).send({message: "deleted task",getSingleTask})
        }else{
            res.status(404).send({error:"can not find tasks",errs})
        }
    }

const updateState = async(req,res)=>{
    console.log(req.body.state)
    const editTask = {
        id: req.params.id,
        state: req.body.state
    }
        const updatedState = await Tasks.updateState(editTask)
        if(updatedState){
            res.status(200).send({message: "updated state"})
        }else{
            res.status(404).send({error:"can not update tasks"})
        }
    }

    const addTask = async(req,res)=>{
         
        const addTask = {
            title: req.body.title,
            description: req.body.description,
            userId : req.userId
        }
            const saveTask = await Tasks.addTask(addTask)
            if(saveTask){
                res.status(200).send({message: "added task"})
            }else{
                res.status(404).send({error:"can not update tasks"})
            }
        }
    

const updateTask = async(req,res)=>{
   
    const editTask = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        state: req.body.state
    }
        const updatedTask = await Tasks.updateTask(editTask)
        if(updatedTask){
            res.status(200).send({message: "updated task"})
        }else{
            res.status(404).send({error:"can not update tasks"})
        }
    }

module.exports = {
    getTasks,
    getSingleTask,
    deleteTask,
    updateState,
    addTask,
    updateTask
}