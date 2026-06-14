const express =
require("express");

require("dotenv").config();

const app =
express();

app.use(express.json());

const authRoutes =
require("./routes/authRoutes");

const taskRoutes =
require("./routes/taskRoutes");

app.use(
    "/auth",
    authRoutes
);

app.use(
    "/tasks",
    taskRoutes
);

const PORT =
process.env.PORT || 3000;

app.listen(
    PORT,
    () => {

        console.log(
            `Server running on port ${PORT}`
        );

    }
);