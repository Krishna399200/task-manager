const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express")
const taskRoutes = require('./routes/tasks.routes');

const app = express()

let server;
const port = 8082



mongoose 
.connect("mongodb://127.0.0.1:27017/task-manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to database")
    server = app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    })
})
.catch((err) => console.log(err));

app.use(cors())
app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.listen(port , () => {
    console.log(`Backend listening on ${port}`)
})

