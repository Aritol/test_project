var express = require("express");
var router = express.Router();

const eventsController = require("../controllers/events");

router.get("/", eventsController.getAllList);
router.get("/:userId", eventsController.getList);

router.delete("/", eventsController.delete);

router.post("/", eventsController.add);

router.put("/", eventsController.update);

// router.get("/event/:id", eventsController.getById);

module.exports = router;
