import { usersDao } from "../dao/managers/index.js";

export class UsersService {

    static getUserByEmail = async (username) => {
        return await usersDao.getUserByEmail(username);
    };

    static saveUser = async (newUser) => {
        return await usersDao.saveUser(newUser);
    };

    static getUserById = async (id) => {
        return await usersDao.getUserById(id);
    };
};