require("dotenv").config();
const mongoose = require("mongoose");
const consola = require("consola");

const ConnectDb = async (url) => {
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => consola.success(`Connected to Database Successfully...${url}`))
    .catch((err) =>
      consola.error(`Failed: Could not connect to Database ${err}`)
    );
};

ConnectDb(process.env.MONGO_URL);
