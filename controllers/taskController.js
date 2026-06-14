const taskService =
require("../services/taskService");

exports.getAllTasks =
(req, res) => {

    const tasks =
        taskService.getAllTasks(
            req.user.userId
        );

    res.json(tasks);
};

exports.createTask =
(req, res) => {

    const task =
        taskService.createTask(
            req.body,
            req.user.userId
        );

    res.status(201).json(task);
};