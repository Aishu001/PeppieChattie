import express from 'express';
import { allMessage, sendingTheMessage } from '../controller/message.js';
import authenticateUser from '../middleware/athorzMiddleware.js';



const router = express.Router()

// this is for sending the message
router.route("/sendMessage").post(authenticateUser,sendingTheMessage);


// this is for fetching all message for a specific chat
router.route("/fetchMessage/:chatId").get(authenticateUser,allMessage);

export const messageRouter = router;
