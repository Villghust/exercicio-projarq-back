import mongoose from 'mongoose';

const connection = {
    production: {
        url: `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_IP}/supermarket`,
    },
    development: {
        url: 'mongodb://localhost:27017/supermarket',
    },
};

class Database {
    constructor() {
        this.mongo();
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            connection[process.env.ENVIRNOMENT].url,
            { useNewUrlParser: true, useFindAndModify: true }
        );
    }
}

export default new Database();
