import express from 'express';
import { createChat, getChatsParticular } from '../controller/chat.js';


const router = express.Router()

router.route("/createChat").post(createChat);
router.route("/fetchChats").post(getChatsParticular);