import express from 'express';



const router = express.Router()

// this is for sending the message
router.route("/sendMessage").post( );


// this is for fetching all message for a specific chat
router.route("/fetchMessage").post();