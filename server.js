const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

const filePath = "./data/tasks.json";

// Get all tasks
app.get("/tasks", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync(filePath));
    res.json(tasks);
});

// Create task
app.post("/tasks", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync(filePath));

    const newTask = {
        id: Date.now(),
        title: req.body.title,
        completed: false
    };

    tasks.push(newTask);

    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

    res.status(201).json(newTask);
});

// Mark complete
app.put("/tasks/:id", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync(filePath));

    const task = tasks.find(
        t => t.id == req.params.id
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    task.completed = true;

    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

    res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {

    let tasks = JSON.parse(
        fs.readFileSync(filePath)
    );

    tasks = tasks.filter(
        t => t.id != req.params.id
    );

    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

    res.json({
        message: "Task deleted"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});