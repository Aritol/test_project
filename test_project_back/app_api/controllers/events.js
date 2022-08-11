const EventModel = require("../models/event");
const fs = require("fs");

const sendJSONResponse = (res, status, content) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(status).json(content);
};

// module.exports.getList = function (req, res) {
//   const searchObj = req.query.searchParams || {};

//   UserModel.find(searchObj)
//     .populate("events.event")
//     .exec(function (err, user) {
//       if (err)
//         return sendJSONResponse(res, 500, {
//           success: false,
//           err: { msg: "Fetch faild!" },
//         });

//       sendJSONResponse(res, 200, { success: true, data: user });
//     });
// };

module.exports.getList = function (req, res) {
  const searchObj = { userId: req.params.userId };
  // console.log("searchObj");
  console.log(1);
  //   console.log("req.params.userId");
  //   console.log(req.params.id);
  //   const searchObj = { category: req.params.category } || {};

  EventModel.find(searchObj, function (err, events) {
    if (err)
      return sendJSONResponse(res, 500, {
        success: false,
        err: { msg: "Fetch faild!" },
      });
    else {
      sendJSONResponse(res, 200, { success: true, data: events });
      // console.log("events");
      // console.log(events);
    }
  });
};

module.exports.getAllList = function (req, res) {
  const searchObj = {};
  // console.log("searchObj");
  // console.log(123);
  //   console.log("req.params.userId");
  //   console.log(req.params.id);
  //   const searchObj = { category: req.params.category } || {};

  EventModel.find(searchObj, function (err, events) {
    if (err)
      return sendJSONResponse(res, 500, {
        success: false,
        err: { msg: "Fetch faild!" },
      });
    else {
      sendJSONResponse(res, 200, { success: true, data: events });
      // console.log("events");
      // console.log(events);
    }
  });
};

module.exports.add = function (req, res, next) {
  let event = new EventModel({
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    userId: req.body.userId,
  });
  event.save(function (err, savedEvent) {
    if (err) {
      sendJSONResponse(res, 500, {
        success: false,
        err: { msg: "Saving faild!" },
      });
      return;
    }
    sendJSONResponse(res, 201, { success: true, data: savedEvent });
  });
};

module.exports.delete = function (req, res) {
  console.log("---------req.body");
  console.log(req.body);
  EventModel.findByIdAndDelete(req.body.id, function (err) {
    if (err) {
      console.log("---------err");
      console.log(err);
      sendJSONResponse(res, 500, {
        success: false,
        err: { msg: "Delete faild!" },
      });
      return;
    }
    sendJSONResponse(res, 200, { success: true });
  });
};

module.exports.update = function (req, res, next) {
  console.log("- updat ---------");
  console.log(req.body);
  let event = {
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };
  EventModel.findByIdAndUpdate(
    req.body._id,
    event,
    { new: true }, //у колбек передається оновлений документ
    function (err) {
      // mongoose.disconnect()
      if (err) {
        sendJSONResponse(res, 500, {
          success: false,
          err: { msg: "Update faild!" },
        });
        return;
      }

      sendJSONResponse(res, 200, { success: true });
    }
  );
};

module.exports.getById = function (req, res) {
  EventModel.findById(req.params.id, function (err, searchEvent) {
    if (err) {
      sendJSONResponse(res, 500, {
        success: false,
        err: { msg: "Find book faild!" },
      });
      return;
    }
    sendJSONResponse(res, 200, { success: true, data: searchEvent });
  });
};
