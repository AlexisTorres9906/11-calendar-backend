const { default: mongoose } = require("mongoose");

const dbconnection = async () => {
  try {
    mongoose.connect(process.env.DB_CNN, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    dbconnection,
}