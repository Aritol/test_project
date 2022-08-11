const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Створення схеми моделі
const eventScheme = new Schema({
  title: String,
  description: String,
  startDate: String,
  endDate: String,
  userId: Schema.Types.ObjectId,
});
//Створення моделі
const EventModel = mongoose.model("Event", eventScheme);

module.exports = EventModel;
