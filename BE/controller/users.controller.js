const userService = require("../service/user.service");


module.exports = {

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const token = await userService.login(email, password);
            res.json(token);
        } catch (err) {
            console.error(err.message);
            res.status(400).json({ error: err.message });
        }
    },

    async addUser(req, res) {
        try {
            const formData = req.body;
            const user = await userService.addUser(formData);
            return res.status(200).json(user);
        } catch (error) {
            console.error("Error getting manager attendance:", error);
            return res.status(401).json({ error: "Failed to get attendance" });
        }
    },

    async getUserDataById(req, res) {
        try {
            const { userId } = req.query;
            const user = await userService.getUserDataById(userId);
            return res.status(200).json(user);
        } catch (error) {
            console.error("Error getting manager attendance:", error);
            return res.status(401).json({ error: "Failed to get attendance" });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.error("Error getting manager attendance:", error);
            return res.status(401).json({ error: "Failed to get attendance" });
        }
    },

    async updateUserData(req, res) {
        try {
            const { formData } = req.body;
            const user = await userService.updateUserData(formData);
            return res.status(200).json(user);
        } catch (error) {
            console.error("Error getting manager attendance:", error);
            return res.status(401).json({ error: "Failed to get attendance" });
        }
    },

    async deleteUser(req, res) {
        try {
            const { userId } = req.query;
            const user = await userService.deleteUser(userId);
            return res.status(200).json(user);
        } catch (error) {
            console.error("Error getting manager attendance:", error);
            return res.status(401).json({ error: "Failed to get attendance" });
        }
    }

}