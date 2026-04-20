const authRouter = require("express").Router();
const authController = require("../controllers/auth.controllers");
const { authUser } = require("../middleware/auth.middleware");

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login", authController.loginUser);

/**
 * @route GET /api/auth/logout
 * @desc clear token and blacklist from future use
 * @access Public
 */
authRouter.get("/logout", authController.logoutUser);

/**
 * @route GET /api/auth/user
 * @desc Get user details
 * @access Private
 */
authRouter.get("/user", authUser, authController.getUser);

module.exports = authRouter;
