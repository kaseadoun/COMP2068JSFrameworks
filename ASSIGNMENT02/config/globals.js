require("dotenv").config();

const configurations = {
    ConnectionString: {
        DB: process.env.CONNECTION_STRING_MONGODB,
    },
    'apiServer' : 'http://localhost:3000',
    'clientServer' : 'http://localhost:4200'
}

module.exports = configurations;