const fs = require("fs");

const filePath = "./data/tasks.json";

exports.getAllTasks = (req, res) => {

    const tasks = JSON.parse(
        fs.readFileSync(filePath)
    );

    res.json(tasks);
};

exports.createTask = (req, res) => {

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
};
