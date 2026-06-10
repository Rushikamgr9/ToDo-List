const {
    readTasks,
    writeTasks
} = require("../utils/fileHelper");

exports.getAllTasks = () => {

    return readTasks();
};

exports.createTask = (data) => {

    const tasks = readTasks();

    const newTask = {

        id: Date.now(),

        title: data.title,

        completed: false,

        priority:
            data.priority || "Low",

        dueDate:
            data.dueDate || null,

        createdAt:
            new Date()
    };

    tasks.push(newTask);

    writeTasks(tasks);

    return newTask;
};