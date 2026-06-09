const fs = require("fs");

const filePath = "./data/tasks.json";

exports.readTasks = () => {

    return JSON.parse(
        fs.readFileSync(filePath)
    );
};

exports.writeTasks = (tasks) => {

    fs.writeFileSync(
        filePath,
        JSON.stringify(tasks, null, 2)
    );
};