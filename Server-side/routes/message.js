import express from 'express';
import { allMessage, sendMessage } from '../controller/message.js';



const router = express.Router()

// this is for sending the message
router.route("/sendMessage").post(sendMessage);


// this is for fetching all message for a specific chat
router.route("/fetchMessage:chatId").post(allMessage);
