const UserModel = require("../models/user");
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
  const searchObj = {};

  // console.log("searchObj");
  // console.log(searchObj);

  UserModel.find(searchObj, function (err, users) {
    if (err)
      return sendJSONResponse(res, 500, {
        success: false,
        err: { msg: "Fetch faild!" },
      });
    else {
      sendJSONResponse(res, 200, { success: true, data: users });
    }
  });
};

module.exports.add = function (req, res, next) {
  let user = new UserModel({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    events: req.body.events,
  });
  user.save(function (err, savedUser) {
    if (err) {
      sendJSONResponse(res, 500, {
        success: false,
        err: { msg: "Saving faild!" },
      });
      return;
    }
    sendJSONResponse(res, 201, { success: true, data: savedUser });
  });
};

module.exports.delete = function (req, res) {
  console.log("---------req.body");
  console.log(req.body);
  UserModel.findByIdAndDelete(req.body.id, function (err) {
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
  let user = {
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    events: req.body.events,
  };

  UserModel.findByIdAndUpdate(
    req.body._id,
    user,
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

// module.exports.getById = function (req, res) {
//   //Пошук об"єкта-книги за id
//   UserModel.findById(req.params.id)
//   .exec(function (err, searchUser) {
//     if (err) {
//       sendJSONResponse(res, 500, {
//         success: false,
//         err: { msg: "Find user faild!" },
//       });
//       return;
//     }
//     sendJSONResponse(res, 200, { success: true, data: searchUser });
//   });
// };

module.exports.getById = function (req, res) {
  // console.log("norm");
  // console.log(req.params.id);
  UserModel.findById(req.params.id, function (err, searchUser) {
    if (err) {
      sendJSONResponse(res, 500, {
        success: false,
        err: { msg: "Find product faild!" },
      });
      return;
    }
    sendJSONResponse(res, 200, { success: true, data: searchUser });
  });
};
