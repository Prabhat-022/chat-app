import express from 'express';
import { getAllTheMessage, sendMessage } from '../controllers/messageControllers.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router()

router.route("/send/:id").post(isAuthenticated ,sendMessage);
router.route("/:id").get(isAuthenticated ,getAllTheMessage);



export default router;