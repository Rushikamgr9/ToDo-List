const express = require("express");

const router = express.Router();

const taskController =
require("../controllers/taskController");

const validateTask =
require("../middleware/validateTask");

router.get(
"/",
authMiddleware,
taskController.getAllTasks
);

router.post(
    "/",
    taskController.createTask
);

router.get(
    "/:id",
    taskController.getTaskById
);

router.delete(
    "/:id",
    taskController.deleteTask
);

module.exports = router;