const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Створення схеми моделі
const userScheme = new Schema({
  name: {
    type: String,
    require: true,
  },
  lastName: String,
  email: String,
  phoneNumber: String,
  // events: [
  //
  //   //   event: {
  //   //     type: Schema.Types.ObjectId,
  //   //     ref: "event",
  //   //   },
  //
  // ],
});
//Створення моделі
const UserModel = mongoose.model("User", userScheme);

module.exports = UserModel;
