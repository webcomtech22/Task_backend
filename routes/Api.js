const multer = require('multer')
const auth = require("../app/middleware/auth")
const getData = require("../app/controllers/signup.controller")
const login = require("../app/controllers/signup.controller")
const readTasks = require("../app/controllers/tasks.controller")
const readSingleTask= require("../app/controllers/tasks.controller")
const deleteTask = require("../app/controllers/tasks.controller")
const updateState = require("../app/controllers/tasks.controller")
const addTask = require("../app/controllers/tasks.controller")
const updateTask = require("../app/controllers/tasks.controller")


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'uploads/');
    },
    filename: (req,file,cb) =>{
        // const timeStamp = Date.now().toString();
        // const timestamp = Date.now().toString() + path.extname(file.originalname).toLowerCase()
        // cb(null, timestamp);
        const timestamp = Date.now().toString();
        const randomString = crypto.randomBytes(8).toString('hex'); // Generates an 8-byte random hex string
        const uniqueFilename = `${timestamp}_${randomString}${path.extname(file.originalname).toLowerCase()}`;
        cb(null, uniqueFilename);
    }
});

const upload = multer({storage: storage});


function initRoutes(app){

    app.post("/sign_up",upload.none(),getData.saveSignup)
    app.post("/login",upload.none(),login.loginData)
    app.get("/tasks",auth,upload.none(),readTasks.getTasks)
    app.get("/singleTask/:id",auth,upload.none(),readSingleTask.getSingleTask)
    app.delete("/deleteTask/:id",auth,upload.none(),deleteTask.deleteTask)
    app.post("/updateState/:id",auth,upload.none(),updateState.updateState)
    app.post("/addTask",auth,upload.none(),addTask.addTask)
    app.post("/updateTask/:id",auth,upload.none(),updateTask.updateTask)
    const blacklist = new Set();

    app.post('/logout',auth, (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        blacklist.add(token);
        console.log(token)
        res.clearCookie('token', { httpOnly: true });
        res.status(200).json({ message: 'Logout successful' });
    });
    
}


module.exports = initRoutes