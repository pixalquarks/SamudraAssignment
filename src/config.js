import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT,
    db: {
        url : process.env.DB_URL,
        name: process.env.DB_NAME
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION_DELTA
    }
}