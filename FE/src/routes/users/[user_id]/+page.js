import axios from "axios";
export const load = async ({ fetch, params }) => {
    const userId = params.user_id
    try {
        const response = await axios.get(`http://localhost:5000/api/user/get-user-by-id?userId=${userId}`);
        const  user  = await response.data;
        return {
            user
        };

    } catch (error) {
        console.error("Failed to submit data:", error);
    }
};



// export const load = async ({ fetch, params }) => {
//     const userId = params.user_id
//     try {
//         const response = await fetch("../../api", {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ userId }),
//         });
//         const { users } = await response.json();
//         return {
//             users
//         };

//     } catch (error) {
//         console.error("Failed to submit data:", error);
//     }
// };