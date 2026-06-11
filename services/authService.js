const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    readFile,
    writeFile
} = require("../utils/fileHelper");

const USERS_FILE =
    "./data/users.json";

exports.register = async (
    username,
    password
) => {

    const users =
        readFile(USERS_FILE);

    const existingUser =
        users.find(
            user =>
                user.username === username
        );

    if (existingUser) {

        throw new Error(
            "User already exists"
        );
    }

    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

    const newUser = {
        id: Date.now(),
        username,
        password: hashedPassword
    };

    users.push(newUser);

    writeFile(
        USERS_FILE,
        users
    );

    return newUser;
};

exports.login = async (
    username,
    password
) => {

    const users =
        readFile(USERS_FILE);

    const user =
        users.find(
            user =>
                user.username === username
        );

    if (!user) {

        throw new Error(
            "User not found"
        );
    }

}