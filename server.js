const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

const filePath = "./data/tasks.json";


// GET ALL TASKS
app.get("/tasks", (req, res) => {

    const tasks = JSON.parse(
        fs.readFileSync(filePath)
    );

    res.json(tasks);
});


// CREATE TASK
app.post("/tasks", (req, res) => {

    const tasks = JSON.parse(
        fs.readFileSync(filePath)
    );

    const { title, priority, dueDate } =
        req.body;

    if (!title) {

        return res.status(400).json({
            message: "Title is required"
        });

    }

    const newTask = {
        id: Date.now(),
        title,
        completed: false,
        priority: priority || "Low",
        dueDate: dueDate || null
    };

    tasks.push(newTask);

    fs.writeFileSync(
        filePath,
        JSON.stringify(tasks, null, 2)
    );

    res.status(201).json(newTask);

});


// GET SINGLE TASK
app.get("/tasks/:id", (req, res) => {

    const tasks = JSON.parse(
        fs.readFileSync(filePath)
    );

    const task = tasks.find(
        t => t.id == req.params.id
    );

    if (!task) {

        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);
});


// MARK COMPLETE
app.put("/tasks/:id", (req, res) => {

    const tasks = JSON.parse(
        fs.readFileSync(filePath)
    );

    const task = tasks.find(
        t => t.id == req.params.id
    );

    if (!task) {

        return res.status(404).json({
            message: "Task not found"
        });
    }

    task.completed = true;

    fs.writeFileSync(
        filePath,
        JSON.stringify(tasks, null, 2)
    );

    res.json(task);
});


// DELETE TASK
app.delete("/tasks/:id", (req, res) => {

    let tasks = JSON.parse(
        fs.readFileSync(filePath)
    );

    tasks = tasks.filter(
        t => t.id != req.params.id
    );

    fs.writeFileSync(
        filePath,
        JSON.stringify(tasks, null, 2)
    );

    res.json({
        message: "Task deleted"
    });
});


// UPDATE TASK
app.patch("/tasks/:id", (req, res) => {

    const tasks = JSON.parse(
        fs.readFileSync(filePath)
    );

    const task = tasks.find(
        t => t.id == req.params.id
    );

    if (!task) {

        return res.status(404).json({
            message: "Task not found"
        });

    }

    const { title, priority } = req.body;

    if (title) {
        task.title = title;
    }

    if (priority) {
        task.priority = priority;
    }

    fs.writeFileSync(
        filePath,
        JSON.stringify(tasks, null, 2)
    );

    res.json(task);

});


// SEARCH TAASK
app.get("/search", (req, res) => {

    const tasks = JSON.parse(
        fs.readFileSync(filePath)
    );

    const keyword =
        req.query.title?.toLowerCase();

    const result = tasks.filter(task =>
        task.title.toLowerCase()
        .includes(keyword)
    );

    res.json(result);

});

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});