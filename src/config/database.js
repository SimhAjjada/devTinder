const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb://namastenode:I39drnOQmwlYbc6k@ac-3knpjr2-shard-00-00.gxsvq4f.mongodb.net:27017,ac-3knpjr2-shard-00-01.gxsvq4f.mongodb.net:27017,ac-3knpjr2-shard-00-02.gxsvq4f.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-tz3nnt-shard-0&authSource=admin&appName=NamasteNode"
    );
};

module.exports = connectDB;