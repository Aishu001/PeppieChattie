import express from 'express';
import { createChat } from '../controller/chat';


const router = express.Router()

router.route("/createChat").post(createChat);
router.route("/fetchChats").post();