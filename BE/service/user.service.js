const { pool } = require("../db.service/db.con");
const sql = require("../db.service/queries");
// const { generateToken } = require('../utils/JWT');
const utils = require('../utils/JWT')




module.exports = {

    async login(email, password) {
        try {
            const [exist] = await pool.query(sql.LOGIN_USER, [email, [password]]);

            if (exist.length > 0) {
                return utils.generateToken(exist[0].user_id);
            } else {
                return { messege: "Incorrect Password." };
            }
        } catch (err) {
            throw err;
        }
    },


    async getUserDataById(userId) {
        try {
            const [user] = await pool.query(sql.GET_USER_BY_USER_ID, [userId]);
            return user;

        } catch (error) {
            console.error("Error fetching manager attendance:", error);
            throw error;
        }
    },

    async getAllUsers() {
        try {
            const [users] = await pool.query(sql.GET_ALL_USERS);
            return users;

        } catch (error) {
            console.error("Error fetching manager attendance:", error);
            throw error;
        }
    },


    async addUser(formData) {
        try {
            const { email, name, surname, address, phoneNumber, date, attachment } = formData

            let fileName;
            if (attachment) {
                fileName = await utils.base64ToPdf(attachment);
            } else {
                fileName = null
            }

            const [user] = await pool.query(sql.INSERT_INTO_USERS, [name, surname, email, address, phoneNumber, date, fileName]);
            if (user.affectedRows == 1) {
                return { messege: "User Created" };
            }
        } catch (error) {
            console.error("Error fetching manager attendance:", error);
            throw error;
        }
    },

    async updateUserData(formData) {
        try {
            const { id, email, name, surname, address, phoneNumber, date } = formData
            const [user] = await pool.query(sql.UPDATE_USER, [name, surname, email, address, phoneNumber, date, id]);
            if (user.affectedRows === 1) {
                return { messege: "User Updated" };
            }
        } catch (error) {
            console.error("Error fetching manager attendance:", error);
            throw error;
        }
    },

    async deleteUser(userId) {
        try {
            const [user] = await pool.query(sql.DELETE_USER, [userId]);
            if (user.affectedRows === 1) {
                return { messege: "User Deleted" };
            }
        } catch (error) {
            console.error("Error fetching manager attendance:", error);
            throw error;
        }
    },






}