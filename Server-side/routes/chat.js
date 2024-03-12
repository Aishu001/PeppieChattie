import express from 'express';
import { createChat, getChatsParticular } from '../controller/chat';


const router = express.Router()

router.route("/createChat").post(createChat);
router.route("/fetchChats").post(getChatsParticular);