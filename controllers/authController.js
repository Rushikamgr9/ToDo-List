const authService =
require("../services/authService");

exports.register =
async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;

        const user =
            await authService.register(
                username,
                password
            );

        res.status(201).json(user);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }
};
