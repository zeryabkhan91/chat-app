const express = require("express");

const UserController = require("../app/user/UserController");
const USERS_ROUTES_PREFIX = "/user";

const router = express.Router();

router.get(`${USERS_ROUTES_PREFIX}`, UserController.getUser);

module.exports = router;
