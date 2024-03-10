import axios from "axios";
export const load = async () => {
    try {
        let users
        const response = await axios("http://localhost:5000/api/user/get-all-users");
        if (response.data) {
            users = await response.data;
        }
        return {
            users
        };
    } catch (error) {
        console.error("Error fetching users:", error.message);
        return {
            status: 500,
            error: new Error("Internal Server Error"),
        };
    }
};