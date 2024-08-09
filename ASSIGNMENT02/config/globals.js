require("dotenv").config();

const configurations = {
    ConnectionString: {
        DB: process.env.CONNECTION_STRING_MONGODB,
    },
    Authentication: {
        GitHub: {
            ClientId: process.env.GITHUB_CLIENT_ID,
            ClientSecret: process.env.GITHUB_CLIENT_SECRET,
            CallbackUrl: process.env.GITHUB_CALLBACK_URL
        },
    },
}

module.exports = configurations;