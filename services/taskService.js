const {
    readFile,
    writeFile
} = require("../utils/fileHelper");

const TASK_FILE =
"./data/tasks.json";

exports.getAllTasks =
(userId) => {

    const tasks =
        readFile(TASK_FILE);

    return tasks.filter(
        task =>
            task.userId == userId
    );
};

exports.createTask =
(data, userId) => {

    const tasks =
        readFile(TASK_FILE);

    const newTask = {

        id: Date.now(),

        title: data.title,

        completed: false,

        priority:
            data.priority || "Low",

        dueDate:
            data.dueDate || null,

        userId,

        createdAt:
            new Date()
    };

    tasks.push(newTask);

    writeFile(
        TASK_FILE,
        tasks
    );

    return newTask;
};