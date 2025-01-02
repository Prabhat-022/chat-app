import express from 'express';
import { Login, Register, getAllUser, logOut } from '../controllers/user.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router()
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    Register);


router.route("/login").post(Login);
router.route('/logout').get(logOut)
router.route("/").get(isAuthenticated, getAllUser);

export default router;