const express =
require("express");

const router =
express.Router();

const taskController =
require("../controllers/taskController");

const authMiddleware =
require("../middleware/authMiddleware");

const validateTask =
require("../middleware/validateTask");

router.get(
    "/",
    authMiddleware,
    taskController.getAllTasks
);

router.post(
    "/",
    authMiddleware,
    validateTask,
    taskController.createTask
);

module.exports = router;