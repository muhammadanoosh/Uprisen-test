export const queries = {

    CREATE_DATABASE: `CREATE DATABASE IF NOT EXISTS aiit_test`,

    CREATE_TABLE_USERS: `CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(100),
        password VARCHAR(255),
        phone_number VARCHAR(50),
        date VARCHAR(50)
    );`,

    GET_ALL_USERS: `SELECT user_id, first_name, last_name, email, address, phone_number, date_time
    FROM aiit_test.users;
    `,

    INSERT_INTO_USERS: `INSERT INTO aiit_test.users
    (first_name, last_name, email, address, phone_number, date_time)
    VALUES(?, ?, ?, ?, ?, ?);
    `,

    DELETE_USER: `DELETE FROM aiit_test.users
    WHERE user_id=?;
    `,

    GET_USER_BY_USER_ID: `SELECT user_id, first_name, last_name, email, address, phone_number, date_time
    FROM aiit_test.users where user_id=?;
    `,
};
