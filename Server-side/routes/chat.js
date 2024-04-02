import express from 'express';
import { createChat, getChatsParticular } from '../controller/chat.js';
import authenticateUser from '../middleware/athorzMiddleware.js';


const router = express.Router()

router.route("/createChat").post(authenticateUser,createChat);
 router.route("/fetchChats").get(authenticateUser,getChatsParticular);



export const chatRouter = router;