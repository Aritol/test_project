var express = require("express");
var router = express.Router();

const usersController = require("../controllers/users");

/* GET список користувачів */
router.get("/", usersController.getList);

/* GET видалення користувача за id */
router.delete("/", usersController.delete);

/* POST Створення нового користувача */
router.post("/", usersController.add);

// Оновлення інформації про користувача після редагування
router.put("/", usersController.update);

/* Відображення інформації про одного користувача */
router.get("/:id", usersController.getById);

module.exports = router;
