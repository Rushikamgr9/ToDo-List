const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Task = require("./models/Task");

const app = express();

app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});


// GET ALL TASKS
app.get("/tasks", async (req, res) => {

    try {

        const tasks = await Task.find();

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


// CREATE TASK
app.post("/tasks", async (req, res) => {

    try {

        const task = await Task.create({
            title: req.body.title
        });

        res.status(201).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


// MARK COMPLETE
app.put("/tasks/:id", async (req, res) => {

    try {

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                completed: true
            },
            {
                new: true
            }
        );

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        res.json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


// DELETE TASK
app.delete("/tasks/:id", async (req, res) => {

    try {

        const task = await Task.findByIdAndDelete(
            req.params.id
        );

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});